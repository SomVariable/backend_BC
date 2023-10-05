import { PracticeWithTranslation } from './../../constants/practice.constants';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeOkResponse } from './ok.dto';
import { PRACTICE_EXAMPLES } from '../../constants/practice.constants';
import { Practice } from '@prisma/client';

export class GetPracticeOkResponse extends PracticeOkResponse {
    @ApiProperty({
        example: PRACTICE_EXAMPLES,
    })
    data: PracticeWithTranslation;
}
