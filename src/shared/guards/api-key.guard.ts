import { ApiKeyService } from '@/api-key/application/api-key.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ApiKey } from '../types/api-key.types';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers['x-api-key'];
    if (!apiKey || Array.isArray(apiKey)) {
      return false;
    }

    const keyRecord = await this.apiKeyService.findByKey(apiKey);

    console.log(keyRecord)

    if (!keyRecord || !keyRecord.active) {
      return false;
    }

    if (keyRecord.expires_at) {
      const now = new Date();
      const expiresAt = new Date(keyRecord.expires_at);
      if (now > expiresAt) {
        return false;
      }
    }

    if (!this.validateOrigin(request, keyRecord)) {
      return false;
    }

    return true;
  }

  validateOrigin(request: Request, apiKeyRecord: ApiKey): boolean {
    const origin = request.headers['origin'];
    if (!origin) {
      return true; // No origin to validate
    }

    if (!apiKeyRecord.client_origin ||
      !Array.isArray(apiKeyRecord.client_origin) ||
      apiKeyRecord.client_origin.length === 0 ||
      apiKeyRecord.client_origin.includes('*')) {
      return true; // No restrictions on origins
    }

    const allowedOrigins = apiKeyRecord.client_origin;
    return allowedOrigins.find(o => o === origin) !== undefined;
  }

}

export const API_KEY_GUARD = 'ApiKeyGuard';
