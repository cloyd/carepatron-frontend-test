import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ClientRow from './ClientRow';
import PlaceholderRow from './PlaceholderRow';

type Props = {
	clients: IClient[];
	isLoading: boolean;
};

export const ClientTable = ({ isLoading, clients = [] }: Props) => (
	<TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
		<Table sx={{ minWidth: 400 }} aria-label='clients-table'>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Phone number</TableCell>
					<TableCell>Email</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{isLoading ? (
					<PlaceholderRow />
				) : clients.length === 0 ? (
					<TableRow sx={{ padding: 3 }}>
						<TableCell component='th' scope='row'>
							No clients
						</TableCell>
					</TableRow>
				) : (
					clients.map((client) => <ClientRow key={client.id} client={client} />)
				)}
			</TableBody>
		</Table>
	</TableContainer>
);

export default ClientTable;
