
import { ApiKeyService } from '@/api-key/application/api-key.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      return false;
    }

    const keyRecord = await this.apiKeyService.findByKey(apiKey);
    
    if(!keyRecord || !keyRecord.active) {
      return false;
    }

    return true;
  }
}


export const API_KEY_GUARD = 'ApiKeyGuard';