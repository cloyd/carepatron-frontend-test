import { useState } from 'react';

import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export const SearchBar = ({ value = '', onChange }: Props) => {
	const [searchTerm, setSearchTerm] = useState(value);

	const handleChange = (event: any) => {
		const value = event.target.value;
		setSearchTerm(value);
		onChange(value);
	};

	return (
		<TextField
			id='search'
			type='search'
			size='small'
			label='Search'
			value={searchTerm}
			onChange={handleChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default SearchBar;
