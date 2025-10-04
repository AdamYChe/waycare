import { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png';

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

  const handleLogin = () => {
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
            <img src={logo} alt="WayCare Logo" className="logo-image" />
          </div>
          <h1 className="brand-title">WAYCARE</h1>
          <p className="brand-subtitle">Hospital Navigation Assistant</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2 className="card-title">Welcome Back</h2>
          
          <div className="login-form">
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
              <label htmlFor="username" className="form-label">Employee ID</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Employee ID"
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
            <button type="button" onClick={handleLogin} className="login-button">
              Login to WayCare
            </button>
          </div>

          {/* Footer Info */}
          <div className="card-footer">
            <p>Navigate your hospital with ease</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;