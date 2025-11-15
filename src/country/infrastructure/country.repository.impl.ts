import { SupabaseClient } from '@supabase/supabase-js';
import { CountryRepository } from '../domain/country.repository';
import { Database } from 'src/shared/types/database.types';
import { Country, CountrySearchQueryParams } from 'src/shared/types/country.types';

export class SupabaseCountryRepository implements CountryRepository {
  constructor(private supabaseClient: SupabaseClient<Database>) {}

  async findAll(queryParams: CountrySearchQueryParams): Promise<Country[]> {
    let query = this.supabaseClient.from('country').select('*');

    if (queryParams.name) {
      query = query.ilike('name_es', `%${queryParams.name}%`);
    }

    if (queryParams.isoAlpha2Code) {
      query = query.ilike('iso_alpha2_code', queryParams.isoAlpha2Code);
    }

    if (queryParams.isoAlpha3Code) {
      query = query.ilike('iso_alpha3_code', queryParams.isoAlpha3Code);
    }

    if (queryParams.isoNumericCode) {
      query = query.eq('iso_numeric_code', queryParams.isoNumericCode);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async findById(id: number): Promise<Country | null> {
    const { data, error } = await this.supabaseClient
      .from('country')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }
}
