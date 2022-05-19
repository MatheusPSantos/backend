import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interface/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDto);
    }

    @Get()
    async consultCategories(): Promise<Array<Category>> {
        return await this.categoriesService.consultAllCategories();
    }

    @Get("/:category")
    async getCategoryById(@Param("category") category: string): Promise<Category> {
        return await this.categoriesService.getCategory(category);
    }
}
