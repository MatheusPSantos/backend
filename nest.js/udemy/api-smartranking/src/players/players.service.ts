import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

    async updatePlayer(id: string, createPlayerDto: CreatePlayerDto): Promise<void> {
        const foundPlayer = await this.playerModel.findById({ _id: id }).exec();
        if (!foundPlayer) throw new BadRequestException(`Player with id ${id} not found.`);

        await this.playerModel.findByIdAndUpdate({ _id: id }, { $set: createPlayerDto }).exec();
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

    async getPlayerById(id: string): Promise<Player> {
        return await this.playerModel.findOne({ __id: id }).exec();
    }

    async deletePlayer(email: string): Promise<any> {
        return await this.playerModel.deleteOne({ email }).exec();
    }
}
