import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  EDUCATION_BAD_REQUEST,
  dateTemplate,
} from '../constants/education.constants';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!dateTemplate.test(value)) {
      return false;
    }

    const parts = value.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (
      year < 1900 ||
      year > 9999 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return `wrong data`;
  }
}

export const dateOptions: ValidationOptions = {
  message(validationArguments: ValidationArguments) {
    const value = validationArguments.value;

    if (!dateTemplate.test(value)) {
      return EDUCATION_BAD_REQUEST.WRONG_DATA_FORMAT;
    }

    const parts = value.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (
      year < 1900 ||
      year > 9999 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return EDUCATION_BAD_REQUEST.WRONG_DATA;
    }
  },
};

export class CreateEducationDto {
  @ApiProperty({
    example: 'yyyy-mm-dd',
  })
  @IsNotEmpty()
  @IsString()
  @Validate(IsValidDateConstraint, dateOptions)
  studyYear: string;

  @ApiProperty({
    example: 'yyyy-mm-dd',
  })
  @IsNotEmpty()
  @Validate(IsValidDateConstraint, dateOptions)
  graduationYear: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  specialty: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  qualification: string;
}
