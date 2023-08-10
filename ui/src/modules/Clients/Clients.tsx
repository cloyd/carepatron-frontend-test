import { memo, useMemo, useState, useCallback } from 'react';
import { Button, Paper, Typography, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslation } from 'react-i18next';

import Page from '@app/components/Page';
import SearchBar from '@app/components/SearchBar';
import { useClients } from '@app/hooks/useClients';
import ClientModal from '@app/modules/ClientModal';

import List from './List';
import LocaleSelector from '@app/components/Locale/LocaleSelector';

const Clients = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useClients();

	const [searchQuery, setSearchQuery] = useState('');
	const [isModalOpen, setModalOpen] = useState(false);

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

	const handleOpen = useCallback(() => {
		setModalOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	return (
		<Page>
			<Typography variant='h4' className='title'>
				{t('clients')}
			</Typography>

			<Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<Button
					data-testid='create-client-button'
					variant='contained'
					size='medium'
					startIcon={<PersonAddIcon />}
					onClick={handleOpen}
				>
					{t('createClient')}
				</Button>
			</Stack>

			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<List isLoading={isLoading} clients={filteredClients || []} />
			</Paper>

			<ClientModal isOpen={isModalOpen} handleClose={handleClose} />

			<LocaleSelector />
		</Page>
	);
};

export default memo(Clients);
