import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { obtenerClientes } from '../api/clientes';
import Cliente from '../components/Cliente';

export function loader() {
	const API_CLIENTES = obtenerClientes();

	return API_CLIENTES;
}

const Index = () => {
	const DATA_CLIENTES = useLoaderData();

	return (
		<>
			<h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
			<p className='mt-3'>Administra tus Clientes</p>

			{DATA_CLIENTES.length ? (
				<table className='w-full bg-white shadow mt-5 table-auto'>
					<thead className='bg-blue-800 text-white'>
						<tr>
							<th className='p-2'>Clientes</th>
							<th className='p-2'>Contacto</th>
							<th className='p-2'>Acciones</th>
						</tr>
					</thead>

					<tbody>
						{DATA_CLIENTES.map((customers) => (
							<Cliente key={customers.id} customers={customers} />
						))}
					</tbody>
				</table>
			) : (
				<p className='text-center mt-10'>No hay clientes aun</p>
			)}
		</>
	);
};

export default Index;
