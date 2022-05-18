import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParamsValidationPlayersPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) throw new BadRequestException(`Param value ${metadata.data} should be informed.`);
        return value;
    }
}