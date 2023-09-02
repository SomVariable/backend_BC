import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem_OK } from '../constants/content-item.constants';

@Injectable()
export class UpdateContentItemInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
            message: ContentItem_OK.UPDATED_INFO,
            data
        };
      }),
    );
  }
}