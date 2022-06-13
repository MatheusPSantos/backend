import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ChallengeStatus } from "../interfaces/challenge-status.enum";

export class ChallengeStatusValidationPipe implements PipeTransform {
    readonly statusAllowed = [
        ChallengeStatus.ACCEPTED,
        ChallengeStatus.DENIED,
        ChallengeStatus.CANCELLED
    ];

    transform(value: any) {
        const status = value.status.toUpperCase();

        if (!this.isValidStatus(status)) {
            throw new BadRequestException(`${status} it s a invalid status.`);
        }
        return value;
    }

    private isValidStatus(status: any) {
        const idx = this.statusAllowed.indexOf(status);
        return idx !== -1;
    }
}