import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {

        const { email } = createPlayerDto;
        const foundPlayer = this.players.find(player => player.email.toUpperCase() === email.toUpperCase());
        if (foundPlayer) {
            await this.updatePlayer(foundPlayer, createPlayerDto);
        } else {
            this.create(createPlayerDto);
        }

    }

    async getAllPlayers(): Promise<Player[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const foundPlayer =  await this.players.find(player => player.email.toUpperCase() === email.toUpperCase());
        if(!foundPlayer) {
            throw new NotFoundException("Jogador com e-mail " + email + " não econtrado.");
        }
        return foundPlayer;
    }

    async deletePlayer(email: string): Promise<void> {
       this.players = this.players.filter(player => player.email.toUpperCase() !== email.toUpperCase());
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const { name, phoneNumber, email } = createPlayerDto;
        const player: Player = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            positionRanking: 1,
            urlPhotoPlayer: 'https://thispersondoesnotexist.com/image'
        };
        this.players.push(player);
        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    }

    private async updatePlayer(foundPlayer: Player, createPlayerDto: CreatePlayerDto):Promise<void> {
        const {name} = createPlayerDto;
        foundPlayer.name = name;
    }

}
