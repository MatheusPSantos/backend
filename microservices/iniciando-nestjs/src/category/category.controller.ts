import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private categoryRespository: Repository<Category>
    ) { }

    @Get()
    async index() {
        return await this.categoryRespository.find();
    }

    @Get('category-create')
    async categoryCreate() {
        const category = await this.categoryRespository.create({ name: 'category test' });
        return await this.categoryRespository.save(category);
    }
}
