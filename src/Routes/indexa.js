const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { loginAdminHandler } = require('../adminHandlers/Usuarios/loginAdminHandler');
const { registerHandler } = require('../Handlers/Usuarios/registerHandler');
const { getUsuariosHandler } = require('../adminHandlers/Usuarios/getUsuariosHandler');
const { updateUsuariosHandler } = require('../adminHandlers/Usuarios/updateUsuariosHandler');
const { getByIdUsuariosHandler } = require('../adminHandlers/Usuarios/getByIdUsuariosHandler');
const { deleteUsuarioHandler } = require('../adminHandlers/Usuarios/deleteUsuariosHandler');
const { agregarProductosHandler } = require('../adminHandlers/Productos/agregarProductosHandler');
const { agregarCategoriaHandler } = require('../adminHandlers/Categorias/agregarCategoriaHandler');
const { getCategoriasHandler } = require('../adminHandlers/Categorias/getCategoriasHandler');
const { agregarSubcategoriaHandler } = require('../adminHandlers/Subcategorias/agregarSubcategoriasHandler');
const { getSubcategoriasHandler } = require('../adminHandlers/Subcategorias/getSubcategoriasHandler');
const { getByIdCategoriaHandler } = require('../adminHandlers/Categorias/getByIdCategoriaHandler');
const { deleteCategoriaHandler } = require('../adminHandlers/Categorias/deleteCategoriaHandler');
const { deleteSubcategoriaHandler } = require('../adminHandlers/Subcategorias/deleteSubcategoriaHandler');
const { updateCategoriaHandler } = require('../adminHandlers/Categorias/updateCategoriaHandler');
const { updateSubcategoriaHandler } = require('../adminHandlers/Subcategorias/updateSubcategoriaController');
const { getByIdSubcategoriaHandler } = require('../adminHandlers/Subcategorias/getByIdSubcategoriaHandler');
const { getProductosHandler } = require('../adminHandlers/Productos/getProductosHandler');
const { getByIdProductoHandler } = require('../adminHandlers/Productos/getByIdProductoHandler');
const { getImagenes } = require('../adminControllers/Imagenes/getImagenesController');
const { deleteProductosHandler } = require('../adminHandlers/Productos/deleteProductosHandler');
const { getByNameProductoHandler } = require('../adminHandlers/Productos/getByNameProductoHandler');
const { getByNameUsuarioHandler } = require('../adminHandlers/Productos/getByNameUsuarioHandler');
const { updateProductosHandler } = require('../adminHandlers/Productos/updateProductosHandler');
const { loginHandler } = require('../Handlers/Usuarios/loginHandler');
const { getCarritosHandler } = require('../Handlers/Carrito/getCarritosHandler');
const { getByIdCarritoHandler } = require('../Handlers/Carrito/getByIdCarritoHandler');
const { updateCarritoHandler } = require('../Handlers/Carrito/updateCarritoHandler');
const { deleteCarritoHandler } = require('../Handlers/Carrito/deleteCarritoHandler');
const { crearPedidoHandler } = require('../Handlers/Pedido/crearPedidoHandler');
const { getPedidosHandler } = require('../Handlers/Pedido/getPedidosHandler');
const { getByIdPedidoHandler } = require('../Handlers/Pedido/getByIdPedidoHandler');
const { deletePedidoHandler } = require('../Handlers/Pedido/deletePedidoHandler');
const { updateEstadoPedidoHandler } = require('../Handlers/Pedido/updateEstadoPedidoHandler');
const { createPreferenceHandler, feedbackHandler } = require('../Handlers/MercadoPago/mercadoPagoHandler');
const { exportExcelHandler } = require('../Handlers/Excel/exportExcelHandler');
const { importExcelHandler, upload2 } = require('../Handlers/Excel/importExcelHandler');
const { getDescuentosHandler } = require('../adminHandlers/Descuentos/getDescuentosHandler');
const { agregarDescuentoHandler } = require('../adminHandlers/Descuentos/agregarDescuentoHandler');
const { updateDescuentoHandler } = require('../adminHandlers/Descuentos/updateDescuentosHandler');
const { deleteDescuentoHandler } = require('../adminHandlers/Descuentos/deleteDescuentosHandler');
const { getByIdDescuentoHandler } = require('../adminHandlers/Descuentos/getByIdDescuentosHandler');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
  });

const upload = multer({ storage });

const router = Router();

router.post("/loginAdmin", loginAdminHandler);
router.post("/login", loginHandler)
router.post("/register", registerHandler); 
router.get("/usuarios", getUsuariosHandler);
router.get('/usuarios/search', getByNameUsuarioHandler);
router.get("/usuarios/:id", getByIdUsuariosHandler);
router.put("/usuarios/:id", updateUsuariosHandler);
router.delete("/usuarios/:id", deleteUsuarioHandler);

router.post("/productos", upload.array('imagenes', 8), agregarProductosHandler);
router.get("/productos", getProductosHandler);
router.get("/productos/search", getByNameProductoHandler);
router.get("/productos/:id", getByIdProductoHandler);
router.delete("/productos/:id", deleteProductosHandler)
router.put("/productos/:id",  upload.array('imagenes', 8), updateProductosHandler)

router.post("/categorias", agregarCategoriaHandler);
router.get("/categorias", getCategoriasHandler);
router.get("/categorias/:id", getByIdCategoriaHandler)
router.delete("/categorias/:id", deleteCategoriaHandler)
router.put("/categorias/:id", updateCategoriaHandler)

router.post("/subcategorias", agregarSubcategoriaHandler);
router.get("/subcategorias/:id", getByIdSubcategoriaHandler)
router.get("/subcategorias", getSubcategoriasHandler)
router.delete("/subcategorias/:id", deleteSubcategoriaHandler)
router.put("/subcategorias/:id", updateSubcategoriaHandler)

router.get('/uploads/:imagen', getImagenes);

router.get('/carrito', getCarritosHandler);
router.get('/carrito/:id', getByIdCarritoHandler);
router.put('/carrito', updateCarritoHandler);
router.delete('/carrito/:id', deleteCarritoHandler);

router.post("/pedido", crearPedidoHandler);
router.get('/pedido', getPedidosHandler);
router.get('/pedido/:id', getByIdPedidoHandler);
router.delete('/pedido/:id', deletePedidoHandler)
router.put('/pedido/:id', updateEstadoPedidoHandler );

router.get('/descuentos', getDescuentosHandler);
router.post('/descuentos', agregarDescuentoHandler);
router.put('/descuentos/:id', updateDescuentoHandler);
router.delete('/descuentos/:id', deleteDescuentoHandler);
router.get('/descuentos/:id', getByIdDescuentoHandler);

router.post('/create_preference', createPreferenceHandler);
router.get('/feedback', feedbackHandler);

router.get('/export-excel', exportExcelHandler)

router.post('/import-excel', upload.single('file'), importExcelHandler);

module.exports = router;