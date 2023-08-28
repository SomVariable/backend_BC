import { PartialType, PickType} from '@nestjs/swagger';
import { CreateNewsTranslationBodyDto } from './create-news-translation.dto';

export class UpdateNewsDto extends PickType(
    CreateNewsTranslationBodyDto, ["text", "title"]
    ) {

    }
