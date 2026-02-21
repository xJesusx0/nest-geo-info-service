import { Module } from '@nestjs/common';
import { EncryptionUtils } from './encryption.utils';

@Module({
  providers: [EncryptionUtils],
  exports: [EncryptionUtils],
})
export class UtilsModule {}
