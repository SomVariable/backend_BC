import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer_OK } from '../constants/offer.constants';

@Injectable()
export class UpdateOfferInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
            message: Offer_OK.UPDATED,
            data
        };
      }),
    );
  }
}