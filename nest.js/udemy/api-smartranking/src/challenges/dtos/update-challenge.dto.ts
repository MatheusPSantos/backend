import { IsOptional } from "class-validator";
import { ChallengeStatus } from "../interfaces/challenge-status.enum";

export class UpdateChallengeDto {

    @IsOptional()
    challengeDateHour: Date;

    @IsOptional()
    status: ChallengeStatus;
}