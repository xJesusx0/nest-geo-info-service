import { ApiKey } from '@/shared/types/api-key.types';
import { Inject, Injectable } from '@nestjs/common';
import { API_KEY_REPOSITORY } from '../domain/api-key.repository';
import type { ApiKeyRepository } from '../domain/api-key.repository';
import { EncryptionUtils } from '@/shared/utils/encryption.utils';

@Injectable()
export class ApiKeyService {
  constructor(
    @Inject(API_KEY_REPOSITORY)
    private readonly apiKeyRepository: ApiKeyRepository,
    private readonly encryptionUtils: EncryptionUtils,
  ) {}

  async findByKey(rawKey: string): Promise<ApiKey | null> {
    const hashedKey = this.encryptionUtils.sha256(rawKey);
    return this.apiKeyRepository.findByKey(hashedKey);
  }

  validateKey(rawKey: string, storedHash: string): boolean {
    return this.encryptionUtils.validateSha256(rawKey, storedHash);
  }
}
