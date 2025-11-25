import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class EncryptionUtils {
  sha256(text: string): string {
    return createHash('sha256').update(text).digest('hex');
  }

  validateSha256(text: string, hash: string): boolean {
    return this.sha256(text) === hash;
  }
}
