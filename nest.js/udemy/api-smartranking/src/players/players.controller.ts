import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { ParamsValidationPlayersPipe } from './pipes/params-validation-players.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
        await this.playersService.createPlayer(createPlayerDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() createPlayerDto: CreatePlayerDto,
        @Param('id', ParamsValidationPlayersPipe) _id: string
    ): Promise<void> {
        console.log('entrou aqui')
        await this.playersService.updatePlayer(_id, createPlayerDto);
    }

    @Get()
    async getPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers();
    }

    @Get('/:id')
    async getPlayer(@Param() _id: string): Promise<Player> {
        return this.playersService.getPlayerById(_id);
    }

    @Delete()
    async deletePlayer(@Query('email', ParamsValidationPlayersPipe) email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
