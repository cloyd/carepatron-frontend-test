import { useEffect, useState } from 'react';

import {
	Button,
	Stack,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Alert,
} from '@mui/material';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateClient } from '@app/hooks';
import { FormInput } from '@app/components/Forms';

import { FormValues, FormSchema, defaultValues } from './constants';

type Props = {
	isOpen: boolean;
	handleClose: () => void;
};

export const ClientModal = ({ isOpen, handleClose }: Props) => {
	const { mutate, isLoading, isSuccess } = useCreateClient();
	const [snackBarOpen, setSnackBarOpen] = useState(false);

	const form = useForm<FormValues>({
		mode: 'onBlur',
		resolver: zodResolver(FormSchema),
		defaultValues,
	});

	const { formState, reset } = form;

	const onSubmit = (values: FormValues) => {
		mutate(values);
	};

	const handleCloseSnackBar = (_event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackBarOpen(false);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful && !isLoading && isSuccess) {
			handleClose();
			reset();
			setSnackBarOpen(true);
		}
	}, [handleClose, isSuccess, isLoading, formState.isSubmitSuccessful, reset]);

	return (
		<div>
			<Dialog fullWidth maxWidth='sm' open={isOpen} onClose={handleClose}>
				<FormProvider {...form}>
					<form id='create-client-form' onSubmit={form.handleSubmit(onSubmit)} noValidate>
						<DialogTitle>Create new client</DialogTitle>
						<DialogContent>
							<DialogContentText>render stepper here</DialogContentText>

							<Stack spacing={2}>
								<FormInput name='firstName' label='First name' />
								<FormInput name='lastName' label='Last name' />
							</Stack>
							<Stack spacing={2}>
								<FormInput name='email' label='Email' type='email' />
								<FormInput name='phoneNumber' label='PhoneNumber' />
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button type='submit' disabled={isLoading}>
								Create client
							</Button>
						</DialogActions>
					</form>
				</FormProvider>
			</Dialog>

			<Snackbar
				open={snackBarOpen}
				onClose={handleCloseSnackBar}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleCloseSnackBar} severity='success' sx={{ width: '100%' }}>
					Successfully added new client
				</Alert>
			</Snackbar>
		</div>
	);
};

export default ClientModal;
