import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    PlayersModule,
    PlayersModule,
    MongooseModule.forRoot(
      "mongodb+srv://matheus:matheus123@cluster0.s1zrh.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )],
  controllers: [],
  providers: [],
})
export class AppModule { }
