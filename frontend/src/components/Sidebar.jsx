import { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [selectedPatient] = useState({
    name: 'John Doe',
    room: '405',
    age: '54',
    gender: 'Male',
    condition: 'Post-operative recovery'
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Patient Information</h2>
      </div>
      
      <div className="patient-card">
        <div className="patient-field">
          <label>Patient Name</label>
          <div className="field-value">{selectedPatient.name}</div>
        </div>
        
        <div className="patient-field">
          <label>Room Number</label>
          <div className="field-value highlight">{selectedPatient.room}</div>
        </div>
        
        <div className="patient-field">
          <label>Age</label>
          <div className="field-value">{selectedPatient.age}</div>
        </div>
        
        <div className="patient-field">
          <label>Gender</label>
          <div className="field-value">{selectedPatient.gender}</div>
        </div>
        
        <div className="patient-field">
          <label>Condition</label>
          <div className="field-value">{selectedPatient.condition}</div>
        </div>
      </div>

      <div className="route-section">
        <h3>Next Sectors</h3>
        <div className="route-info">
          <p className="route-note">Route information will be displayed here based on real-time hospital data</p>
          <div className="sector-list">
            <div className="sector-item">
              <span className="sector-number">1</span>
              <span className="sector-name">Main Entrance</span>
            </div>
            <div className="sector-item">
              <span className="sector-number">2</span>
              <span className="sector-name">Elevator B - Floor 4</span>
            </div>
            <div className="sector-item">
              <span className="sector-number">3</span>
              <span className="sector-name">East Wing Corridor</span>
            </div>
            <div className="sector-item active">
              <span className="sector-number">4</span>
              <span className="sector-name">Room 205</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;