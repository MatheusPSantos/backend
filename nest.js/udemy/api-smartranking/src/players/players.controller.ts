import { Body, Controller, Get, Post } from '@nestjs/common';
import { create } from 'domain';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import {PlayersService} from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService){}

    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async getPlayers(): Promise<Player[]> {
        return this.playersService.getAllPlayers();
    }
}
