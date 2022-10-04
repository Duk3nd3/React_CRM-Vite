import React from 'react';
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { agregarClientes } from '../api/clientes';

export async function action({ request }) {
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

	await agregarClientes(DATOS);

	return redirect('/');
}

const NuevoCliente = () => {
	const ERRORES = useActionData();
	const NAVIGATE = useNavigate();

	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
			<p className='mt-3'>
				Llena todos los campos para registrar un nuevo cliente
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
					<Formulario />

					<input
						type='submit'
						className='mt-5 w-full bg-blue-800 p-3 uppdercase font-bold text-white text-lg'
						value='Registrar Cliente'
					/>
				</Form>
			</div>
		</>
	);
};

export default NuevoCliente;
