import { memo } from 'react';
import { Paper, Typography } from '@mui/material';
import Page from '../../components/Page';
import ClientTable from './ClientTable';

function Clients() {
	const clients: IClient[] = [
		{
			id: '123',
			firstName: 'lorem',
			lastName: 'ipsum',
			email: 'loremipsum@carepatron.com',
			phoneNumber: '+6192099102',
		},
	];

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clients} />
			</Paper>
		</Page>
	);
}

export default memo(Clients);
