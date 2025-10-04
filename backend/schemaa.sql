-- backend/schema.sql

-- Create hospitals table
CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    hospital_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    floor_count INTEGER NOT NULL CHECK (floor_count > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0),
    room_number VARCHAR(50) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    condition TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_patients_hospital ON patients(hospital_id);
CREATE INDEX idx_patients_room ON patients(room_number);
CREATE INDEX idx_hospitals_hospital_id ON hospitals(hospital_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();