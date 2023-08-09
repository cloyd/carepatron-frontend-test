import { Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import QueryProvider from '@app/util/QueryProvider';
import Clients from '@app/modules/Clients';

import './App.css';

export default function App() {
	return (
		<div className='App'>
			<QueryProvider>
				<Routes>
					<Route path='/' element={<Clients />} />
					<Route path='/Clients' element={<Clients />} />
				</Routes>
				<ReactQueryDevtools />
			</QueryProvider>
		</div>
	);
}
