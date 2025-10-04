import { useState } from 'react';
import './Login.css';

function Login() {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hospitals = [
    'Tampa General Hospital',
    'Memorial Hospital',
    'St. Joseph\'s Hospital',
    'Moffitt Cancer Center',
    'AdventHealth Tampa',
    'James A. Haley Veterans Hospital',
    'Tampa Community Hospital',
    'University of South Florida Health'
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedHospital && username && password) {
      alert(`Welcome to ${selectedHospital}!`);
      console.log('Login successful:', { hospital: selectedHospital, username });
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Logo and Title */}
        <div className="login-header">
          <div className="logo-container">
            <svg width="120" height="120" viewBox="0 0 200 200" className="logo-svg">
              {/* Medical Cross */}
              <path d="M100 20 L120 20 L120 80 L180 80 L180 100 L120 100 L120 160 L100 160 L100 100 L40 100 L40 80 L100 80 Z" 
                    fill="url(#blueGradient)" stroke="#0066CC" strokeWidth="3"/>
              
              {/* Heartbeat Line */}
              <path d="M60 90 L75 90 L85 70 L95 110 L105 70 L115 90 L140 90" 
                    fill="none" stroke="#0066CC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              
              {/* Stethoscope Circle */}
              <circle cx="100" cy="175" r="12" fill="white" stroke="#0066CC" strokeWidth="4"/>
              <circle cx="100" cy="175" r="6" fill="#0066CC"/>
              <line x1="100" y1="163" x2="100" y2="155" stroke="#0066CC" strokeWidth="4"/>
              
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4DA8FF"/>
                  <stop offset="100%" stopColor="#0066CC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="brand-title">WAYCARE</h1>
          <p className="brand-subtitle">Hospital Navigation Assistant</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2 className="card-title">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="login-form">
            {/* Hospital Dropdown */}
            <div className="form-group">
              <label className="form-label">Select Hospital</label>
              <div className="dropdown-wrapper">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="dropdown-button"
                >
                  <span className={selectedHospital ? 'selected-text' : 'placeholder-text'}>
                    {selectedHospital || 'Choose a hospital...'}
                  </span>
                  <svg className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {hospitals.map((hospital, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedHospital(hospital);
                          setIsDropdownOpen(false);
                        }}
                        className="dropdown-item"
                      >
                        <svg className="hospital-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {hospital}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button">
              Login to WayCare
            </button>
          </form>

          {/* Footer Info */}
          <div className="card-footer">
            <p>Navigate your hospital with ease</p>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="bottom-tagline">
          <p>🏥 Real-time navigation • 🗺️ Smart routing • 👨‍⚕️ Healthcare optimized</p>
        </div>
      </div>
    </div>
  );
}

export default Login;