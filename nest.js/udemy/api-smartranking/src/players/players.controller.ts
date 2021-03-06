import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParamsValidationPipe } from 'src/common/pipes/params-validation.pipe';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playersService.createPlayer(createPlayerDto);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param('id', ParamsValidationPipe) _id: string
    ): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayerDto);
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
    async deletePlayer(@Query('email', ParamsValidationPipe) email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
