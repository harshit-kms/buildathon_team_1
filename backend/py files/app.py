from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import numpy as np
import json
import requests
from sentence_transformers import SentenceTransformer
from transformers import pipeline

# -------------------
# Paths and Models
# -------------------
STORAGE_DIR = Path(r"buildathon_team_1\backend\rag_vector_db")
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL = "google/flan-t5-small"

embeddings = np.load(STORAGE_DIR / "embeddings.npy")
with open(STORAGE_DIR / "documents.json", "r", encoding="utf-8") as f:
    documents = json.load(f)

embedder = SentenceTransformer(EMBED_MODEL)
llm = pipeline("text2text-generation", model=LLM_MODEL, max_length=150)

# Recommender data
DATA_DIR = Path(r"buildathon_team_1\backend\database")
with open(DATA_DIR / "users.json", "r", encoding="utf-8") as f:
    users = json.load(f)
with open(DATA_DIR / "policies.json", "r", encoding="utf-8") as f:
    policies = json.load(f)

# -------------------
# FastAPI App
# -------------------
app = FastAPI(title="Fast RAG + Recommender + Image API")

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------
# RAG / QA Models
# -------------------
class QuestionRequest(BaseModel):
    question: str
    top_k: int = 5

def search(query, top_k=5):
    query_emb = embedder.encode([query])
    sims = np.dot(embeddings, query_emb.T).flatten()
    top_idx = np.argpartition(sims, -top_k)[-top_k:]
    top_idx = top_idx[np.argsort(sims[top_idx])[::-1]]
    results = []
    for idx in top_idx:
        if sims[idx] > 0.1:
            doc = documents[idx]
            results.append({
                "id": doc["id"],
                "text": doc["text"],
                "source": doc["source"],
                "score": float(sims[idx])
            })
    return results

def generate_answer(query, results):
    if not results:
        return "No relevant information found."
    context = "\n\n".join([f"Source [{r['source']}]: {r['text']}" for r in results[:3]])
    prompt = f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
    try:
        response = llm(prompt, max_new_tokens=100, temperature=0.2, do_sample=True)
        answer = response[0]["generated_text"]
        if "Answer:" in answer:
            answer = answer.split("Answer:")[-1].strip()
        return answer or results[0]["text"][:300]
    except:
        return results[0]["text"][:300]

@app.post("/ask")
def ask_question(req: QuestionRequest):
    if not req.question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    results = search(req.question, top_k=req.top_k)
    answer = generate_answer(req.question, results)
    return {"question": req.question, "answer": answer, "sources": [r["source"] for r in results]}

# -------------------
# Image Generation Endpoint
# -------------------
class ImageRequest(BaseModel):
    prompt: str
    company_name: str
    qr_data: str = None

@app.post("/generate_image")
def generate_image_endpoint(req: ImageRequest):
    if not req.prompt or not req.company_name:
        raise HTTPException(status_code=400, detail="Prompt and company_name are required")

    prompt_for_url = f"{req.prompt}. Include {req.company_name} at top right corner.".replace(" ", "%20")
    url = f"https://image.pollinations.ai/prompt/{prompt_for_url}"

    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Failed to generate image. Status code: {response.status_code}")

    return {"image_url": url, "qr_data": req.qr_data}

# -------------------
# Recommender System
# -------------------
class RecommenderRequest(BaseModel):
    user_id: str
    top_k: int = 5
    send_notifications: bool = False

def cosine_similarity_matrix(vecs1, vecs2):
    vecs1_norm = vecs1 / np.linalg.norm(vecs1, axis=1, keepdims=True)
    vecs2_norm = vecs2 / np.linalg.norm(vecs2, axis=1, keepdims=True)
    return np.dot(vecs1_norm, vecs2_norm.T)

def recommend_policies(user_id, top_k=5):
    user = next((u for u in users if u["id"] == user_id), None)
    if not user:
        return []

    user_emb = embedder.encode([user.get("profile_text", "")])
    policy_embs = np.array([p.get("embedding", np.zeros(384)) for p in policies])

    sims = cosine_similarity_matrix(user_emb, policy_embs).flatten()
    top_indices = np.argpartition(sims, -top_k)[-top_k:]
    top_indices = top_indices[np.argsort(sims[top_indices])[::-1]]

    recommendations = []
    for idx in top_indices:
        p = policies[idx]
        recommendations.append({
            "policy_id": p["id"],
            "policy_name": p["name"],
            "score": float(sims[idx]),
            "description": p.get("description", "")
        })
    return recommendations

def send_notifications(user_id, recommendations):
    for rec in recommendations:
        print(f"[Notification] User {user_id}: Recommended {rec['policy_name']}")

@app.post("/recommender")
def recommender(req: RecommenderRequest):
    recs = recommend_policies(req.user_id, req.top_k)
    if req.send_notifications:
        send_notifications(req.user_id, recs)
    return {"user_id": req.user_id, "recommendations": recs}

