import { memo, useMemo, useState, useCallback } from 'react';
import { Button, Paper, Typography, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Page from '@app/components/Page';
import SearchBar from '@app/components/SearchBar';

import { useClients } from '@app/hooks/useClients';

import ClientTable from './ClientTable';
import ClientModal from './ClientModal';

const Clients = () => {
	const { data, isLoading } = useClients();
	const [searchQuery, setSearchQuery] = useState('');

	const [isModalOpen, setModalOpen] = useState(false);

	const handleOpen = useCallback(() => {
		setModalOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	const filteredClients = useMemo(
		() =>
			data
				? data.filter((client) => {
						const lowerCaseQuery = searchQuery.toLocaleLowerCase();
						return (
							client.firstName.toLowerCase().includes(lowerCaseQuery) ||
							client.lastName.toLowerCase().includes(lowerCaseQuery)
						);
				  })
				: [],
		[data, searchQuery]
	);

	return (
		<Page>
			<Typography variant='h4' className='title'>
				Clients
			</Typography>

			<Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={2}>
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<Button variant='contained' startIcon={<PersonAddIcon />} onClick={handleOpen}>
					Create New Client
				</Button>
			</Stack>

			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable isLoading={isLoading} clients={filteredClients || []} />
			</Paper>

			<ClientModal isOpen={isModalOpen} handleClose={handleClose} />
		</Page>
	);
};

export default memo(Clients);
