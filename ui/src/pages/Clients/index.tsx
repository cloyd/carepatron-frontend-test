import { memo } from 'react';
import { Paper, Typography } from '@mui/material';

import Page from '@app/components/Page';
import { useClients } from '@app/hooks';

import ClientTable from './ClientTable';

const Clients = () => {
	const { data, isLoading } = useClients();

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				{isLoading ? 'Loading...' : <ClientTable clients={data as IClient[]} />}
			</Paper>
		</Page>
	);
};

export default memo(Clients);
