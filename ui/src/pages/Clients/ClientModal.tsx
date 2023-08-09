import { useEffect } from 'react';

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
import { z } from 'zod';

import { useCreateClient } from '@app/hooks';
import { FormInput } from '@app/components/Forms';

type Props = {
	isOpen: boolean;
	handleClose: () => void;
};

const defaultValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

const FormSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
	phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});

export type FormValues = z.infer<typeof FormSchema>;

export const ClientModal = ({ isOpen, handleClose }: Props) => {
	const { mutate, isLoading, isSuccess, data } = useCreateClient();

	const form = useForm<FormValues>({
		mode: 'onBlur',
		resolver: zodResolver(FormSchema),
		defaultValues,
	});

	const { formState, reset } = form;

	const onSubmit = (values: FormValues) => {
		console.log('values', values);
		mutate(values);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful && !isLoading && isSuccess) {
			console.log('handle close');
			reset();
			handleClose();
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
				open={!isLoading && isSuccess}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity='success' sx={{ width: '100%' }}>
					Successfully added new client
				</Alert>
			</Snackbar>
		</div>
	);
};

export default ClientModal;
