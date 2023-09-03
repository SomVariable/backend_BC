import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONTENT_ITEM_OK } from '../constants/content-item.constants';

@Injectable()
export class UpdateContentItemInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
            message: CONTENT_ITEM_OK.CREATED_INFO,
            data
        };
      }),
    );
  }
}