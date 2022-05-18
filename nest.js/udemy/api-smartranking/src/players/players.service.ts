import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }
    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = createPlayerDto;
        const foundPlayer = await this.playerModel.findOne({ email }).exec();

        if (foundPlayer) {
            await this.updatePlayer(createPlayerDto);
        } else {
            this.create(createPlayerDto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const foundPlayer = await this.playerModel.findOne({ email }).exec();
        if (!foundPlayer) {
            throw new NotFoundException("Jogador com e-mail " + email + " não econtrado.");
        }
        return foundPlayer;
    }

    async deletePlayer(email: string): Promise<any> {
        return await this.playerModel.deleteOne({ email }).exec();
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const createdPlayer = new this.playerModel(createPlayerDto);
        return await createdPlayer.save();
    }

    private async updatePlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const { email } = createPlayerDto;
        return await this.playerModel.findOneAndUpdate({ email }, { $set: createPlayerDto }).exec();
    }

}
