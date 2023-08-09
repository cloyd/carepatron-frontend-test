import { Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';
import Clients from './pages/Clients';
import QueryProvider from './util/QueryProvider';

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
