const db = require('../config/db');

class OcorrenciaModel {
    static async listarTodas() {
        const [rows] = await db.query(`
            SELECT o.*, u.nome AS nomeUsuario 
            FROM ocorrencia o 
            JOIN usuario u ON o.usuarioId = u.id
        `);
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM ocorrencia WHERE id = ?', [id]);
        return rows[0];
    }

    static async criar({ usuarioId, local, tipoResiduo, nivelRisco, data, status }) {
        const [result] = await db.query(
            `INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, data, status) 
             VALUES (?, ?, ?, COALESCE(?, 'Medio'), COALESCE(?, CURDATE()), COALESCE(?, 'Novo'))`,
            [usuarioId, local, tipoResiduo, nivelRisco, data, status]
        );
        return { id: result.insertId, usuarioId, local, tipoResiduo, nivelRisco, status };
    }

    static async atualizar(id, { local, tipoResiduo, nivelRisco, status }) {
        const [result] = await db.query(
            `UPDATE ocorrencia SET local = ?, tipoResiduo = ?, nivelRisco = ?, status = ? WHERE id = ?`,
            [local, tipoResiduo, nivelRisco, status, id]
        );
        return result.affectedRows > 0;
    }

    static async deletar(id) {
        const [result] = await db.query('DELETE FROM ocorrencia WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = OcorrenciaModel;
