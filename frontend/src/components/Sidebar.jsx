import { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const patients = [
    {
      name: 'John Doe',
      room: '405',
      nextRoom: '410',
      age: '54',
      gender: 'Male',
      condition: 'Post-operative recovery'
    },
    {
      name: 'Jane Smith',
      room: '302',
      nextRoom: '305',
      age: '67',
      gender: 'Female',
      condition: 'Cardiac monitoring'
    },
    {
      name: 'Carlos Rivera',
      room: '218',
      nextRoom: '220',
      age: '43',
      gender: 'Male',
      condition: 'Physical therapy'
    },
    {
      name: 'Allen Andrews',
      room: '356',
      nextRoom: '283',
      age: '25',
      gender: 'Male',
      condition: 'Broken knee'
    },
    {
      name: 'Mia Collins',
      room: '230',
      nextRoom: '345',
      age: '23',
      gender: 'Female',
      condition: 'Stretched ligment'
    }
  ];

  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const selectedPatient = patients[selectedPatientIndex];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Patient Information</h2>
      </div>

      <div className="patient-card">
        <div className="patient-field">
          <label>Patient Name</label>
          <select
            className="field-value dropdown"
            value={selectedPatientIndex}
            onChange={(e) => setSelectedPatientIndex(Number(e.target.value))}
          >
            {patients.map((patient, index) => (
              <option key={index} value={index}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="patient-field">
          <label>Current Room Number</label>
          <div className="field-value highlight">{selectedPatient.room}</div>
        </div>

        <div className="patient-field">
          <label>Next Room</label>
          <div className="field-value highlight">{selectedPatient.nextRoom}</div>
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
    </aside>
  );
}

export default Sidebar;
