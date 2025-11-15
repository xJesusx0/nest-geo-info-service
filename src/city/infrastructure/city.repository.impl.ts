import {
  City,
  CitySearchQueryParams,
  CityWithRelations,
} from '@/shared/types/city.types';
import { Database } from '@/shared/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { CityRepository } from '@/city/domain/city.repository';
import { Inject, Injectable } from '@nestjs/common';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';

@Injectable()
export class SupabaseCityRepository implements CityRepository {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabaseClient: SupabaseClient<Database>,
  ) {}

  async findAll(
    queryParams: CitySearchQueryParams,
  ): Promise<CityWithRelations[]> {
    let query = this.supabaseClient.from('v_city_with_relations').select('*');

    if (queryParams.countryId) {
      query = query.eq('country_id', queryParams.countryId);
    } else if (queryParams.countryName) {
      query = query.ilike('country_name_es', `%${queryParams.countryName}%`);
    }

    if (queryParams.departmentId) {
      query = query.eq('department_id', queryParams.departmentId);
    } else if (queryParams.departmentName) {
      query = query.ilike('department_name', `%${queryParams.departmentName}%`);
    }

    if (queryParams.name) {
      query = query.ilike('name', `%${queryParams.name}%`);
    }

    if (queryParams.daneCode) {
      query = query.eq('dane_code', queryParams.daneCode);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async findById(id: number): Promise<City | null> {
    const { data, error } = await this.supabaseClient
      .from('city')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data;
  }
}
