"use client";

// Rest of your page.tsx code
import React, { useState, useRef, useEffect } from 'react';
import { Music, BarChart2, Wallet, FileMusic, Upload, Brain } from 'lucide-react';

const MinimalsApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const Logo = () => (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 border-2 border-black rounded-full" />
      <div 
        className="absolute w-1.5 h-1.5 bg-black rounded-full" 
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );

  const PricingTier = ({ title, price, description, features, highlighted = false }) => (
    <div className={`p-8 rounded-lg border ${highlighted ? 'border-black' : 'border-gray-200'}`}>
      <h3 className="font-mono text-xl mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-mono">${price}</span>
        <span className="text-gray-600 font-mono">/month</span>
      </div>
      <p className="text-gray-600 font-mono mb-6">{description}</p>
      <button 
        className={`w-full py-2 px-4 rounded-lg font-mono mb-6 ${
          highlighted ? 'bg-black text-white' : 'border border-black text-black'
        }`}
      >
        Start Distributing
      </button>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2" />
            <span className="font-mono text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => {
    const [activeView, setActiveView] = useState('releases');
    const [isPlaying, setIsPlaying] = useState(false);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const startDrawing = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      setIsDrawing(true);
      setLastX(e.clientX - rect.left);
      setLastY(e.clientY - rect.top);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      setLastX(x);
      setLastY(y);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    }, [activeView]);

    const Sidebar = () => (
      <div className="w-64 bg-gray-50 h-screen p-6 border-r">
        <div className="flex items-center space-x-2 mb-12">
          <Logo />
          <span className="text-black text-xl font-mono">minimals.io</span>
        </div>
        <nav className="space-y-2">
          {[
            { icon: FileMusic, label: 'Releases', value: 'releases' },
            { icon: Upload, label: 'New Release', value: 'upload' },
            { icon: BarChart2, label: 'Analytics', value: 'analytics' },
            { icon: Wallet, label: 'Payments', value: 'payments' },
            { icon: Brain, label: 'Place to Think', value: 'think' }
          ].map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => setActiveView(value)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg font-mono ${
                activeView === value ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    );

    const MainContent = () => (
      <div className="flex-1 p-8">
        {activeView === 'releases' && (
          <>
            <h2 className="text-2xl font-mono mb-6">Your Releases</h2>
            <div className="space-y-4">
              {[
                { title: 'Summer EP', status: 'Live', streams: '45,231', revenue: '$392.45' },
                { title: 'Midnight', status: 'Processing', streams: '-', revenue: '-' }
              ].map((release, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-mono text-lg mb-1">{release.title}</h3>
                      <span className={`text-sm font-mono ${
                        release.status === 'Live' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {release.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono mb-1">{release.streams} streams</p>
                      <p className="font-mono text-gray-600">{release.revenue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === 'upload' && (
          <>
            <h2 className="text-2xl font-mono mb-6">New Release</h2>
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-center space-y-4">
                <Upload size={32} className="mx-auto text-gray-400" />
                <p className="font-mono text-gray-600">Drag and drop your music files here</p>
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 font-mono">
                  Select Files
                </button>
                <p className="text-sm text-gray-500 font-mono">
                  All major platforms · Keep 90% royalties · Fast approval
                </p>
              </div>
            </div>
          </>
        )}

        {activeView === 'think' && (
          <>
            <h2 className="text-2xl font-mono mb-6">Place to Think</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Drawing Space */}
              <div className="bg-white rounded-lg border col-span-2">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <p className="font-mono text-gray-600">Visual Flow</p>
                    <div className="space-x-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-black text-white px-4 py-2 rounded-lg font-mono text-sm"
                      >
                        {isPlaying ? 'Pause Music' : 'Play Music'}
                      </button>
                      <button 
                        onClick={clearCanvas}
                        className="border border-black px-4 py-2 rounded-lg font-mono text-sm"
                      >
                        Clear Canvas
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-96">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                  />
                </div>
              </div>

              {/* Pomodoro Timer */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-mono text-lg">Focus Timer</h3>
                  <select className="font-mono text-sm border rounded-lg px-3 py-2">
                    <option value="25">25 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-mono mb-8">25:00</div>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-mono">
                    Start Session
                  </button>
                </div>
              </div>

              {/* Word Generator */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="font-mono text-lg mb-6">Inspiration Generator</h3>
                <div className="space-y-4 text-center">
                  <div className="font-mono text-2xl mb-6">ethereal • midnight • whisper</div>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-mono">
                    Generate New Words
                  </button>
                </div>
              </div>

              {/* Breathing Exercise */}
              <div className="bg-white rounded-lg border p-6 col-span-2">
                <h3 className="font-mono text-lg mb-6">Breathe</h3>
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Sound Palette */}
              <div className="bg-white rounded-lg border p-6 col-span-2">
                <h3 className="font-mono text-lg mb-6">Ambient Sounds</h3>
                <div className="grid grid-cols-4 gap-4">
                  {['Rain', 'Waves', 'Forest', 'White Noise'].map((sound) => (
                    <button 
                      key={sound}
                      className="p-4 border rounded-lg font-mono text-sm hover:bg-gray-50"
                    >
                      {sound}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'payments' && (
          <>
            <h2 className="text-2xl font-mono mb-6">Payments</h2>
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-mono text-lg">Available Balance</h3>
                  <p className="text-3xl font-mono mt-1">$392.45</p>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 font-mono">
                  Withdraw
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );

    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <MainContent />
      </div>
    );
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-black text-xl font-mono">minimals.io</span>
        </div>
        <div className="space-x-8">
          <button className="text-gray-600 hover:text-black font-mono">Features</button>
          <button className="text-gray-600 hover:text-black font-mono">Pricing</button>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 font-mono"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-mono mb-6 text-center">
          Music distribution, simplified.
        </h1>
        <p className="text-xl text-gray-600 mb-2 font-mono text-center max-w-2xl mx-auto">
          Everything you need, nothing you don't<span className="text-black">*</span>
        </p>
        <p className="text-xs text-gray-400 mb-12 font-mono text-center">
          * besides our beloved "Place to Think" — because every artist needs a space to breathe
        </p>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-100 p-2 rounded-lg">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded font-mono ${
                billingCycle === 'monthly' ? 'bg-white shadow' : ''
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded font-mono ${
                billingCycle === 'annual' ? 'bg-white shadow' : ''
              }`}
            >
              Annual (20% off)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingTier 
            title="Basic"
            price={billingCycle === 'monthly' ? '15' : '12'}
            description="Perfect for new artists"
            features={[
              'Unlimited music distribution',
              'All major platforms',
              'Basic Smart Link creation',
              'Simple Bio Link page',
              'Basic publishing registration',
              'Keep 85% of earnings',
              'Email support'
            ]}
          />
          <PricingTier 
            title="Pro"
            price={billingCycle === 'monthly' ? '25' : '20'}
            description="For growing artists"
            highlighted={true}
            features={[
              'Everything in Basic, plus:',
              'Advanced Smart Links & Analytics',
              'Customizable Bio Link page',
              'Unlimited Pre-save campaigns',
              'Full publishing administration',
              'YouTube Content ID',
              'Keep 90% of earnings',
              'Priority support'
            ]}
          />
          <PricingTier 
            title="Label"
            price={billingCycle === 'monthly' ? '50' : '40'}
            description="For serious artists & labels"
            features={[
              'Everything in Pro, plus:',
              'White-label Smart Links',
              'Multiple artist Bio Links',
              'Advanced Pre-save features',
              'Global publishing collection',
              'Neighboring rights registration',
              'Keep 95% of earnings',
              'Dedicated account manager'
            ]}
          />
        </div>
      </div>
    </div>
  );

  return currentPage === 'landing' ? <LandingPage /> : <Dashboard />;
};

export default MinimalsApp;
