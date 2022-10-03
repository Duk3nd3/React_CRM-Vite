export async function obtenerClientes() {
	const RESPUESTA = await fetch(import.meta.env.VITE_API_URL);
	const RESULTADO = await RESPUESTA.json();

	return RESULTADO;
}

export async function agregarClientes(DATOS) {
	try {
		const RESPUESTA = await fetch(import.meta.env.VITE_API_URL, {
			method: 'POST',
			body: JSON.stringify(DATOS),
			headers: { 'Content-Type': 'application/json' },
		});
		await RESPUESTA.json();
	} catch (error) {
		console.log(error);
	}
}

export async function modificarCliente(id) {
	const RESPUESTA = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
	const RESULTADO = await RESPUESTA.json();

	return RESULTADO;
}

export async function actualizarCliente(id, DATOS) {
	try {
		const RESPUESTA = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(DATOS),
			headers: { 'Content-Type': 'application/json' },
		});
		await RESPUESTA.json();
	} catch (error) {
		console.log(error);
	}
}

export async function eliminarCliente(id) {
	try {
		const RESPUESTA = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
			method: 'DELETE',
		});
		await RESPUESTA.json();
	} catch (error) {
		console.log(error);
	}
}
