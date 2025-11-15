import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { DepartmentRepository } from '../domain/department.repository';
import { QueryDepartmentDto } from '../presentation/dto/department.dto';
import { Department } from '@/shared/types/department.types';
import { Database } from '@/shared/types/database.types';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';

@Injectable()
export class SupabaseDepartmentRepository implements DepartmentRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private supabaseClient: SupabaseClient<Database>,
  ) {}

  async findAll(queryParams: QueryDepartmentDto): Promise<Department[]> {
    let query = this.supabaseClient.from('department').select('*');

    if (queryParams.name) {
      query = query.ilike('name', `%${queryParams.name}%`);
    }

    if (queryParams.daneCode) {
      query = query.eq('dane_code', queryParams.daneCode);
    }

    if (queryParams.countryId) {
      query = query.eq('country_id', queryParams.countryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async findById(id: number): Promise<Department | null> {
    const { data, error } = await this.supabaseClient
      .from('department')
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
