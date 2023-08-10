import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getClients } from '@app/services/api';

export type UseClients = UseQueryResult<IClient[], Error>;

export const useClients = (): UseClients =>
	useQuery({
		queryKey: ['clients'],
		queryFn: getClients,
	});
