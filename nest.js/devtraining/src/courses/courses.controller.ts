import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {

    @Get()
    findAll(@Res() response) {
        return response.status(200).send("listagem de cursos");
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return `Curso número ${id}`;
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body('name') body) {
        return body;
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() body) {
        return `Atualização do Curso ${id}`;
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return `Exclusão do curso ${id}`;
    }

}
