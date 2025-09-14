import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime
import uuid
import json
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors
from transformers import pipeline
import os
from twilio.rest import Client
from dotenv import load_dotenv
from gtts import gTTS
# from pydub import AudioSegment
import whisper
model = whisper.load_model("small")

# CELL 2: ENHANCED RAG SYSTEM CLASS & PROCESSING FUNCTIONS
import os
from pathlib import Path
import json
import pickle
import hashlib
import numpy as np
from sentence_transformers import SentenceTransformer, CrossEncoder
from transformers import pipeline
from collections import defaultdict
import concurrent.futures
import time
import re

# IMPROVED Configuration
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
RERANKER_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"
LLM_MODEL = "google/flan-t5-small"

# BETTER Chunking parameters
CHUNK_SIZE = 100  # Smaller chunks for better precision
CHUNK_OVERLAP = 20  # Overlap to maintain context
MIN_CHUNK_SIZE = 30  # Minimum viable chunk size
MAX_CHUNK_SIZE = 150  # Maximum chunk size

MAX_WORKERS = 4

# Corpus and storage paths
CORPUS_DIR = "/content/drive/MyDrive/AI Projects Hackathons/Buildathon_September25/Learning_Chatbot_Corpus"
STORAGE_DIR = "rag_vector_db"

print("🚀 Loading models...")
embedder = SentenceTransformer(EMBED_MODEL)
reranker = CrossEncoder(RERANKER_MODEL)
llm = pipeline("text2text-generation", model=LLM_MODEL, max_length=150)

print("✅ Models loaded successfully!")
print("📁 Corpus directory:", CORPUS_DIR)
print("💾 Storage directory:", STORAGE_DIR)
print("🔧 Enhanced chunking: Size={}, Overlap={}".format(CHUNK_SIZE, CHUNK_OVERLAP))


class PersistentFastRAG:
    def __init__(self, corpus_dir, storage_dir="rag_vector_db"):
        self.corpus_dir = Path(corpus_dir)
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True)

        # Storage files
        self.embeddings_file = self.storage_dir / "embeddings.npy"
        self.documents_file = self.storage_dir / "documents.json"
        self.index_file = self.storage_dir / "chunk_index.json"
        self.hash_file = self.storage_dir / "corpus_hash.txt"
        self.metadata_file = self.storage_dir / "metadata.json"

        # Runtime data
        self.documents = []
        self.embeddings = None
        self.chunk_index = {}
        self.query_cache = {}
        self.metadata = {}

    def get_corpus_hash(self):
        """Calculate hash of corpus to detect changes"""
        corpus_files = sorted(self.corpus_dir.glob("*.txt"))
        file_info = []

        for file_path in corpus_files:
            try:
                stat = file_path.stat()
                file_info.append(f"{file_path.name}:{stat.st_size}:{stat.st_mtime}")
            except:
                file_info.append(f"{file_path.name}:error")

        corpus_signature = "|".join(file_info)
        return hashlib.md5(corpus_signature.encode()).hexdigest()

    def needs_rebuilding(self):
        """Check if vector database needs rebuilding"""
        required_files = [self.embeddings_file, self.documents_file, self.index_file, self.hash_file, self.metadata_file]

        if not all(f.exists() for f in required_files):
            print("📂 Vector database files missing - building from scratch")
            return True

        try:
            with open(self.hash_file, 'r') as f:
                stored_hash = f.read().strip()

            current_hash = self.get_corpus_hash()

            if stored_hash != current_hash:
                print("🔄 Corpus has changed - rebuilding vector database")
                return True
            else:
                print("✅ Corpus unchanged - loading from vector database")
                return False
        except:
            print("⚠️ Error checking corpus hash - rebuilding")
            return True

    def clean_text(self, text):
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'\n\s*\n', '\n', text)
        return text.strip()

    def enhanced_smart_chunk(self, text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
        """Enhanced chunking with multiple strategies"""

        # Strategy 1: Sentence-based chunking (primary)
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]

        chunks = []
        current_chunk = []
        current_length = 0

        for sentence in sentences:
            words = sentence.split()
            sentence_length = len(words)

            # If single sentence is too long, split it further
            if sentence_length > chunk_size:
                # Split long sentence by commas, semicolons
                sub_parts = re.split(r'[,;]+', sentence)
                for part in sub_parts:
                    part_words = part.strip().split()
                    if len(part_words) > MIN_CHUNK_SIZE:
                        if current_chunk:
                            chunks.append(' '.join(current_chunk))
                            current_chunk = []
                            current_length = 0

                        # Add large parts as separate chunks
                        chunks.append(part.strip())
            else:
                # Normal sentence processing
                if current_length + sentence_length <= chunk_size:
                    current_chunk.append(sentence)
                    current_length += sentence_length
                else:
                    if current_chunk:
                        chunks.append('. '.join(current_chunk) + '.')

                    # Add overlap from previous chunk
                    overlap_sentences = current_chunk[-overlap//10:] if len(current_chunk) > overlap//10 else []
                    current_chunk = overlap_sentences + [sentence]
                    current_length = sum(len(s.split()) for s in current_chunk)

        # Add final chunk
        if current_chunk:
            chunks.append('. '.join(current_chunk) + '.')

        # Strategy 2: Split very large chunks further
        final_chunks = []
        for chunk in chunks:
            words = chunk.split()
            if len(words) > MAX_CHUNK_SIZE:
                # Split large chunks into smaller ones
                for i in range(0, len(words), chunk_size):
                    sub_chunk = ' '.join(words[i:i+chunk_size])
                    if len(sub_chunk.split()) >= MIN_CHUNK_SIZE:
                        final_chunks.append(sub_chunk)
            elif len(words) >= MIN_CHUNK_SIZE:
                final_chunks.append(chunk)

        return final_chunks if final_chunks else [text]

    def paragraph_chunk(self, text, target_size=CHUNK_SIZE):
        """Alternative: paragraph-based chunking"""
        paragraphs = text.split('\n\n')
        chunks = []
        current_chunk = []
        current_length = 0

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            para_length = len(para.split())

            if para_length > target_size:
                # Large paragraph - use sentence chunking
                if current_chunk:
                    chunks.append('\n'.join(current_chunk))
                    current_chunk = []
                    current_length = 0

                # Split large paragraph
                para_chunks = self.enhanced_smart_chunk(para, target_size)
                chunks.extend(para_chunks)
            else:
                # Small paragraph - combine with others
                if current_length + para_length <= target_size:
                    current_chunk.append(para)
                    current_length += para_length
                else:
                    if current_chunk:
                        chunks.append('\n'.join(current_chunk))
                    current_chunk = [para]
                    current_length = para_length

        if current_chunk:
            chunks.append('\n'.join(current_chunk))

        return chunks

    def save_vector_db(self):
        """Save all data to persistent vector database"""
        print("💾 Saving to vector database...")

        np.save(self.embeddings_file, self.embeddings)

        with open(self.documents_file, 'w', encoding='utf-8') as f:
            json.dump(self.documents, f, ensure_ascii=False, indent=2)

        with open(self.index_file, 'w') as f:
            json.dump(self.chunk_index, f, indent=2)

        with open(self.hash_file, 'w') as f:
            f.write(self.get_corpus_hash())

        self.metadata = {
            'created_at': time.time(),
            'num_documents': len(self.documents),
            'embedding_model': EMBED_MODEL,
            'chunk_size': CHUNK_SIZE,
            'total_files': len(list(self.corpus_dir.glob("*.txt")))
        }

        with open(self.metadata_file, 'w') as f:
            json.dump(self.metadata, f, indent=2)

        print(f"✅ Vector database saved: {len(self.documents)} chunks, {self.embeddings.shape[0]} embeddings")

    def load_vector_db(self):
        """Load data from persistent vector database"""
        print("📂 Loading from vector database...")
        start_time = time.time()

        try:
            self.embeddings = np.load(self.embeddings_file)

            with open(self.documents_file, 'r', encoding='utf-8') as f:
                self.documents = json.load(f)

            with open(self.index_file, 'r') as f:
                self.chunk_index = json.load(f)

            with open(self.metadata_file, 'r') as f:
                self.metadata = json.load(f)

            load_time = time.time() - start_time
            print(f"✅ Loaded in {load_time:.2f}s: {len(self.documents)} documents, {self.embeddings.shape[0]} embeddings")
            return True
        except Exception as e:
            print(f"❌ Error loading: {e}")
            return False

    def build_vector_db(self):
        """Enhanced vector database building with better chunking"""
        print("🔧 Building enhanced vector database...")
        start_time = time.time()

        all_texts = []
        self.documents = []

        corpus_files = list(self.corpus_dir.glob("*.txt"))
        print(f"📄 Processing {len(corpus_files)} files...")

        for file_idx, file_path in enumerate(corpus_files):
            try:
                text = file_path.read_text(encoding='utf-8')
                text = self.clean_text(text)

                # Try both chunking strategies
                sentence_chunks = self.enhanced_smart_chunk(text, CHUNK_SIZE, CHUNK_OVERLAP)
                para_chunks = self.paragraph_chunk(text, CHUNK_SIZE)

                # Use the strategy that produces more balanced chunks
                if len(para_chunks) > 1 and abs(len(para_chunks) - len(sentence_chunks)) < 3:
                    chunks = para_chunks
                    chunk_method = "paragraph"
                else:
                    chunks = sentence_chunks
                    chunk_method = "sentence"

                print(f"📝 {file_path.name}: {len(chunks)} chunks ({chunk_method})")

                for chunk_idx, chunk in enumerate(chunks):
                    if len(chunk.strip()) >= MIN_CHUNK_SIZE:
                        doc_id = f"{file_path.stem}_{chunk_idx}"

                        self.documents.append({
                            'id': doc_id,
                            'text': chunk,
                            'source': file_path.name,
                            'file_idx': file_idx,
                            'chunk_idx': chunk_idx,
                            'word_count': len(chunk.split()),
                            'chunk_method': chunk_method,
                            'file_position': chunk_idx / len(chunks)  # Position in file
                        })
                        all_texts.append(chunk)

            except Exception as e:
                print(f"❌ Error processing {file_path}: {e}")

        # Build chunk index
        for i, doc in enumerate(self.documents):
            self.chunk_index[doc['id']] = i

        # Create embeddings
        print("🎯 Creating embeddings...")
        self.embeddings = embedder.encode(
            all_texts,
            batch_size=32,
            show_progress_bar=True,
            convert_to_numpy=True
        )

        # Save to storage
        self.save_vector_db()

        build_time = time.time() - start_time
        print(f"✅ Enhanced vector database built in {build_time:.2f} seconds!")
        print(f"📊 Average chunk size: {np.mean([doc['word_count'] for doc in self.documents]):.1f} words")

    def initialize(self):
        """Initialize the system - load existing or build new vector DB"""
        print("🚀 Initializing Persistent Fast RAG...")

        if self.needs_rebuilding():
            self.build_vector_db()
        else:
            success = self.load_vector_db()
            if not success:
                print("🔧 Failed to load, rebuilding...")
                self.build_vector_db()

        print(f"🎉 System ready with {len(self.documents)} document chunks!")
        return True

    def generate_multiple_queries(self, original_query):
        queries = [original_query]

        # Synonym expansion
        synonyms = {
            'agent': 'broker representative advisor',
            'policy': 'coverage plan insurance',
            'premium': 'payment cost price fee',
            'claim': 'settlement payout benefit',
            'underwriting': 'assessment evaluation approval'
        }

        words = original_query.lower().split()
        expanded_words = []
        for word in words:
            if word in synonyms:
                expanded_words.extend([word] + synonyms[word].split()[:2])
            else:
                expanded_words.append(word)

        query1 = ' '.join(expanded_words)
        if query1 != original_query:
            queries.append(query1)

        # Question reformulation
        reformulations = {
            'what is': 'explain',
            'how does': 'describe how',
            'role of': 'responsibilities of'
        }

        query_lower = original_query.lower()
        for pattern, replacement in reformulations.items():
            if pattern in query_lower:
                query2 = query_lower.replace(pattern, replacement)
                if query2 != original_query:
                    queries.append(query2)
                    break

        # Add context
        if 'insurance' not in original_query.lower():
            queries.append(f"{original_query} insurance")

        while len(queries) < 3:
            queries.append(original_query)

        return queries[:3]

    def fast_search(self, query, top_k=10):
        cache_key = f"{query}_{top_k}"
        if cache_key in self.query_cache:
            return self.query_cache[cache_key]

        query_emb = embedder.encode([query])
        similarities = np.dot(self.embeddings, query_emb.T).flatten()

        top_indices = np.argpartition(similarities, -top_k)[-top_k:]
        top_indices = top_indices[np.argsort(similarities[top_indices])[::-1]]

        results = []
        for idx in top_indices:
            if similarities[idx] > 0.1:
                doc = self.documents[idx]
                results.append({
                    'id': doc['id'],
                    'text': doc['text'],
                    'source': doc['source'],
                    'score': float(similarities[idx]),
                    'file_position': doc.get('file_position', 0)
                })

        self.query_cache[cache_key] = results
        return results

    def reciprocal_rank_fusion(self, result_lists, k=60):
        fusion_scores = defaultdict(float)
        all_results = {}

        for results in result_lists:
            for rank, result in enumerate(results):
                doc_id = result['id']
                fusion_scores[doc_id] += 1.0 / (k + rank + 1)

                if doc_id not in all_results:
                    all_results[doc_id] = result.copy()
                    all_results[doc_id]['fusion_score'] = 0

                all_results[doc_id]['fusion_score'] = fusion_scores[doc_id]

        return sorted(all_results.values(), key=lambda x: x['fusion_score'], reverse=True)

    def fast_rerank(self, query, candidates, top_k=5):
        if not candidates or len(candidates) <= top_k:
            return candidates

        try:
            pairs = [[query, candidate['text'][:300]] for candidate in candidates[:15]]
            scores = reranker.predict(pairs)

            for candidate, score in zip(candidates[:15], scores):
                candidate['rerank_score'] = float(score)

            reranked = sorted(candidates[:15], key=lambda x: x.get('rerank_score', 0), reverse=True)
            return reranked[:top_k]
        except Exception as e:
            print(f"⚠️ Reranking failed: {e}")
            return candidates[:top_k]

    def parallel_search(self, queries, top_k=10):
        with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            futures = [executor.submit(self.fast_search, query, top_k) for query in queries]
            results = [future.result() for future in concurrent.futures.as_completed(futures)]
        return results

    def advanced_search(self, query, top_k=5):
        queries = self.generate_multiple_queries(query)
        search_results = self.parallel_search(queries, top_k=15)

        if search_results:
            fused_results = self.reciprocal_rank_fusion(search_results)

            seen_ids = set()
            unique_results = []
            for result in fused_results:
                if result['id'] not in seen_ids:
                    seen_ids.add(result['id'])
                    unique_results.append(result)

            final_results = self.fast_rerank(query, unique_results, top_k)
            return final_results

        return []

    def enhanced_generate_answer(self, query, results):
        """Enhanced answer generation with better context handling"""
        if not results:
            return "No relevant information found."

        # Build better context with chunk positioning
        context_parts = []

        for i, result in enumerate(results[:3]):
            chunk_text = result['text']
            source = result['source']

            # Add context about chunk position
            file_position = result.get('file_position', 0)
            position_hint = ""
            if file_position < 0.3:
                position_hint = " (beginning of document)"
            elif file_position > 0.7:
                position_hint = " (end of document)"
            else:
                position_hint = " (middle section)"

            context_parts.append(f"Source {i+1} [{source}{position_hint}]: {chunk_text}")

        context = "\n\n".join(context_parts)

        # Enhanced prompt with specific instructions
        prompt = f"""Based on the provided context, answer the question accurately. Focus on the most relevant information from the sources.

Context:
{context}

Question: {query}

Instructions: Give a specific answer based on the context above. If the information is incomplete, say so.

Answer:"""

        try:
            response = llm(prompt, max_new_tokens=100, temperature=0.2, do_sample=True)
            answer = response[0]['generated_text']

            if "Answer:" in answer:
                answer = answer.split("Answer:")[-1].strip()
            else:
                # Fallback to extractive answer
                return self.enhanced_extractive_answer(query, results)

            return answer if answer else self.enhanced_extractive_answer(query, results)

        except Exception as e:
            print(f"⚠️ Generation failed: {e}")
            return self.enhanced_extractive_answer(query, results)

    def enhanced_extractive_answer(self, query, results):
        """Enhanced extractive answer with better sentence selection"""
        if not results:
            return "No information found."

        query_words = set(query.lower().split())
        candidate_sentences = []

        for result in results[:3]:
            sentences = re.split(r'[.!?]+', result['text'])
            for sentence in sentences:
                sentence = sentence.strip()
                if len(sentence) > 20:
                    sentence_words = set(sentence.lower().split())
                    overlap = len(query_words.intersection(sentence_words))

                    # Boost score for sentences with exact matches
                    exact_matches = sum(1 for word in query_words if word in sentence.lower())

                    score = overlap + (exact_matches * 2)  # Weight exact matches more

                    if score > 0:
                        candidate_sentences.append((sentence, score, result['source']))

        if candidate_sentences:
            # Sort by score and take top sentences
            candidate_sentences.sort(key=lambda x: x[1], reverse=True)

            # Build answer from top sentences
            answer_parts = []
            for sentence, score, source in candidate_sentences[:3]:
                answer_parts.append(f"• {sentence}. [{source}]")

            return "\n".join(answer_parts)
        else:
            # Fallback to first result
            return f"From {results[0]['source']}: {results[0]['text'][:300]}..."

    def answer_question(self, question):
        start_time = time.time()
        results = self.advanced_search(question, top_k=5)

        if not results:
            return "No relevant information found."

        answer = self.enhanced_generate_answer(question, results)

        total_time = time.time() - start_time
        print(f"⏱️ Answer generated in {total_time:.3f}s")

        return answer

    def get_info(self):
        return {
            'documents': len(self.documents),
            'embeddings_shape': self.embeddings.shape if self.embeddings is not None else None,
            'cache_size': len(self.query_cache),
            'storage_size_mb': sum(f.stat().st_size for f in self.storage_dir.glob('*') if f.is_file()) / (1024*1024)
        }

# Initialize the RAG system
print("🔧 Setting up Enhanced RAG system...")
rag_system = PersistentFastRAG(CORPUS_DIR, STORAGE_DIR)
rag_system.initialize()

print(f"\n📊 System Info: {rag_system.get_info()}")
print("\n🎉 Enhanced RAG system is ready for questions!")


generator = pipeline(
    "text-generation",
    model="google/gemma-2b-it",
    device_map="auto"
)


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

load_dotenv()
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)



DATABASE_DIR = 'buildathon_team_1/backend/database'

with open(os.path.join(DATABASE_DIR, 'users.json')) as f:
    usersjson = json.load(f)

with open(os.path.join(DATABASE_DIR, 'policies.json')) as f:
    policyjson = json.load(f)

with open(os.path.join(DATABASE_DIR, 'metrics.json')) as f:
    metricsjson = json.load(f)


# 1. Return top 10 users ranked by popularityScore of a given policy
@app.route('/api/policy/top', methods=['GET'])
def get_top_policies():
    # Sort all policies by their popularityScore (descending)
    sorted_policies = sorted(
        policyjson,
        key=lambda p: p.get("popularityScore", 0),
        reverse=True
    )

    # Get top 5
    top_policies = sorted_policies[:5]

    return jsonify({
        "success": True,
        "topPolicies": top_policies
    })


def create_policy_message(policy_id, user, policy):
    # Find the policy by ID
    
    if not policy:
        return f"Policy with ID {policy_id} not found."

    # Extract user and policy details
    full_name = user.get("personalDetails", {}).get("fullName", "Customer")
    email = user.get("personalDetails", {}).get("email", "")
    phone = user.get("personalDetails", {}).get("phoneNumber", "")

    policy_type = policy.get("policyType", "Insurance")
    insurer = policy.get("insuranceCompany", "Unknown")
    coverage = policy.get("coverageAmount", 0)
    premium = policy.get("premiumAmount", 0)
    tenure = policy.get("tenureYears", 0)
    features = ", ".join(policy.get("features", []))

    # Build personalized message
    message = (
        f"Hello {full_name},\n\n"
        f"We have a {policy_type} plan from {insurer} that may interest you.\n\n"
        f"Coverage Amount: ₹{coverage:,}\n"
        f"Premium: ₹{premium:,} ({policy.get('paymentFrequency', 'Yearly')})\n"
        f"Tenure: {tenure} years\n\n"
        f"Key Features: {features}\n\n"
        f"For more details, we can reach you at {email} or {phone}.\n\n"
        f"Regards,\nInsurance Advisory Team"
    )



    return message

# 2. Recommender system (GET), returns a dictionary (structure TBD)
@app.route('/api/recommender', methods=['GET'])
def recommender_system():


    try:
        import faiss
        FAISS_AVAILABLE = True
    except Exception:
        FAISS_AVAILABLE = False

    path_base = "buildathon_team_1/backend/database"
    with open(os.path.join(path_base, "policies.json"), "r") as f:
        policies = json.load(f)
    with open(os.path.join(path_base, "users.json"), "r") as f:
        users = json.load(f)
    with open(os.path.join(path_base, "metrics.json"), "r") as f:
        metrics = json.load(f)

    policies_df = pd.DataFrame(policies if isinstance(policies, list) else [policies])
    users_df = pd.DataFrame(users if isinstance(users, list) else [users])

    def extract_policy_row(policy):
        text = " ".join(policy.get("features", [])) + " " + policy.get("policyType", "")
        added_date = policy.get("addedDate", None)
        try:
            added_days = (datetime.now() - datetime.fromisoformat(added_date)).days
        except Exception:
            added_days = 365
        return {
            "policyId": policy["policyId"],
            "premiumAmount": float(policy.get("premiumAmount", 0)),
            "coverageAmount": float(policy.get("coverageAmount", 0)),
            "tenureYears": float(policy.get("tenureYears", 1)),
            "popularityScore": float(policy.get("popularityScore", 0.5)),
            "text": text,
            "addedDays": added_days
        }

    policy_features = pd.DataFrame([extract_policy_row(p) for p in policies])
    vectorizer = TfidfVectorizer(max_features=256)
    policy_text_matrix = vectorizer.fit_transform(policy_features["text"]).toarray()
    scaler = MinMaxScaler()
    policy_num = scaler.fit_transform(policy_features[["premiumAmount", "coverageAmount", "tenureYears"]])
    policy_embeddings = np.hstack([policy_text_matrix, policy_num]).astype("float32")
    policy_id_to_idx = {pid: i for i, pid in enumerate(policy_features["policyId"].tolist())}
    user_ids = [u["userId"] for u in users]
    policy_ids = policy_features["policyId"].tolist()
    R = np.zeros((len(user_ids), len(policy_ids)), dtype="float32")
    user_index = {uid: i for i, uid in enumerate(user_ids)}

    for u in users:
        ui = user_index[u["userId"]]
        for pol in u.get("insuranceDetails", []):
            pid = pol.get("policyId")
            if pid in policy_id_to_idx:
                pi = policy_id_to_idx[pid]
                R[ui, pi] = float(pol.get("userReview", 0.0)) / 5.0

    owned_centroids = np.zeros((len(users), policy_embeddings.shape[1]), dtype="float32")
    pop_weights = policy_features["popularityScore"].values
    pop_weights_norm = pop_weights / pop_weights.sum()

    for u_idx, u in enumerate(users):
        vecs = [policy_embeddings[policy_id_to_idx[pol["policyId"]]] for pol in u.get("insuranceDetails", []) if
                pol["policyId"] in policy_id_to_idx]
        if vecs:
            owned_centroids[u_idx] = np.mean(vecs, axis=0)
        else:
            owned_centroids[u_idx] = np.average(policy_embeddings, axis=0, weights=pop_weights_norm)

    def eta(n, t, k1, k2):
        a = (1 - np.exp(-k1 / max(t, 1))) / 2
        return a + (1 - a) * np.exp(-k2 / max(t, 1))

    def compute_weights(tu, tp, nu, np_, alpha, gamma, k1, k2):
        eta_u = float(eta(nu, tu, k1, k2))
        eta_p = float(eta(np_, tp, k1, k2))
        w_col = eta_u * (1 - eta_p)
        w_con = eta_p * (1 - eta_u)
        w_cc = alpha * max(0.0, 1 - eta_u - eta_p)
        w_pop = gamma * max(0.0, 1 - (w_col + w_con + w_cc))
        sumw = w_col + w_con + w_cc + w_pop
        if sumw <= 0:
            return 0.25, 0.25, 0.25, 0.25
        return w_col / sumw, w_con / sumw, w_cc / sumw, w_pop / sumw

    def popularity_score(idx):
        return float(policy_features.iloc[idx]["popularityScore"])

    def freshness_multiplier(idx, lam):
        age = float(policy_features.iloc[idx]["addedDays"])
        return float(np.exp(-lam * age))

    def collaborative_score_vectorized(user_idx):
        user_vec = R[user_idx].reshape(1, -1)
        sims = cosine_similarity(user_vec, R)[0]
        neighbors = np.argsort(sims)[::-1][1:6]
        if len(neighbors) == 0:
            return np.full((len(policy_ids),), 0.5, dtype="float32")
        weights = sims[neighbors]
        weights_sum = weights.sum() + 1e-9
        scores = (weights.reshape(-1, 1) * R[neighbors]).sum(axis=0) / weights_sum
        scores[scores == 0] = 0.5
        return scores

    def content_score_vectorized(user_idx):
        user_centroid = owned_centroids[user_idx].reshape(1, -1)
        return cosine_similarity(user_centroid, policy_embeddings)[0]

    def mmr_rerank(cands, scores, lamb, k_out):
        selected = []
        if len(cands) == 0:
            return []
        sims = cosine_similarity(policy_embeddings[cands])
        ranked = []
        candidates = list(range(len(cands)))
        first = int(np.argmax(scores))
        selected.append(candidates.pop(first))
        ranked.append(selected[-1])
        while len(ranked) < min(k_out, len(cands)):
            best_score = -np.inf
            best_idx = None
            for c in candidates:
                relevance = scores[c]
                max_sim = max(sims[c, s] for s in ranked) if ranked else 0.0
                mmr_score = lamb * relevance - (1 - lamb) * max_sim
                if mmr_score > best_score:
                    best_score = mmr_score
                    best_idx = c
            ranked.append(best_idx)
            candidates.remove(best_idx)
        return [cands[i] for i in ranked]

    def build_ann(index_vectors):
        if FAISS_AVAILABLE:
            dim = index_vectors.shape[1]
            index = faiss.IndexFlatIP(dim)
            faiss.normalize_L2(index_vectors)
            index.add(index_vectors)
            return "faiss", index
        else:
            nn = NearestNeighbors(n_neighbors=50, algorithm="auto", metric="cosine")
            nn.fit(index_vectors)
            return "sk", nn

    ann_index_type, ann_index = build_ann(policy_embeddings)

    def ann_topk(query_vec, k=50):
        q = query_vec.reshape(1, -1)
        if ann_index_type == "faiss":
            faiss.normalize_L2(q)
            D, I = ann_index.search(q.astype("float32"), k)
            return I[0].tolist(), D[0].tolist()
        else:
            D, I = ann_index.kneighbors(q, n_neighbors=min(k, len(policy_embeddings)))
            return I[0].tolist(), (1 - D[0]).tolist()

    def recommend_all_topk(k=3, candidate_k=20, exposure_cap_ratio=0.25, mmr_lambda=0.75, alpha=0.5, gamma=0.5, k1=0.1,
                           k2=0.2, lam=0.002):
        nu = len(users)
        np_ = len(policies)
        exposure_cap = max(1, int(np.ceil(exposure_cap_ratio * nu)))
        exposure_counts = {pid: 0 for pid in policy_ids}
        results = {}
        coll_cache = {}
        con_cache = {}
        for ui, u in enumerate(users):
            tu = (datetime.now() - datetime.fromisoformat(
                u["onboardingDetails"]["onboardingDate"].replace("Z", ""))).days
            tp = 365
            w_col, w_con, w_cc, w_pop = compute_weights(tu, tp, nu, np_, alpha, gamma, k1, k2)
            if ui not in coll_cache:
                coll_cache[ui] = collaborative_score_vectorized(ui)
            if ui not in con_cache:
                con_cache[ui] = content_score_vectorized(ui)
            coll_scores = coll_cache[ui]
            con_scores = con_cache[ui]
            cc_scores = 0.5 * (coll_scores + con_scores)
            pop_scores = np.array([popularity_score(i) for i in range(len(policy_ids))])
            raw_scores = w_col * coll_scores + w_con * con_scores + w_cc * cc_scores + w_pop * pop_scores
            freshness = np.array([freshness_multiplier(i, lam) for i in range(len(policy_ids))])
            blended = raw_scores * freshness
            norm = (blended - blended.min()) / (blended.max() - blended.min() + 1e-9)
            topk_idx = np.argsort(norm)[::-1][:candidate_k].tolist()
            reranked_idx = mmr_rerank(topk_idx, norm[topk_idx], mmr_lambda, k)
            final = []
            for pi in reranked_idx:
                pid = policy_ids[pi]
                cap = exposure_cap
                if exposure_counts[pid] >= cap:
                    penalty = 0.5 * (exposure_counts[pid] / cap)
                    adjusted_score = norm[pi] * (1 - penalty)
                else:
                    adjusted_score = norm[pi]
                final.append((pid, adjusted_score, pi))
            final_sorted = sorted(final, key=lambda x: x[1], reverse=True)[:k]
            assigned = []
            for pid, score, pi in final_sorted:
                if exposure_counts[pid] < exposure_cap:
                    assigned.append((pid, score))
                    exposure_counts[pid] += 1
            if len(assigned) < k:
                fill = [p for p in [policy_ids[i] for i in topk_idx] if exposure_counts[p] < exposure_cap]
                for pid in fill:
                    if len(assigned) >= k:
                        break
                    assigned.append((pid, 0.0))
                    exposure_counts[pid] += 1
            results[u["userId"]] = assigned[:k]
        return results

    recsys = {}
    recommendations = recommend_all_topk()
    for uid, recs in recommendations.items():
        rec_policies = []
        for i in recs:
            _policyId = i[0]

            if i[1] > 0:
                rec_policies.append(_policyId)
                u = next((item for item in usersjson if item["userId"] == uid), None)
                p = next((item for item in policyjson if item["policyId"] == _policyId), None)
                message = create_policy_message(_policyId,u,p)
                print("============u is=========")
                print(u)
                preferredChannel = u["preferredCommunicationMedium"]
                if(preferredChannel == 'Whatsapp'):
                    url = "http://127.0.0.1:5000/api/send_whatsapp"  
                    payload = {
                        "to": "919845823575",
                        "message": message
                    }

                    response = requests.post(url, json=payload)

                    if response.status_code == 200:
                        print("Success:", response.json())
                    else:
                        print("Error:", response.status_code, response.json())
                elif(preferredChannel == 'Phone'):
                    url = "http://127.0.0.1:5000/api/send_sms"  
                    payload = {
                        "to": "919845823575",
                        "message": message
                    }

                    response = requests.post(url, json=payload)

                    if response.status_code == 200:
                        print("Success:", response.json())
                    else:
                        print("Error:", response.status_code, response.json())
                else: 
                    url = "http://127.0.0.1:5000/api/send_email"  
                    payload = {
                        "to": "dhruvjalan0202@gmail.com",
                        "subject": "Greetings from TurtleMint",
                        "content": message
                    }

                    response = requests.post(url, json=payload)

                    if response.status_code == 200:
                        print("Success:", response.json())
                    else:
                        print("Error:", response.status_code, response.json())




        recsys[uid] = rec_policies

    print(recsys)


    response = {
        "success": True,
        "recommendations": recsys,
    }
    return jsonify(response)


# from your_rag_module import PersistentFastRAG  # replace with actual module if needed

RAG_STORAGE_DIR = 'buildathon_team_1/backend/rag_vector_db'
RAG_CORPUS_DIR = 'buildathon_team_1/backend/corpus'  # optional if needed by your class



rag_system = PersistentFastRAG(RAG_CORPUS_DIR, RAG_STORAGE_DIR)
rag_system.load_vector_db()

# Update /api/learning-rag endpoint
@app.route('/api/learning-rag', methods=['POST'])
def learning_rag_agent():
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({"success": False, "message": "Question text required"}), 400

    answer_text = rag_system.answer_question(question)
    sources_list = rag_system.get_info().get('documents', [])

    result = {
        "success": True,
        "answer": answer_text,
        "sources": sources_list
    }
    return jsonify(result)
@app.route('/api/calculate-metrics', methods=['GET'])
def calculatemetrics():
    import json
    import os
    import random
    from datetime import datetime
    from collections import Counter

    def calculate_metrics(user):
        leads_generated = len(user.get("referralDetails", {}).get("usersReferred", [])) + random.randint(5, 20)

        total_leads = leads_generated if leads_generated > 0 else 1
        converted = user.get("referralDetails", {}).get("totalSuccessfulConversions", 0)
        conversion_rate = round((converted / total_leads) * 100, 2)

        insurance = user.get("insuranceDetails", [])
        total_due = len([p for p in insurance if p.get("paymentStatus") in ["Missed", "On-time"]])
        renewed = len([p for p in insurance if p.get("paymentStatus") == "On-time"])
        renewal_rate = round((renewed / total_due) * 100, 2) if total_due else 0

        referrals_total = len(user.get("referralDetails", {}).get("usersReferred", []))
        referrals_converted = user.get("referralDetails", {}).get("totalSuccessfulConversions", 0)

        chat_details = user.get("chatDetails", [])
        total_msgs = sum(len(chat.get("messages", [])) for chat in chat_details)
        replies = sum(1 for chat in chat_details for msg in chat["messages"] if msg["sender"] == "AI")
        engagement_rate = round((replies / total_msgs) * 100, 2) if total_msgs else 0

        active_conversations = random.randint(5, 20)
        avg_response_time_hours = round(random.uniform(0.5, 5), 2)
        repeat_interactions = random.randint(3, 15)
        churn_rate = round(random.uniform(0, 15), 2)
        clv_estimate = random.randint(10000, 30000)

        leaderboard_rank = random.randint(1, 50)

        return {
            "LeadsGenerated": leads_generated,
            "ConversionRate": conversion_rate,
            "RenewalRate": renewal_rate,
            "Referrals": {
                "total": referrals_total,
                "converted": referrals_converted
            },
            "EngagementRate": engagement_rate,
            "Tier2": {
                "ActiveConversations": active_conversations,
                "AverageResponseTimeHours": avg_response_time_hours,
                "RepeatInteractions": repeat_interactions,
                "ChurnRate": churn_rate,
                "CustomerLifetimeValue": clv_estimate,
                "LeaderboardRank": leaderboard_rank
            }
        }

    def integrate_users(users_data):
        integrated = []
        totals = {
            "LeadsGenerated": 0,
            "Conversions": 0,
            "RenewalsDue": 0,
            "RenewalsDone": 0,
            "ReferralsTotal": 0,
            "ReferralsConverted": 0,
            "Messages": 0,
            "Replies": 0,
            "CampaignReach": {"WhatsApp": 0, "Facebook": 0, "Email": 0},
            "ActiveConversations": 0,
            "RepeatInteractions": 0,
            "CustomerLifetimeValue": 0
        }

        for user in users_data:
            metrics = calculate_metrics(user)
            integrated.append({
                "userId": user["userId"],
                "fullName": user["personalDetails"]["fullName"],
                "location": user["personalDetails"]["location"]["city"],
                "preferredChannel": user["personalDetails"]["preferredCommunicationMedium"],
                "metrics": metrics
            })

            totals["LeadsGenerated"] += metrics["LeadsGenerated"]
            totals["Conversions"] += metrics["Referrals"]["converted"]
            totals["ReferralsTotal"] += metrics["Referrals"]["total"]
            totals["ReferralsConverted"] += metrics["Referrals"]["converted"]

            totals["ActiveConversations"] += metrics["Tier2"]["ActiveConversations"]
            totals["RepeatInteractions"] += metrics["Tier2"]["RepeatInteractions"]
            totals["CustomerLifetimeValue"] += metrics["Tier2"]["CustomerLifetimeValue"]

        total_business_metrics = {
            "TotalLeadsGenerated": totals["LeadsGenerated"],
            "TotalConversions": totals["Conversions"],
            "TotalReferrals": totals["ReferralsTotal"],
            "TotalReferralsConverted": totals["ReferralsConverted"],
            "TotalCampaignReach": Counter(user["onboardingDetails"]["onboardingMedium"] for user in users_data),
            "TotalActiveConversations": totals["ActiveConversations"],
            "TotalRepeatInteractions": totals["RepeatInteractions"],
            "AggregateCustomerLifetimeValue": totals["CustomerLifetimeValue"]
        }

        return {
            "Users": integrated,
            "BusinessMetrics": total_business_metrics
        }

    # Example run
    with open(os.path.join(DATABASE_PATH, USERS_PATH), 'r') as f:
        users_data = json.load(f)

    integrated_json = integrate_users(users_data)

    with open(os.path.join(DIR_PATH, 'metrics.json'), "w", encoding="utf-8") as f:
        json.dump(integrated_json, f, indent=2, ensure_ascii=False)

    print(f"metrics.json file created in {DIR_PATH}")

    summary_text = "Business summary text goes here"

    return jsonify({
        "success": True,
        "summary": summary_text
    })

@app.route('/api/business-summary', methods=['GET'])
def business_summary_agent():
    business_metrics = metricsjson["BusinessMetrics"]

    generator = pipeline(
        "text-generation",
        model="google/gemma-2b-it",
        device_map="auto"
    )

    business_summary_input = (
        "You are an AI advisor for insurance micro-entrepreneurs in India. "
        "You are given a JSON file with aggregated business metrics for 30 clients. "
        "Summarize the key business performance, highlight strengths, risks, and "
        "provide 3-5 actionable recommendations. "
        "The data is:\n\n"
        f"{json.dumps(business_metrics, indent=2)}"
    )

    result = generator(business_summary_input, max_new_tokens=400, temperature=0.6)

    print(result[0]["generated_text"])
    summary_text = result[0]["generated_text"]

    return jsonify({
        "success": True,
        "summary": summary_text
    })


# 5. Business LLM Agent (POST), question text => dict answer
@app.route('/api/business-llm', methods=['POST'])
def business_llm_agent():
    metrics_data = metricsjson
    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({"success": False, "message": "Question required"}), 400

    def business_metrics_to_text(metrics):
        text = (
            f"Your business has generated a total of {metrics['TotalLeadsGenerated']} leads.\n"
            f"Out of these, {metrics['TotalConversions']} leads converted into paying clients.\n"
            f"You received {metrics['TotalReferrals']} referrals, with {metrics['TotalReferralsConverted']} successfully converted.\n"
            f"Campaign reach across channels is:\n"
            f"  Referral: {metrics['TotalCampaignReach']['Referral']}\n"
            f"  WhatsApp: {metrics['TotalCampaignReach']['WhatsApp']}\n"
            f"  Email: {metrics['TotalCampaignReach']['Email']}\n"
            f"  Ads: {metrics['TotalCampaignReach']['Ads']}\n"
            f"There are currently {metrics['TotalActiveConversations']} active conversations with customers.\n"
            f"Repeat interactions with customers total {metrics['TotalRepeatInteractions']}.\n"
            f"The aggregate customer lifetime value is ₹{metrics['AggregateCustomerLifetimeValue']}.\n"
        )
        return text
    def chat_with_business_owner(question, metrics_json):
        business_metrics = metrics_json["BusinessMetrics"]
        user_metrics = metrics_json["Users"]

        chat_prompt = (
            "You are an AI business assistant for Indian insurance micro-entrepreneurs. "
            "The business owner manages 30 clients. You are given aggregated metrics for their business, "
            "as well as per-user metrics. Use only this data to answer questions accurately. "
            "If the answer cannot be inferred, say so clearly. "
            "Do not hallucinate. Provide clear, data-driven insights. Give Answers with short explainations, after the keyword: \n"
            "Answer: Do not put a different Explaination field.\n\n"
            f"Business Metrics:\n {business_metrics_to_text(business_metrics)}\n\n"
            f"Question: {question}\n\n"
            "Answer:"
        )

        chat_response = generator(chat_prompt, max_new_tokens=400, temperature=0.5)
        return chat_response[0]["generated_text"]

    print(chat_with_business_owner(question, metrics_data))

    response = {
        "success": True,
        "answer": chat_with_business_owner(question, metrics_data).split('Answer:')[-1]
    }
    print('returning')
    return jsonify(response)


# 6. Text-to-audio (POST), text to .wav path
@app.route('/api/text-to-audio', methods=['POST'])
def text_to_audio():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({"success": False, "message": "Text required"}), 400

    tts = gTTS(text=text, lang='en')

    temp_mp3 = "temp_audio.mp3"
    tts.save(temp_mp3)

    audio = AudioSegment.from_mp3(temp_mp3)

    output_wav = "output_audio.wav"
    audio.export(output_wav, format="wav")
    os.remove(temp_mp3)

    print(f"Audio saved as {output_wav}")

    return jsonify({
        "success": True,
        "audioPath": output_wav
    })


# 7. Audio-to-text (POST), .wav file or path to text transcription
@app.route('/api/audio-to-text', methods=['POST'])
def audio_to_text():
    data = request.get_json()
    audio_path = data.get('audioPath')
    if not audio_path:
        return jsonify({"success": False, "message": "Audio path required"}), 400

    result = model.transcribe(audio_path)

# Print the transcription
    print(result["text"])

    transcript_text = result['text']
    return jsonify({
        "success": True,
        "transcript": transcript_text
    })


# 8. ContentGenLLM (POST), takes text and returns generated object
@app.route('/api/contentgen-llm', methods=['POST'])
def contentgen_llm():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({"success": False, "message": "Text required"}), 400

    # TODO: Insert LLM content generation logic here

    generated_object = {
        "title": "Generated Title",
        "body": "Generated content body goes here"
    }
    return jsonify({
        "success": True,
        "content": generated_object
    })

@app.route('/api/send_sms', methods=['POST'])
def send_sms():
    data = request.json
    to_number = data.get('to')
    message_body = data.get('message')
    if not to_number or not message_body:
        return jsonify({"success": False, "message": "Missing 'to' or 'message' parameter"}), 400

    try:
        if(len(to_number)==10):
            to_number = '91'+to_number
        sms = twilio_client.messages.create(
            from_='+15202638407',  # Your Twilio number
            to=f"+{to_number}",
            body=message_body
        )
        return jsonify({"success": True, "sid": sms.sid, "message": "SMS sent successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# 2. Send WhatsApp message endpoint
@app.route('/api/send_whatsapp', methods=['POST'])
def send_whatsapp():
    data = request.json
    to_number = data.get('to')
    message_body = data.get('message')
    if not to_number or not message_body:
        return jsonify({"success": False, "message": "Missing 'to' or 'message' parameter"}), 400

    try:
        if(len(to_number) == 10):
            to_number = '91'+to_number
        msg = twilio_client.messages.create(
            from_='whatsapp:+14155238886',  # Twilio Sandbox WhatsApp Number or your linked number
            to=f'whatsapp:+{to_number}',
            body=message_body
        )
        return jsonify({"success": True, "sid": msg.sid, "message": "WhatsApp message sent successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# 3. Send Email endpoint
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

@app.route('/api/send_email', methods=['POST'])
def send_email():
    print("In send_email")
    data = request.json
    to_email = data.get('to')
    subject = data.get('subject')
    content = data.get('content')

    if not to_email or not subject or not content:
        return jsonify({"success": False, "message": "Missing 'to', 'subject', or 'content' parameter"}), 400

    gmail_user = os.getenv('GMAIL_USER')
    gmail_password = os.getenv('GMAIL_APP_PASSWORD')

    if not gmail_user or not gmail_password:
        return jsonify({"success": False, "message": "Email credentials not configured"}), 500

    try:
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(content, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, to_email, msg.as_string())

        return jsonify({"success": True, "message": "Email sent successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True, port=5000)
