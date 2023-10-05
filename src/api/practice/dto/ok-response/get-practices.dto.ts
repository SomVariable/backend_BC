import { PracticeWithTranslation } from './../../constants/practice.constants';
import { Practice } from '@prisma/client';
import { PracticeOkResponse } from './ok.dto';
import { PRACTICE_EXAMPLES } from '../../constants/practice.constants';
import { ApiProperty } from '@nestjs/swagger';

export class GetPracticesOkResponse extends PracticeOkResponse {
    @ApiProperty({
        example: PRACTICE_EXAMPLES,
    })
    data: PracticeWithTranslation[];
}
