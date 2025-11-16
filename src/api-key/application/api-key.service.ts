import { ApiKey } from '@/shared/types/api-key.types';
import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository';
import type { ApiKeyRepository } from '../domain/api-key.repository';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(API_KEY_REPOSITORY)
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async findByKey(rawKey: string): Promise<ApiKey | null> {
    const hashedKey = this.hashKey(rawKey);
    return this.apiKeyRepository.findByKey(hashedKey);
  }

  hashKey(rawKey: string): string {
    return crypto.createHash('sha256').update(rawKey).digest('hex');
  }

  validateKey(rawKey: string, storedHash: string): boolean {
    const computedHash = this.hashKey(rawKey);
    return computedHash === storedHash;
  }
}
