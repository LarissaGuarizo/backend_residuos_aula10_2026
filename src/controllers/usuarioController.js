const UsuarioModel = require('../models/usuarioModel');

class UsuarioController {
    static async listar(req, res) {
        try {
            const usuarios = await UsuarioModel.listarTodos();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const usuario = await UsuarioModel.buscarPorId(req.params.id);
            if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async criar(req, res) {
        try {
            const novo = await UsuarioModel.criar(req.body);
            res.status(201).json(novo);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const ok = await UsuarioModel.atualizar(req.params.id, req.body);
            if (!ok) return res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json({ mensagem: 'Atualizado com sucesso' });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const ok = await UsuarioModel.deletar(req.params.id);
            if (!ok) return res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json({ mensagem: 'Excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = UsuarioController;
