import { Body, Controller, Delete, Get, Logger, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';

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
    async findChallenge() { }

    @Put("/:challenge")
    async updateChallenge() { }

    @Post("/:challenge/match/")
    async assignChallengeToMatch() { }

    @Delete("/:id")
    async deleteChallenge() { }
}
