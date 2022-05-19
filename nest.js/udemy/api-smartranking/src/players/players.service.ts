import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }
    private readonly logger = new Logger(PlayersService.name);

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const { email } = createPlayerDto;
        const foundPlayer = await this.playerModel.findOne({ email }).exec();

        if (foundPlayer) {
            throw new BadRequestException(`Player with e-mail ${email} already exists.`);
        }

        const createdPlayer = new this.playerModel(createPlayerDto);
        return await createdPlayer.save();
    }

    async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
        const foundPlayer = await this.playerModel.findOne({ _id: id }).exec();
        if (!foundPlayer) throw new BadRequestException(`Player with id ${id} not found.`);
        await this.playerModel.findOneAndUpdate({ _id: id }, { $set: updatePlayerDto }).exec();
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async getPlayerById(_id: string): Promise<Player> {
        const foundPlayer = await this.playerModel.findOne({ _id }).exec();
        if (!foundPlayer) {
            throw new NotFoundException("Jogador com id " + _id + " não econtrado.");
        }
        return foundPlayer;
    }

    async deletePlayer(_id: string): Promise<any> {
        const foundPlayer = await this.playerModel.findOne({ _id }).exec();
        if (!foundPlayer) {
            throw new NotFoundException("Jogador com id " + _id + " não econtrado.");
        }
        return await this.playerModel.deleteOne({ _id }).exec();
    }
}
