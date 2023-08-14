import { useEffect, useCallback, memo } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { useCreateClient } from '@app/hooks';

import Stepper from './Stepper';

import { FormValues, FormSchema, defaultValues } from './constants';
import { useNotification } from '@app/components/Notification';

type Props = {
	isOpen: boolean;
	handleClose: () => void;
};

export const ClientModal = ({ isOpen, handleClose }: Props) => {
	const { t } = useTranslation();

	const { mutate, isLoading, isSuccess, error } = useCreateClient();

	const { notify } = useNotification();

	const form = useForm<FormValues>({
		mode: 'onBlur',
		resolver: zodResolver(FormSchema),
		defaultValues,
	});

	const { formState, reset } = form;

	const onSubmit = (values: FormValues) => {
		mutate(values);
		// Optimistic update
		handleCloseModal();
	};

	const handleCloseModal = useCallback(() => {
		reset();
		handleClose();
	}, [handleClose, reset]);

	useEffect(() => {
		if (formState.isSubmitSuccessful && !isLoading) {
			if (isSuccess) {
				notify('Successfully added new client', 'success');
			} else if (error) {
				notify('Something went wrong', 'error');
			}
		}
	}, [isSuccess, isLoading, formState.isSubmitSuccessful, error, notify]);

	return (
		<div data-testid='client-modal'>
			<Dialog fullWidth maxWidth='sm' open={isOpen} onClose={handleClose}>
				<FormProvider {...form}>
					<form id='create-client-form' onSubmit={form.handleSubmit(onSubmit)} noValidate>
						<Box display='flex' justifyContent='space-between'>
							<DialogTitle>{t('createClient')}</DialogTitle>
							<Box p='16px 24px'>
								<IconButton data-testid='close-modal-button' aria-label='Close' onClick={handleClose}>
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
		</div>
	);
};

export default memo(ClientModal);
