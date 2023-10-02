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
export class EducationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          message: EDUCATION_OK.OK,
          ...data,
        };
      }),
    );
  }
}
