const { imageUpload } = require('../middlewares/imageUpload');
const adminAuth = require('../middlewares/authAdmin');
const { formCardapio, saveItemCardapio, formEdicaoCardapio, salvaAltCardapio, listaItemCardapio, deleteCardapio  } = require('../controllers/CardapioController');

const router = require('express').Router();

router.get('/cadastro', formCardapio);

router.post('/cadastro/save', imageUpload.single('image'), saveItemCardapio);

router.get('/item-cardapio', adminAuth , listaItemCardapio);

router.get('/item-cardapio/edit/:id',imageUpload.single('image'), adminAuth, formEdicaoCardapio );

router.post('/item-cardapio/edit', salvaAltCardapio ,adminAuth);

router.post('/item-cardapio/delete', deleteCardapio ,adminAuth );

module.exports = router;