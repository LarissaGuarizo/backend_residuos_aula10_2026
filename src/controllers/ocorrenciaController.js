const db = require('../config/db');


const listar = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM ocorrencia');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};


const cadastrar = async (req, res) => {
    try {
        const { usuarioId, local, tipoResiduo, nivelRisco, data, status } = req.body;
        const [result] = await db.query(
            `INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, data, status) 
             VALUES (?, ?, ?, COALESCE(?, 'Medio'), COALESCE(?, CURDATE()), COALESCE(?, 'Novo'))`,
            [usuarioId, local, tipoResiduo, nivelRisco, data, status]
        );
        res.status(201).json({ id: result.insertId, mensagem: 'Cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { local, tipoResiduo, nivelRisco, status } = req.body;
        const [result] = await db.query(
            'UPDATE ocorrencia SET local = ?, tipoResiduo = ?, nivelRisco = ?, status = ? WHERE id = ?',
            [local, tipoResiduo, nivelRisco, status, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Ocorrência não encontrada' });
        }
        res.json({ mensagem: 'Atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};


const excluir = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM ocorrencia WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Ocorrência não encontrada' });
        }
        res.json({ mensagem: 'Excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};

