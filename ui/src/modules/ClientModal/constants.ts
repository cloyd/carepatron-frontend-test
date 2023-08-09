import { z } from 'zod';

export const defaultValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

export const FormSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required' }),
	lastName: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
	phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});

export type FormValues = z.infer<typeof FormSchema>;
