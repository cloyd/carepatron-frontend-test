import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import DataProvider from './store/DataProvider';
import Clients from './pages/Clients';
import QueryProvider from './util/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
	return (
		<div className='App'>
			<QueryProvider>
				<DataProvider>
					<Routes>
						<Route path='/' element={<Clients />} />
						<Route path='/Clients' element={<Clients />} />
					</Routes>
				</DataProvider>
				<ReactQueryDevtools />
			</QueryProvider>
		</div>
	);
}
