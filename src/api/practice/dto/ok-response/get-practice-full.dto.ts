import { PracticeWithFullData } from './../../constants/practice.constants';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeOkResponse } from './ok.dto';
import { PRACTICE_EXAMPLES } from '../../constants/practice.constants';

export class GetPracticeFullOkResponse extends PracticeOkResponse {
  @ApiProperty({
    example: PRACTICE_EXAMPLES,
  })
  data: PracticeWithFullData;
}
