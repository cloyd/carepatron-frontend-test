import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createClient } from '@app/services/api';

export type ApiError = {
	code: string;
	message: string;
	status: number;
};

export const useCreateClient = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createClient,
		onMutate: async (newClient) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ['clients'] });

			// Snapshot the previous value
			const previousClients = queryClient.getQueryData(['clients']);

			// Optimistically update to the new value
			// TODO: Fix me
			// @ts-expect-error
			queryClient.setQueryData(['clients'], (old: IClient) => [...old, newClient]);

			// Return a context object with the snapshotted value
			return { previousClients };
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (_error, _newClient, context) => {
			queryClient.setQueryData(['clients'], context?.previousClients);
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['clients'] });
		},
	});
};

export default useCreateClient;
