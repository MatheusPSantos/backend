import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private categoryModel: Model<Category>,
        private readonly playersService: PlayersService
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { category } = createCategoryDto;
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if (foundCategory) throw new BadRequestException(`Category ${category} already registered.`);
        const createdCategory = new this.categoryModel(createCategoryDto);
        return await createdCategory.save();
    }

    async consultAllCategories(): Promise<Array<Category>> {
        return await this.categoryModel.find()
            .populate('players')
            .exec();
    }

    async getCategory(category): Promise<Category> {
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if (!foundCategory) throw new NotFoundException(`The category ${category} already not exist.`);
        return foundCategory;
    }

    async updateCategory(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        if (!foundCategory) throw new NotFoundException(`Category ${category} was not founded.`);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: updateCategoryDto }).exec();
    }

    async assignCategoryToPlayer(params: Array<string>): Promise<void> {
        const category = params['category'];
        const idPlayer = params['id'];

        const foundCategory = await this.categoryModel.findOne({ category }).exec();
        const playerAlreadyExistsInCategory = await this.categoryModel.find({ category }).where('players').in(idPlayer).exec();
        await this.playersService.getPlayerById(idPlayer);

        //const registeredPlayer = 7
        if (!foundCategory) throw new BadRequestException(`Category ${category} not found.`);

        if (playerAlreadyExistsInCategory.length > 0) throw new BadRequestException(`Player ${idPlayer} already is assign to category ${category}.`)

        foundCategory.players.push(idPlayer);

        await this.categoryModel.findOneAndUpdate({ category }, { $set: foundCategory }).exec();
    }
}
