import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}