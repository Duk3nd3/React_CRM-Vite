import React from 'react';
import {
	Form,
	useNavigate,
	useLoaderData,
	useActionData,
	redirect,
} from 'react-router-dom';
import { modificarCliente, actualizarCliente } from '../api/clientes';
import Error from '../components/Error';
import Formulario from '../components/Formulario';

export async function loader({ params }) {
	const CLIENTE_A_EDITAR = await modificarCliente(params.clienteId);
	if (Object.values(CLIENTE_A_EDITAR).length === 0) {
		throw (
			(new Response(''),
			{
				status: 404,
				statusText: 'Cliente inexistente',
			})
		);
	}

	return CLIENTE_A_EDITAR;
}

export async function action({ request, params }) {
	const FORM_DATA = await request.formData();

	const DATOS = Object.fromEntries(FORM_DATA);

	const EMAIL = FORM_DATA.get('email');

	//VALIDACION
	const ERRORES = [];
	if (Object.values(DATOS).includes('')) {
		ERRORES.push('Todos los campos son obligatorios');
	}

	let regex = new RegExp(
		"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
	);

	if (!regex.test(EMAIL)) {
		ERRORES.push('El Email no es valido');
	}

	//RETORNAR DATOS SI HAY ERRORES
	if (Object.keys(ERRORES).length) {
		return ERRORES;
	}

	//Actualizar el cliente
	await actualizarCliente(params.clienteId, DATOS);
	return redirect('/');
}

const EditarCliente = () => {
	const NAVIGATE = useNavigate();
	const CLIENTE = useLoaderData();
	const ERRORES = useActionData();

	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
			<p className='mt-3'>
				A continuacion podras modificar los datos de este cliente
			</p>

			<div className='flex justify-end'>
				<button
					className='bg-blue-800 text-white px-3 py-1 font-bold uppdercase'
					onClick={() => NAVIGATE(-1)}
				>
					Volver
				</button>
			</div>

			<div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
				{ERRORES?.length &&
					ERRORES.map((err, i) => <Error key={i}>{err}</Error>)}

				<Form method='POST' noValidate>
					<Formulario CLIENTE={CLIENTE} />

					<input
						type='submit'
						className='mt-5 w-full bg-blue-800 p-3 uppdercase font-bold text-white text-lg'
						value='Guardar Cambios'
					/>
				</Form>
			</div>
		</>
	);
};

export default EditarCliente;
