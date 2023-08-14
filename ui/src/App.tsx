import { Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import LocaleProvider from '@app/components/Locale/Provider';
import QueryProvider from '@app/util/QueryProvider';
import Clients from '@app/modules/Clients';
import NotificationProvider from '@app/components/Notification';

import './App.css';

const theme = createTheme({
	components: {
		MuiStepIcon: {
			styleOverrides: {
				root: {
					'&.Mui-completed': {
						color: green[800],
					},
				},
			},
		},
	},
});

export default function App() {
	return (
		<div className='App'>
			<LocaleProvider>
				<ThemeProvider theme={theme}>
					<QueryProvider>
						<NotificationProvider>
							<Routes>
								<Route path='/' element={<Clients />} />
								<Route path='/Clients' element={<Clients />} />
							</Routes>
						</NotificationProvider>
						<ReactQueryDevtools />
					</QueryProvider>
				</ThemeProvider>
			</LocaleProvider>
		</div>
	);
}
