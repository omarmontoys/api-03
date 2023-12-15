const express = require("express");
const app = express();
const port = process.env.port || 3000;
app.use(express.json()); //Habilitacion para recibir datos por medio de solicitud (insomnia)

// Arreglo de objetos de categorias
let categorias = [
	{ id: 1, nombre: "Cocina", descripcion: "Elementos para cocinar" },
	{ id: 2, nombre: "Limpieza", descripcion: "Elementos para limpiar" },
	{ id: 3, nombre: "Electronica", descripcion: "Elementos de electronic" },
	{ id: 4, nombre: "Ropa bebe", descripcion: "Elementos para bebe" },
	{ id: 5, nombre: "Linea Blanca", descripcion: "Elementosde linea blanca" },
	{ id: 6, nombre: "Jardinera", descripcion: "Elementos de jardineria" },
	{ id: 7, nombre: "Salud", descripcion: "Elementos para la salud" },
	{ id: 8, nombre: "Muebles", descripcion: "Elementos para la sala y demas" },
	{ id: 9, nombre: "Lacteos", descripcion: "Elementos para beber" },
	{ id: 10, nombre: "Licores", descripcion: "Elementos para fiestas" },
	{ id: 528, nombre: "Licores", descripcion: "Elementos para fiestas" },
];

// Obtener la lista de todos los productos (GET).
app.get("/socios/v1/categorias", (req, res) => {
	//1.- Verificar si existen las categorias
	if (categorias.length > 0) {
		//2.- Mostrarlas con un estado y mensaje
		res.status(200).json({
			estado: 1,
			mensaje: "Existen categorias",
			categorias: categorias,
		});
	} else {
		//3.- No existe, mostrar estado y mensaje
		res.status(404).json({
			estado: 0,
			mensaje: "No existen categorias",
			categorias: [],
		});
	}
});
// Obtener un producto por su ID (GET).
app.get("/socios/v1/categorias/:id", (req, res) => {
	//Solo una categoria
	const id = req.params.id;
	const categoria = categorias.find((categorias) => categorias.id == id);
	if (categoria) {
		res.status(200).json({
			estado: 1,
			mensaje: "Categoria encontrada",
			categorias: [categoria],
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No existen categoria",
			categorias: [],
		});
	}
});
// Agregar un nuevo producto (POST).
app.post("/socios/v1/categorias", (req, res) => {
	//Crear un recurso - Crear una categoria
	// Requerimos
	//	id = Generar un numero aleatoreo
	//  nombre y descripcion = body

	const { nombre, descripcion } = req.body;
	const id = Math.round(Math.random() * 1000);
	// Comprobar que el cliente  = usuario  = programador
	if (nombre == undefined || descripcion == undefined) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
		});
	} else {
		//En javascript como agregar un nuevo elemento al arreglo
		const categoria = { id: id, nombre: nombre, descripcion: descripcion };
		const longitudInicial = categorias.length;
		categorias.push(categoria);
		if (categorias.length > longitudInicial) {
			res.status(201).json({
				estado: 1,
				mensaje: "Categoria creada correctamente",
				categorias: [categoria],
			});
		} else {
			res.status(500).json({
				estado: 0,
				mensaje: "No se agrego correctamente",
				categorias: [],
			});
		}
	}
});
// Actualizar un producto por su ID (PUT).
app.put("/socios/v1/categorias/:id", (req, res) => {
	//id viene ? = params
	// nombre y descripción ? = body
	const { id } = req.params;
	const { nombre, descripcion } = req.body;
	if (nombre == undefined && descripcion == undefined) {
		res.status(400).json({
			estado: 0,
			mensaje: "BAD REQUEST Faltan parametros en la solicitud",
			categorias: [],
		});
	} else {
		const posActualizar = categorias.findIndex(
			(categoria) => categoria.id == id
		);
		if (posActualizar != -1) {
			//Si encontro la categoria con el id buscado
			//Actualizar la categoria
			categorias[posActualizar].nombre = nombre;
			categorias[posActualizar].descripcion = descripcion;
			res.status(200).json({
				estado: 1,
				mensaje: "Categoria actualizada correctamente",
				categorias: categorias[posActualizar],
			});
		} else {
			//No se encontro la categoria con el id buscado
			res.status(404).json({
				estado: 0,
				mensaje: "No se actualizo",
				categorias: [],
			});
		}
	}
});
// Eliminar un producto por su ID (DELETE).
app.delete("/socios/v1/categorias/:id", (req, res) => {
	//Solo una categoria
	const { id } = req.params;
	const indiceEliminar = categorias.findIndex(
		(categoria) => categoria.id == id
	);
	if (indiceEliminar != -1) {
		//Borrar la categoria
		categorias.splice(indiceEliminar, 1);
		res.status(201).json({
			estado: 1,
			mensaje: "Categoria eliminada correctamente",
			categorias: [],
		});
	} else {
		res.status(404).json({
			estado: 0,
			mensaje: "No se elimino",
			categorias: [],
		});
	}
});

app.listen(port, () => {
	console.log("Ejecutandose en el servidor: ", port);
});
