import { useState, ChangeEvent } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ value = '', onChange }: Props) => {
	const [searchTerm, setSearchTerm] = useState(value);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		onChange(value);
	};

	return (
		<Paper component='form' sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
			<InputBase
				sx={{ ml: 2, flex: 1 }}
				value={searchTerm}
				onChange={handleChange}
				placeholder='Search client...'
				inputProps={{
					'data-testid': 'search-input',
					'aria-label': 'search input',
				}}
			/>
			<IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
