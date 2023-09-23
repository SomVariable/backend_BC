import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EDUCATION_OK } from '../constants/education.constants';

@Injectable()
export class EducationUpdateInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          message: EDUCATION_OK.INFO_UPDATED,
          data,
        };
      }),
    );
  }
}
