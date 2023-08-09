import { z } from 'zod';

export const defaultValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

export const FormSchema = z.object({
	firstName: z.string().trim().min(1, { message: 'First name is required' }),
	lastName: z.string().trim().min(1, { message: 'Last name is required' }),
	email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
	phoneNumber: z.string().trim().min(1, { message: 'Phone number is required' }).max(40, 'Invalid phone number'),
});

export type FormValues = z.infer<typeof FormSchema>;
