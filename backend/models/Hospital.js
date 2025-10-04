// backend/models/Hospital.js
const db = require('../config/database');

class Hospital {
    static async create({ hospitalId, name, floorCount }) {
        const query = `
            INSERT INTO hospitals (hospital_id, name, floor_count)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [hospitalId, name, floorCount];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM hospitals WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async findByHospitalId(hospitalId) {
        const query = 'SELECT * FROM hospitals WHERE hospital_id = $1';
        const result = await db.query(query, [hospitalId]);
        return result.rows[0];
    }

    static async findAll() {
        const query = 'SELECT * FROM hospitals ORDER BY name';
        const result = await db.query(query);
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
            UPDATE hospitals
            SET ${fields.join(', ')}
            WHERE id = $${paramCount}
            RETURNING *
        `;
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM hospitals WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async getPatientsCount(id) {
        const query = 'SELECT COUNT(*) FROM patients WHERE hospital_id = $1';
        const result = await db.query(query, [id]);
        return parseInt(result.rows[0].count);
    }
}

module.exports = Hospital;