import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useController } from 'react-hook-form';

type Props = {
	name: string;
} & TextFieldProps;

const kebabCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const FormInput = ({ name, ...otherProps }: Props) => {
	const { field, fieldState } = useController({
		name,
		defaultValue: '',
	});

	return (
		<TextField
			type='text'
			variant='standard'
			margin='dense'
			{...otherProps}
			onChange={field.onChange} // send value to hook form
			onBlur={field.onBlur} // notify when input is touched/blur
			value={field.value} // input value
			name={field.name} // send down the input name
			inputRef={field.ref} // send input ref, so we can focus on input when error appear
			error={!!fieldState?.error?.message}
			helperText={fieldState?.error ? fieldState?.error?.message : ''}
			inputProps={{
				'data-testid': `${kebabCase(name)}-input`,
			}}
		/>
	);
};

export default FormInput;
