import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { P_INTEREST_OK } from '../constants/professional-interest.constants';

@Injectable()
export class ProfessionalInterestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
            message: P_INTEREST_OK.OK,
            data
        };
      }),
    );
  }
}