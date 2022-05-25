import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';

@Module({
  providers: [ChallengesService]
})
export class ChallengesModule {}
