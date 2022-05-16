import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule, PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
