import React, { useState } from 'react';
import './App.css';

interface App {
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  features: string[];
}

interface Asset {
  id: number;
  filename: string;
  artist: string;
  duration: string;
  rightsStatus: string;
  licenseType: string;
  expiryDate: string;
  usage: string;
  risk: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'appstore' | 'digitalassets' | 'natural'>('dashboard');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);

  const recommendedApps: App[] = [
    {
      name: 'Digital Asset Rights Manager',
      description: 'Automatically analyze music files and determine licensing rights, usage permissions, and royalty obligations.',
      category: 'Media & Entertainment',
      rating: 4.8,
      downloads: '2.3k',
      features: ['Rights Analysis', 'License Tracking', 'Royalty Calculation']
    },
    {
      name: 'Content Intelligence Suite',
      description: 'Extract structured data from documents, emails, and spreadsheets to create actionable business insights.',
      category: 'Data & Analytics',
      rating: 4.6,
      downloads: '1.8k',
      features: ['Data Extraction', 'Pattern Recognition', 'Insight Generation']
    },
    {
      name: 'Workflow Orchestrator',
      description: 'Create and manage automated workflows that connect data analysis, reporting, and action triggers.',
      category: 'Automation',
      rating: 4.9,
      downloads: '3.1k',
      features: ['Workflow Builder', 'Trigger Management', 'Integration Hub']
    }
  ];

  const sampleAssets: Asset[] = [
    {
      id: 1,
      filename: 'summer_hits_2024.mp3',
      artist: 'Various Artists',
      duration: '3:45',
      rightsStatus: 'Licensed',
      licenseType: 'Commercial',
      expiryDate: '2024-12-31',
      usage: 'Background Music',
      risk: 'Low'
    },
    {
      id: 2,
      filename: 'corporate_jingle.wav',
      artist: 'In-House Production',
      duration: '0:30',
      rightsStatus: 'Owned',
      licenseType: 'Full Rights',
      expiryDate: 'N/A',
      usage: 'Branding',
      risk: 'None'
    },
    {
      id: 3,
      filename: 'licensed_track_01.mp3',
      artist: 'External Artist',
      duration: '4:12',
      rightsStatus: 'Pending Review',
      licenseType: 'Limited',
      expiryDate: '2024-06-15',
      usage: 'Marketing Campaign',
      risk: 'Medium'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const response = "I'll create a Digital Asset Rights Manager app for you. This app will analyze music files, determine licensing rights, track usage, and generate compliance reports. Would you like me to build this app now?";
      setChatHistory(prev => [...prev, { type: 'assistant', message: response }]);
      
      // Add confirmation message after a short delay
      setTimeout(() => {
        const confirmation = "This new action will be enabled for you. An email will confirm this action and should hit your inbox in 15 mins. Click on it to authorize your new permissions.";
        setChatHistory(prev => [...prev, { type: 'assistant', message: confirmation }]);
      }, 2000);
    }, 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'licensed': return '#4caf50';
      case 'owned': return '#2196f3';
      case 'pending review': return '#ff9800';
      default: return '#757575';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Business App Platform</h1>
        <nav className="nav">
          <button 
            className={currentView === 'dashboard' ? 'active' : ''} 
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentView === 'appstore' ? 'active' : ''} 
            onClick={() => setCurrentView('appstore')}
          >
            App Store
          </button>
          <button 
            className={currentView === 'digitalassets' ? 'active' : ''} 
            onClick={() => setCurrentView('digitalassets')}
          >
            Digital Assets
          </button>

        </nav>
      </header>

      <main className="main">
        {currentView === 'dashboard' && (
          <div className="dashboard">
            <h2>Welcome to Business App Platform</h2>
            <p>Transform unstructured data into actionable insights and automate your workflows</p>
            
            <div className="dashboard-natural">
              <div className="natural-section">
                <h3>Natural Language Interface</h3>
                <p>Build apps and workflows using natural language. Describe what you need, and I'll create it for you.</p>
                
                <div className="example-prompts">
                  <h4>Example Prompts</h4>
                  <div className="prompt-list">
                    <button onClick={() => setChatInput("Create an app that analyzes music files and determines licensing rights")}>
                      Create an app that analyzes music files and determines licensing rights
                    </button>
                    <button onClick={() => setChatInput("Build a workflow that extracts data from emails and puts it into a spreadsheet")}>
                      Build a workflow that extracts data from emails and puts it into a spreadsheet
                    </button>
                    <button onClick={() => setChatInput("Make an app that monitors social media mentions and generates reports")}>
                      Make an app that monitors social media mentions and generates reports
                    </button>
                  </div>
                </div>

                <div className="chat-container">
                  <div className="chat-input">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="Describe the app or workflow you want to build..."
                      className="chat-text-input"
                    />
                    <button onClick={handleChatSubmit} className="send-btn">
                      Send
                    </button>
                  </div>
                  
                  <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.type}`}>
                        <div className="message-content">{msg.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3>Pinned Apps</h3>
                <div className="app-grid">
                  {recommendedApps.slice(0, 2).map((app, index) => (
                    <div key={index} className="app-card">
                      <h4>{app.name}</h4>
                      <p>{app.description}</p>
                      <div className="app-meta">
                        <span className="rating">⭐ {app.rating}</span>
                        <span className="downloads">{app.downloads} downloads</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'appstore' && (
          <div className="appstore">
            <h2>App Store</h2>
            <p>Discover apps that transform your data and automate your workflows</p>
            
            <div className="recommended-apps">
              <h3>Recommended for You</h3>
              <div className="app-grid">
                {recommendedApps.map((app, index) => (
                  <div key={index} className="app-card">
                    <h4>{app.name}</h4>
                    <p className="category">{app.category}</p>
                    <p>{app.description}</p>
                    <div className="features">
                      {app.features.map((feature, idx) => (
                        <span key={idx} className="feature">{feature}</span>
                      ))}
                    </div>
                    <div className="app-meta">
                      <span className="rating">⭐ {app.rating} ({app.downloads} downloads)</span>
                    </div>
                    <button className="install-btn">Install App</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'digitalassets' && (
          <div className="digital-assets">
            <h2>Digital Asset Manager</h2>
            <p>Manage music rights, licensing, and usage permissions for your media company</p>
            
            <div className="upload-section">
              <h3>Analyze New Asset</h3>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="file-input"
              />
              <p>Upload MP3, WAV, or other audio files to analyze rights and licensing</p>
            </div>

            {isAnalyzing && (
              <div className="analysis-progress">
                <h3>Analyzing Rights and Licensing</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                <p>{analysisProgress}% Complete</p>
              </div>
            )}

            <div className="asset-library">
              <h3>Asset Library</h3>
              <div className="asset-table">
                <table>
                  <thead>
                    <tr>
                      <th>File</th>
                      <th>Artist</th>
                      <th>Duration</th>
                      <th>Rights Status</th>
                      <th>License Type</th>
                      <th>Expiry Date</th>
                      <th>Usage</th>
                      <th>Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleAssets.map((asset) => (
                      <tr key={asset.id}>
                        <td>🎵 {asset.filename}</td>
                        <td>{asset.artist}</td>
                        <td>{asset.duration}</td>
                        <td>
                          <span 
                            className="status-chip"
                            style={{ backgroundColor: getStatusColor(asset.rightsStatus) }}
                          >
                            {asset.rightsStatus}
                          </span>
                        </td>
                        <td>{asset.licenseType}</td>
                        <td>{asset.expiryDate}</td>
                        <td>{asset.usage}</td>
                        <td>
                          <span 
                            className="risk-chip"
                            style={{ backgroundColor: getRiskColor(asset.risk) }}
                          >
                            {asset.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentView === 'natural' && (
          <div className="natural-language">
            <h2>Natural Language Interface</h2>
            <p>Build apps and workflows using natural language. Describe what you need, and I'll create it for you.</p>
            
            <div className="chat-container">
              <div className="chat-history">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.type}`}>
                    <div className="message-content">{msg.message}</div>
                  </div>
                ))}
              </div>
              
              <div className="chat-input">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Describe the app or workflow you want to build..."
                  className="chat-text-input"
                />
                <button onClick={handleChatSubmit} className="send-btn">
                  Send
                </button>
              </div>
            </div>

            <div className="example-prompts">
              <h3>Example Prompts</h3>
              <div className="prompt-list">
                <button onClick={() => setChatInput("Create an app that analyzes music files and determines licensing rights")}>
                  Create an app that analyzes music files and determines licensing rights
                </button>
                <button onClick={() => setChatInput("Build a workflow that extracts data from emails and puts it into a spreadsheet")}>
                  Build a workflow that extracts data from emails and puts it into a spreadsheet
                </button>
                <button onClick={() => setChatInput("Make an app that monitors social media mentions and generates reports")}>
                  Make an app that monitors social media mentions and generates reports
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
