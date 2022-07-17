import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { Category } from './category/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: parseInt(process.env.TYPEORM_PORT),
      entities: [Category]
    }),
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
