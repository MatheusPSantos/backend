import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
        if (email) return this.playersService.getPlayerByEmail(email);
        else return this.playersService.getAllPlayers();
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email);
    }
}
