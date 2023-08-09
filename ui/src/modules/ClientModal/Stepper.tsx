import { useState, Fragment, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

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

const steps = ['Personal details', 'Contact details'];

const formFields: FormFields = {
	0: ['firstName', 'lastName'],
	1: ['email', 'phoneNumber'],
};

type Props = {
	onSubmit: () => void;
};

const Stepper = ({ onSubmit }: Props) => {
	const { trigger } = useFormContext();
	const [activeStep, setActiveStep] = useState(0);
	const isFinalStep = activeStep + 1 === steps.length;

	const handleNext = async () => {
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
							<FormInput name='firstName' label='First name' />
							<FormInput name='lastName' label='Last name' />
						</Stack>
					)}

					{activeStep === 1 && (
						<Stack spacing={2}>
							<FormInput name='email' label='Email' type='email' />
							<FormInput name='phoneNumber' label='PhoneNumber' />
						</Stack>
					)}
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					{activeStep !== 0 && (
						<Button color='primary' onClick={handleBack} startIcon={<ArrowBackIcon />}>
							Back
						</Button>
					)}
					<Box sx={{ flex: '1 1 auto' }} />
					<Button data-testid='submit-client-button' onClick={handleNext}>
						{activeStep === steps.length - 1 ? 'Create client' : 'Next'}
					</Button>
				</Box>
			</Fragment>
		</Box>
	);
};

export default Stepper;
