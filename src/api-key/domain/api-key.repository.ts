import { ApiKey } from '@/shared/types/api-key.types';

export interface ApiKeyRepository {
  findByKey(hashedKey: string): Promise<ApiKey | null>;
}

export const API_KEY_REPOSITORY = 'ApiKeyRepository';
