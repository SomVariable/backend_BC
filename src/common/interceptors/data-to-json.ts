import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data: any) => {
        const response = context.switchToHttp().getResponse();

        response.header('Content-Type', 'application/json');
        return await JSON.stringify(data);
      }),
    );
  }
}
