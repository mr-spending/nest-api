import { Module } from '@nestjs/common';

import { PrivacyPolicyController } from './privacy-policy.controller';

@Module({
  imports: [],
  controllers: [PrivacyPolicyController],
  providers: [],
  exports: [],
})
export class PrivacyPolicyModule {}
