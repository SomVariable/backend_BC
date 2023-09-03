import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CATEGORY_INFO_OK } from '../constants/category.constants';

@Injectable()
export class UpdateCategoryTranslationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
            message: CATEGORY_INFO_OK.UPDATED,
            data
        };
      }),
    );
  }
}