import './Home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // or '../assets/logo.png'
import Sidebar from '../components/Sidebar.jsx';
import HospitalViewer from '../components/HospitalViewer.jsx';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const hospitalName = state?.hospital || 'Your Hospital';
  const [patient, setPatient] = useState(null);

  const handleLogout = () => {
    // clear any session state if you add it later
    navigate('/', { replace: true });
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="WayCare" className="nav-logo" />
          <div style={{marginLeft: 12, fontWeight: 700, color:'#0066CC'}}>
            {hospitalName}
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Sidebar onSelect={setPatient}/>
        <HospitalViewer object={patient}/>
      </div>
    </div>
  );
}

export default Home;
