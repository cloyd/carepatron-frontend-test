import { useMemo, useState, Fragment, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import MaterialStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

import { FormInput } from '@app/components/Forms';

type FormFields = {
	[index: number]: string[];
};

const formFields: FormFields = {
	0: ['firstName', 'lastName'],
	1: ['email', 'phoneNumber', 'emergencyPhoneNumber'],
};

type Props = {
	onSubmit: () => void;
};

const Stepper = ({ onSubmit }: Props) => {
	const { t } = useTranslation();

	const steps = useMemo(() => [t('modal.steps.1'), t('modal.steps.2')], [t]);

	const { trigger } = useFormContext();
	const [activeStep, setActiveStep] = useState(0);
	const isFinalStep = activeStep + 1 === steps.length;

	const handleNext = async () => {
		console.log('activeStep', activeStep);

		if (!isFinalStep) {
			const isValid = await trigger(formFields[activeStep]);

			if (isValid) {
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
			}
		} else {
			onSubmit();
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<MaterialStepper activeStep={activeStep}>
				{steps.map((label) => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: ReactNode;
					} = {};

					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</MaterialStepper>
			<Fragment>
				<Box px={2} py={4}>
					{activeStep === 0 && (
						<Stack spacing={2}>
							<FormInput name='firstName' label={t('firstName')} />
							<FormInput name='lastName' label={t('lastName')} />
							<FormInput name='nationalId' label={t('nationalId')} />
						</Stack>
					)}

					{activeStep === 1 && (
						<Stack spacing={2}>
							<FormInput name='email' label={t('email')} type='email' />
							<FormInput name='phoneNumber' label={t('phoneNumber')} />
							<FormInput name='emergencyPhoneNumber' label={t('emergencyPhoneNumber')} />
						</Stack>
					)}
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					{activeStep !== 0 && (
						<Button color='primary' onClick={handleBack} startIcon={<ArrowBackIcon />}>
							{t('back')}
						</Button>
					)}
					<Box sx={{ flex: '1 1 auto' }} />
					<Button data-testid='submit-client-button' onClick={handleNext}>
						{activeStep === steps.length - 1 ? t('createClient') : t('next')}
					</Button>
				</Box>
			</Fragment>
		</Box>
	);
};

export default Stepper;
