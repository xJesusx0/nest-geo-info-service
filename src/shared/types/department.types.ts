import { Database } from './database.types';

export type Department = Database['public']['Tables']['department']['Row'];

export type DepartmentSearchQueryParams = {
  name?: string;
  daneCode?: string;
  countryId?: number;
};
