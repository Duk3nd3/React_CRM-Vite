import React from 'react';
import { Form, useNavigate, redirect } from 'react-router-dom';
import { eliminarCliente } from '../api/clientes';

export async function action({ params }) {
	await eliminarCliente(params.clienteId);
	return redirect('/');
}

const Cliente = ({ customers }) => {
	const NAVIGATE = useNavigate();

	const { nombre, telefono, email, empresa, id } = customers;

	return (
		<tr className='border-b text-center'>
			<td className='p-6 space-y-2'>
				<p className='text-2xl text-gray-800'>{nombre}</p>
				<p>{empresa}</p>
			</td>
			<td className='p-6'>
				<p className='text-gray-600'>
					<span className='text-gray-800 uppdercase font-bold'>Email: </span>
					{email}
				</p>
				<p className='text-gray-600'>
					<span className='text-gray-800 uppdercase font-bold'>Telefono: </span>
					{telefono}
				</p>
			</td>
			<td className='mt-4 p-6 flex gap-5 justify-center'>
				<button
					type='button'
					className='text-blue-600 hover:text-blue-700 uppdercase font-bold text-xm'
					onClick={() => NAVIGATE(`/clientes/${id}/editar`)}
				>
					Editar
				</button>

				<Form
					method='POST'
					action={`/clientes/${id}/eliminar`}
					onSubmit={(e) => {
						if (!confirm('Realmente deseas eliminar este cliente?')) {
							e.preventDefault();
						}
					}}
				>
					<button
						type='submit'
						className='text-red-600 hover:text-red-700 uppdercase font-bold text-xm'
					>
						Eliminar
					</button>
				</Form>
			</td>
		</tr>
	);
};

export default Cliente;
