// backend/models/Patient.js
const db = require('../config/database');

class Patient {
    static async create({ hospitalId, name, age, roomNumber, gender, condition }) {
        const query = `
            INSERT INTO patients (hospital_id, name, age, room_number, gender, condition)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [hospitalId, name, age, roomNumber, gender, condition];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM patients WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async findAll(filters = {}) {
        let query = 'SELECT * FROM patients WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (filters.hospitalId) {
            query += ` AND hospital_id = $${paramCount}`;
            values.push(filters.hospitalId);
            paramCount++;
        }

        if (filters.roomNumber) {
            query += ` AND room_number = $${paramCount}`;
            values.push(filters.roomNumber);
            paramCount++;
        }

        if (filters.gender) {
            query += ` AND gender = $${paramCount}`;
            values.push(filters.gender);
            paramCount++;
        }

        query += ' ORDER BY created_at DESC';
        const result = await db.query(query, values);
        return result.rows;
    }

    static async update(id, updates) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                fields.push(`${dbKey} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }

        if (fields.length === 0) return null;

        values.push(id);
        const query = `
            UPDATE patients
            SET ${fields.join(', ')}
            WHERE id = $${paramCount}
            RETURNING *
        `;
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM patients WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = Patient;