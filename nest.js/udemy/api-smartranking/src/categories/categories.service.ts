import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private categoryModel: Model<Category>
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = createCategoryDto;
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if (foundCategory) throw new BadRequestException(`Category ${category} already registered.`);
        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();
    }


}
