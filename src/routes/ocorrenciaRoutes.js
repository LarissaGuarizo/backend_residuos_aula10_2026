const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

router.get('/', ocorrenciaController.listar);
router.post('/', ocorrenciaController.cadastrar);
router.put('/:id', ocorrenciaController.atualizar);
router.delete('/:id', ocorrenciaController.excluir);

module.exports = router;


