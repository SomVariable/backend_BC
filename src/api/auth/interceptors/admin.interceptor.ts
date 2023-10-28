import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_OK } from '../constants/auth.constants';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                const { user } = data
                if (
                    typeof user === 'object' &&
                    'id' in user &&
                    'email' in user &&
                    'role' in user &&
                    'accountStatus' in user
                ) {
                    const { id, email, role, accountStatus } = user;
                    const admin = {
                        id, email, role, accountStatus,
                    };
                    return {
                        ...data,
                        user: admin
                    };
                }
                return data;
            }),
        );
    }
}
