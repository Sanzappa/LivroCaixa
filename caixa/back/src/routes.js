const Express = require('express');

const router = Express.Router();

const lancamentosController = require("./controllers/lancamentosController");

router.get("/livrocaixa/lancamentos", lancamentosController.listarLancamentos)
router.get("/livrocaixa/lancamentos/:data", lancamentosController.listaLancamento)
router.post("/livrocaixa/lancamentos", lancamentosController.cadastrarLancamento)
router.delete("/livrocaixa/lancamentos", lancamentosController.excluirLancamento)
router.put("/livrocaixa/lancamentos", lancamentosController.editarLancamento)

module.exports = router;