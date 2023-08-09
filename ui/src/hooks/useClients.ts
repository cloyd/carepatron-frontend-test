import { useQuery, UseQueryResult } from '@tanstack/react-query';

// import { getClients } from '@app/services/api';
import { getClients } from '../services/api';

export type UseClients = UseQueryResult<IClient[], Error>;

export const useClients = (): UseClients =>
	useQuery({
		queryKey: ['clients'],
		queryFn: getClients,
	});

export default useClients;
