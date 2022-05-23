import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Event } from "../interface/category.interface";

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}