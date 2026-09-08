import { api } from '../services/api';

export const useCompany = (id: number | undefined) => {
  return api.useQuery(
    'get',
    '/api/v1/companies/{id}/',
    { params: { path: { id: id as number } } },
    { enabled: id !== undefined }
  );
};
