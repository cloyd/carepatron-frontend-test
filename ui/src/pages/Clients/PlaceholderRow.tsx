import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

export const PlaceholderRow = () => (
	<TableRow
		sx={{
			'&:last-child td, &:last-child th': { border: 0 },
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: '#f5f5f5',
			},
		}}
	>
		<TableCell component='th' scope='row'>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<Skeleton variant='text' width={100} height={20} />
				<Skeleton variant='text' width={100} height={20} />
			</div>
		</TableCell>
		<TableCell>
			<Skeleton variant='text' width={120} height={20} />
		</TableCell>
		<TableCell>
			<Skeleton variant='text' width={180} height={20} />
		</TableCell>
	</TableRow>
);

export default PlaceholderRow;
