import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
