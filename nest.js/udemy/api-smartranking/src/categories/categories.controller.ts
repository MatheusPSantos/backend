import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
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

    @Put("/:category")
    @UsePipes(ValidationPipe)
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param("category") category: string
    ): Promise<void> {
        await this.categoriesService.updateCategory(category, updateCategoryDto);
    }

    @Post("/:category/players/:id")
    async assignCategoryToPlayer(
        @Param() params: string[]
    ): Promise<void> {
        return await this.categoriesService.assignCategoryToPlayer(params);
    }
}
