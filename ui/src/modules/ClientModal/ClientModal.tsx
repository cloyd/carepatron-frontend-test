import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogTitle, Snackbar, Alert, IconButton, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateClient } from '@app/hooks';

import Stepper from './Stepper';

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
						<Box display='flex' justifyContent='space-between'>
							<DialogTitle>Create new client</DialogTitle>
							<Box p='16px 24px'>
								<IconButton aria-label='Close' onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</Box>
						</Box>

						<DialogContent>
							<Stepper onSubmit={form.handleSubmit(onSubmit)} />
						</DialogContent>
					</form>
				</FormProvider>
			</Dialog>

			{/* TODO: Move snackbar to its own component */}
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
