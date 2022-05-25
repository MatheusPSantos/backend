import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesController } from './challenges/challenges.controller';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    PlayersModule,
    PlayersModule,
    MongooseModule.forRoot(
      `${process.env.MONGO_URL}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    CategoriesModule,
    ChallengesModule],
  controllers: [ChallengesController],
  providers: [],
})
export class AppModule { }
