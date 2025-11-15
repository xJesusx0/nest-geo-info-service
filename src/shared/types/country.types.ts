import { Database } from './database.types';

export type Country = Database['public']['Tables']['country']['Row'];

export type CountrySearchQueryParams = {
  name?: string;
  isoAlpha2Code?: string;
  isoAlpha3Code?: string;
  isoNumericCode?: string;
};
