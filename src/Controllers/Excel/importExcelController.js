// const xlsxPopulate = require('xlsx-populate');
// const { Producto } = require('../../DB_conection');

// const importExcelController = async (filePath) => {
//   try {
//     // Leer el archivo Excel
//     const workbook = await xlsxPopulate.fromFileAsync(filePath);
//     const sheet = workbook.sheet(0); // Obtener la primera hoja
//     const rows = sheet.usedRange().value();
//     const headers = rows[0];
//     const data = rows.slice(1);

//     // Procesar las filas del Excel
//     for (const row of data) {
//       // Filtrar filas vacías
//       if (row.every(cell => cell === null || cell === undefined || cell === '')) {
//         continue;
//       }

//       const productData = {
//         id: row[headers.indexOf('ID')],
//         name: row[headers.indexOf('Nombre')],
//         descripcion: row[headers.indexOf('Descripción')],
//         preciocompra: row[headers.indexOf('Precio Compra')],
//         precioventa: row[headers.indexOf('Precio Venta')],
//         preciopromo: row[headers.indexOf('Precio Promoción')],
        
//       };

//       // Verificar si las columnas esenciales no están undefined
//       if (productData.id === undefined || productData.name === undefined) {
//         console.log("Fila con datos esenciales faltantes, omitiendo:", productData);
//         continue;
//       }

//       // Buscar el producto por ID
//       let product = await Producto.findByPk(productData.id);
//       console.log("productData:", productData);
//       if (product) {
//         // Actualizar producto existente
//         await product.update(productData);
//       } else {
//         // Crear nuevo producto
//         await Producto.create(productData);
//       }
//     }

//     return { success: true, message: 'Productos importados y actualizados exitosamente' };
//   } catch (error) {
//     console.error('Error al importar productos:', error);
//     return { success: false, message: 'Error al importar productos. Por favor, inténtelo de nuevo más tarde.' };
//   }
// };

// module.exports = { importExcelController };

const xlsxPopulate = require('xlsx-populate');
const { Producto, Categoria, Subcategoria } = require('../../DB_conection');

const importExcelController = async (filePath) => {
  try {
    // Leer el archivo Excel
    const workbook = await xlsxPopulate.fromFileAsync(filePath);
    const sheet = workbook.sheet(0); // Obtener la primera hoja
    const rows = sheet.usedRange().value();
    const headers = rows[0];
    const data = rows.slice(1);

    // Procesar las filas del Excel
    for (const row of data) {
      // Filtrar filas vacías
      if (row.every(cell => cell === null || cell === undefined || cell === '')) {
        continue;
      }

      // Obtener los datos esenciales
      const productData = {
        id: row[headers.indexOf('ID')],
        name: row[headers.indexOf('Nombre')],
        descripcion: row[headers.indexOf('Descripción')],
        preciocompra: row[headers.indexOf('Precio Compra')],
        precioventa: row[headers.indexOf('Precio Venta')],
        preciopromo: row[headers.indexOf('Precio Promoción')],
      };

      // Verificar si las columnas esenciales no están undefined
      if (productData.id === undefined || productData.name === undefined) {
        console.log("Fila con datos esenciales faltantes, omitiendo:", productData);
        continue;
      }

      // Obtener las categorías y subcategorías desde el archivo Excel (por nombre)
      const categoriaName = row[headers.indexOf('Categoria')]; // Obtener nombre de la categoría
      const subcategoriaName = row[headers.indexOf('Subcategoria')]; // Obtener nombre de la subcategoría

      // Buscar los IDs de categoría y subcategoría basados en el nombre
      const categoria = categoriaName ? await Categoria.findOne({ where: { nombre: categoriaName } }) : null;
      const subcategoria = subcategoriaName ? await Subcategoria.findOne({ where: { nombre: subcategoriaName } }) : null;

      // Si se encuentran categoría y subcategoría, asignarlas a productData
      if (categoria) {
        productData.categoriaId = categoria.id;
      }
      if (subcategoria) {
        productData.subcategoriaId = subcategoria.id;
      }

      // Buscar el producto por ID
      let product = await Producto.findByPk(productData.id);
      console.log("productData:", productData);
      if (product) {
        // Actualizar producto existente
        await product.update(productData);
      } else {
        // Crear nuevo producto
        await Producto.create(productData);
      }
    }

    return { success: true, message: 'Productos importados y actualizados exitosamente' };
  } catch (error) {
    console.error('Error al importar productos:', error);
    return { success: false, message: 'Error al importar productos. Por favor, inténtelo de nuevo más tarde.' };
  }
};

module.exports = { importExcelController };
