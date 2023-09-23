import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AWARD_OK } from '../constants/award.constants';

@Injectable()
export class CreateAwardInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          message: AWARD_OK.CREATED,
          data,
        };
      }),
    );
  }
}
