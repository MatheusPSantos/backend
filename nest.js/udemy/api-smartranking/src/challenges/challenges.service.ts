import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
        @InjectModel('Match') private readonly matchModel: Model<Match>,
        private readonly playersService: PlayersService,
        private readonly categoriesService: CategoriesService
    ) { }

    private readonly logger = new Logger(ChallengesService.name);

    async createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        const players = await this.playersService.getAllPlayers();

        createChallengeDto.players.map(playerDto => {
            const playerFilter = players.filter(player => player._id == playerDto._id);
            if (playerFilter.length == 0) {
                throw new BadRequestException(`The id ${playerDto._id} is not a player.`);
            }
        });

        const requestIsPlayerOfTheMatch = await createChallengeDto.players.filter(player => player._id == createChallengeDto.requester);

        this.logger.log(`RequesterIsPlayerOfTheMatch:${requestIsPlayerOfTheMatch}`);

        if (requestIsPlayerOfTheMatch.length == 0) {
            throw new BadRequestException(`The requester should be a match player.`);
        }

        const playerCategory = await this.categoriesService.getCategory(createChallengeDto.requester);

        if (!playerCategory) {
            throw new BadRequestException(`The requester needs be registered in one category.`);
        }

        const challengeCreated = new this.challengeModel(createChallengeDto);
        challengeCreated.category = playerCategory.category;
        challengeCreated.requesterDateHour = new Date();
        this.logger.log(`challengeCreated.requestDateHour: ${challengeCreated.requesterDateHour}`);

        challengeCreated.status = ChallengeStatus.PENDING;
        this.logger.log(`challengeCreated: ${JSON.stringify(challengeCreated)}`);
        return await challengeCreated.save();
    }

    async consultAllChallenges(): Promise<Array<Challenge>> {
        return await this.challengeModel.find()
            .populate('requester')
            .populate('players')
            .populate('match')
            .exec()
    }

    async consultSingleChallenge(_id: any): Promise<Array<Challenge>> {
        const players = await this.playersService.getAllPlayers();
        const playerFilter = players.filter(player => player._id == _id);
        if (playerFilter.length === 0) {
            throw new BadRequestException(`The id ${_id} it is not a player.`);
        }
        return await this.challengeModel.find()
            .where('players')
            .in(_id)
            .populate('requester')
            .populate('players')
            .populate('match')
            .exec()
    }

    async updateChallenge(_id: string, updateChallengeDto: UpdateChallengeDto): Promise<void> {
        const challengeFound = await this.challengeModel.findById(_id).exec();
        if (!challengeFound) throw new NotFoundException(`Challenge ${_id} not found.`);

        if (updateChallengeDto.status) {
            challengeFound.requesterDateHour = new Date();
        }

        challengeFound.status = updateChallengeDto.status;
        challengeFound.challengeDateHour = updateChallengeDto.challengeDateHour;

        await this.challengeModel.findOneAndDelete({ _id }, { $set: challengeFound }).exec();
    }
}
