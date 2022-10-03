import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const ERROR_MSG = useRouteError();

	return (
		<div className='space-y-8'>
			<h1 className='text-center text-6xl font-extrabold mt-20 text-blue-900'>
				CRM - Clientes
			</h1>
			<p className='text-center'>Hubo un error</p>
			<p className='text-center'>{ERROR_MSG.statusText || ERROR_MSG.message}</p>
		</div>
	);
}
