import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { AssignChallengeToMatchDto } from './dtos/assigne-challenge-to-match.dto';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';

@Controller('api/v1/challenges')
export class ChallengesController {

    constructor(private readonly challengesService: ChallengesService) { }

    private readonly logger = new Logger(ChallengesController.name);

    @Post()
    @UsePipes(ValidationPipe)
    async createChallenge(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        this.logger.log(`createChallenge:${JSON.stringify(createChallengeDto)}`);
        return await this.challengesService.createChallenge(createChallengeDto);
    }

    @Get()
    async findChallenge(
        @Query('idPlayer') _id: string
    ): Promise<Array<Challenge>> {
        return _id ? await this.challengesService.consultSingleChallenge(_id) :
            await this.challengesService.consultAllChallenges();
    }

    @Put("/:challenge")
    async updateChallenge(
        @Body(ChallengeStatusValidationPipe) updateChallenge: UpdateChallengeDto,
        @Param('challenge') _id: string
    ): Promise<void> {
        await this.challengesService.updateChallenge(_id, updateChallenge);
    }

    @Post("/:challenge/match/")
    async assignChallengeToMatch(
        @Body(ValidationPipe) assignChallengeToMatch: AssignChallengeToMatchDto,
        @Param('challenge') _id: string
    ): Promise<void> {
        return await this.challengesService.assignChallengeToMatch(_id, assignChallengeToMatch);
    }

    @Delete("/:id")
    async deleteChallenge() { }
}
