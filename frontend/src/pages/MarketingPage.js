import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  X,
  Sparkles,
  Send,
  Calendar,
  BarChart3,
  Zap,
  Star,
  Image,
  Wand2,
  Download,
  Copy,
  RefreshCw,
  FileText,
  PenTool
} from 'lucide-react';

import Layout from '../components/Layout';

const MarketingPage = () => {
  const [showImageGeneration, setShowImageGeneration] = useState(false);
  const [showTextGeneration, setShowTextGeneration] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [textPrompt, setTextPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedText, setGeneratedText] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [textHistory, setTextHistory] = useState([]);

  // Campaign Stats
  const [campaignStats] = useState({
    campaignsSent: 24,
    totalRecipients: 156,
    responseRate: 32,
    conversions: 18
  });

  // Recent Campaigns Data
  const [recentCampaigns] = useState([
    {
      id: 1,
      name: "Diwali Greetings 2024",
      sentTime: "2 hours ago",
      channel: "WhatsApp",
      recipients: 45,
      delivered: 43,
      responses: 12,
      responseRate: 27
    },
    {
      id: 2,
      name: "Health Policy Renewals",
      sentTime: "1 day ago",
      channel: "SMS",
      recipients: 28,
      delivered: 28,
      responses: 8,
      responseRate: 29
    },
    {
      id: 3,
      name: "Investment Plans Intro",
      sentTime: "3 days ago",
      channel: "WhatsApp",
      recipients: 35,
      delivered: 34,
      responses: 15,
      responseRate: 43
    }
  ]);

  // Text prompt suggestions
  const textPromptSuggestions = [
    "Write a WhatsApp message for Diwali greetings to insurance clients",
    "Create an SMS about health insurance policy renewal reminder",
    "Generate a personalized message for life insurance prospects",
    "Write a follow-up message for investment plan inquiries",
    "Create a birthday greeting message for clients with insurance offers",
    "Generate a claim settlement confirmation message"
  ];

  // Image prompt suggestions
  const promptSuggestions = [
    "A professional insurance agent helping a family, modern office setting, bright and welcoming",
    "Health insurance concept with medical symbols, clean blue and white design, professional",
    "Life insurance protection concept, family silhouette under umbrella, warm colors",
    "Investment growth chart with coins and plants, financial success theme, green and gold",
    "Digital insurance technology, smartphone with shield icon, modern tech aesthetic",
    "Happy family celebrating Diwali with insurance protection theme, festive colors"
  ];

  const handleImageGeneration = () => {
    setShowImageGeneration(true);
  };

  const handleTextGeneration = () => {
    setShowTextGeneration(true);
  };

  const handleGenerateText = async () => {
    if (!textPrompt.trim()) return;

    setIsGeneratingText(true);
    
    // Simulate text generation (replace with actual API call)
    setTimeout(() => {
      const mockResponses = {
        "diwali": "🪔 Wishing you and your family a very Happy Diwali! 🪔\n\nMay this festival of lights bring prosperity, happiness, and good health to your home. Just like Diwali illuminates our lives, let our insurance policies protect and secure your family's future.\n\n✨ Special Diwali Offer: Get 15% off on new policy premiums!\n\nCall us at +91-9876543210 for more details.\n\nWarm regards,\n[Your Name]\n[Insurance Company]",
        
        "health": "Dear [Client Name],\n\nYour health insurance policy is due for renewal on [Date]. Don't let your health coverage lapse!\n\n🏥 Key Benefits:\n• Cashless treatment at 5000+ hospitals\n• No waiting period for renewals\n• 24/7 claim support\n\nRenew now to continue enjoying uninterrupted health protection for you and your family.\n\nClick here to renew: [Link]\nOr call us: +91-9876543210\n\nStay Protected,\n[Your Name]",
        
        "default": "Dear [Client Name],\n\nThank you for your interest in our insurance services. We understand that choosing the right insurance plan is an important decision for you and your family.\n\nOur team is here to help you find the perfect coverage that fits your needs and budget. We offer:\n\n• Comprehensive life insurance plans\n• Health insurance with extensive coverage\n• Investment-linked insurance policies\n• Quick and hassle-free claim settlements\n\nWould you like to schedule a free consultation to discuss your insurance needs?\n\nPlease reply or call us at +91-9876543210.\n\nBest regards,\n[Your Name]\n[Insurance Company]"
      };
      
      let responseText = mockResponses.default;
      const lowerPrompt = textPrompt.toLowerCase();
      
      if (lowerPrompt.includes('diwali') || lowerPrompt.includes('festival')) {
        responseText = mockResponses.diwali;
      } else if (lowerPrompt.includes('health') || lowerPrompt.includes('renewal')) {
        responseText = mockResponses.health;
      }
      
      const mockText = {
        id: Date.now(),
        prompt: textPrompt,
        content: responseText,
        createdAt: new Date().toLocaleString(),
        wordCount: responseText.split(' ').length
      };
      
      setGeneratedText(mockText);
      setTextHistory(prev => [mockText, ...prev.slice(0, 4)]); // Keep last 5 texts
      setIsGeneratingText(false);
    }, 2000);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate image generation (replace with actual API call)
    setTimeout(() => {
      const mockImage = {
        id: Date.now(),
        prompt: prompt,
        url: `https://picsum.photos/512/512?random=${Date.now()}`,
        createdAt: new Date().toLocaleString()
      };
      
      setGeneratedImage(mockImage);
      setImageHistory(prev => [mockImage, ...prev.slice(0, 4)]); // Keep last 5 images
      setIsGenerating(false);
    }, 3000);
  };

  const handlePromptSelect = (selectedPrompt) => {
    setPrompt(selectedPrompt);
  };

  const handleTextPromptSelect = (selectedPrompt) => {
    setTextPrompt(selectedPrompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateImage();
    }
  };

  const handleTextKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateText();
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      // Create download link
      const link = document.createElement('a');
      link.href = generatedImage.url;
      link.download = `generated-image-${generatedImage.id}.jpg`;
      link.click();
    }
  };

  const handleCopyPrompt = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage.prompt);
    }
  };

  const handleCopyText = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText.content);
    }
  };

  return (
    <Layout title="Marketing">
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Campaign Builder</h1>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg">Create and send personalized campaigns to your customers</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={handleTextGeneration}
              className="bg-blue-500 dark:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg justify-center"
            >
              <FileText className="w-5 h-5" />
              <span>Text Generation</span>
            </button>
            
            <button 
              onClick={handleImageGeneration}
              className="bg-teal-500 dark:bg-teal-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-200 flex items-center space-x-2 shadow-lg justify-center"
            >
              <Image className="w-5 h-5" />
              <span>Image Generation</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-6 sm:w-8 h-6 sm:h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.campaignsSent}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Campaigns Sent</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.totalRecipients}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Total Recipients</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.responseRate}%</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Response Rate</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.conversions}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Conversions</p>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Recent Campaigns</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Your latest campaign performance</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{campaign.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Sent {campaign.sentTime} via {campaign.channel}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:flex lg:items-center lg:space-x-8 text-center w-full lg:w-auto">
                    <div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{campaign.recipients}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Recipients</p>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{campaign.delivered}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Delivered</p>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">{campaign.responses}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Responses</p>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600 dark:text-teal-400">{campaign.responseRate}%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Generation Modal */}
        {showImageGeneration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Wand2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">AI Image Generation</h2>
                </div>
                <button 
                  onClick={() => setShowImageGeneration(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {/* Prompt Input Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Describe the image you want to generate
                  </label>
                  <div className="space-y-4">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your image description here... (e.g., 'A professional insurance agent helping a family, modern office setting, bright and welcoming')"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      rows={4}
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleGenerateImage}
                        disabled={!prompt.trim() || isGenerating}
                        className="flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Image</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prompt Suggestions */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Suggested Prompts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {promptSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptSelect(suggestion)}
                        className="text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{suggestion}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated Image Display */}
                {(generatedImage || isGenerating) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Generated Image</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      {isGenerating ? (
                        <div className="flex items-center justify-center h-64">
                          <div className="text-center">
                            <RefreshCw className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Generating your image...</p>
                          </div>
                        </div>
                      ) : generatedImage && (
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <img 
                              src={generatedImage.url} 
                              alt="Generated" 
                              className="max-w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={handleDownloadImage}
                              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                            <button
                              onClick={handleCopyPrompt}
                              className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copy Prompt</span>
                            </button>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Generated: {generatedImage.createdAt}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Image History */}
                {imageHistory.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Generations</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imageHistory.map((image, index) => (
                        <div key={image.id} className="group relative">
                          <img 
                            src={image.url} 
                            alt={`Generated ${index + 1}`}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setGeneratedImage(image)}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Text Generation Modal */}
        {showTextGeneration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <PenTool className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">AI Text Generation</h2>
                </div>
                <button 
                  onClick={() => setShowTextGeneration(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {/* Prompt Input Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Describe the text content you want to generate
                  </label>
                  <div className="space-y-4">
                    <textarea
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      onKeyPress={handleTextKeyPress}
                      placeholder="Enter your text description here... (e.g., 'Write a WhatsApp message for Diwali greetings to insurance clients')"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      rows={3}
                    />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleGenerateText}
                        disabled={!textPrompt.trim() || isGeneratingText}
                        className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                      >
                        {isGeneratingText ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Text</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prompt Suggestions */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Suggested Prompts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {textPromptSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleTextPromptSelect(suggestion)}
                        className="text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{suggestion}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generated Text Display */}
                {(generatedText || isGeneratingText) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Generated Text</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      {isGeneratingText ? (
                        <div className="flex items-center justify-center h-32">
                          <div className="text-center">
                            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Generating your text...</p>
                          </div>
                        </div>
                      ) : generatedText && (
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans">
                              {generatedText.content}
                            </pre>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                              onClick={handleCopyText}
                              className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copy Text</span>
                            </button>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Generated: {generatedText.createdAt} • {generatedText.wordCount} words
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Text History */}
                {textHistory.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Generations</h3>
                    <div className="space-y-3">
                      {textHistory.map((text, index) => (
                        <div key={text.id} className="group relative border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                             onClick={() => setGeneratedText(text)}>
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1">{text.prompt}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{text.wordCount} words</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{text.content}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{text.createdAt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MarketingPage;