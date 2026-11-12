const db = require('../config/db');

class UsuarioModel {
    static async listarTodos() {
        const [rows] = await db.query('SELECT id, nome, email FROM usuario');
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await db.query('SELECT id, nome, email FROM usuario WHERE id = ?', [id]);
        return rows[0];
    }

    static async criar({ nome, email, senha }) {
        const [result] = await db.query(
            'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        return { id: result.insertId, nome, email };
    }

    static async atualizar(id, { nome, email, senha }) {
        const [result] = await db.query(
            'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        );
        return result.affectedRows > 0;
    }

    static async deletar(id) {
        const [result] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = UsuarioModel;
