import { Department, DepartmentSearchQueryParams } from '@/shared/types/department.types';

export interface DepartmentRepository {
  findAll(queryParams: DepartmentSearchQueryParams): Promise<Department[]>;
  findById(id: number): Promise<Department | null>;
}

export const DEPARTMENT_REPOSITORY = 'DepartmentRepository';
