import { HttpException, HttpStatus, Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { KvStoreService } from '../kv-store/kv-store.service';
import { VERIFICATION_BAD_REQUEST_ERRORS, VERIFICATION_SERVER_ERRORS, VERIFY_KEY_TIMESTAMP } from './constants/constants';
import { Session, SetVerificationProps } from '../kv-store/kv-types/kv-store.type';

@Injectable()
export class VerificationService {
    constructor(
        private readonly userService: UserService,
        private readonly kvStoreService: KvStoreService
    ) { }

    async sendVerificationCode(email: string, sessionKey: string, verificationKey: string) {
        try {
            const data: SetVerificationProps = {
                id: sessionKey, 
                verificationKey, 
                verificationTimestamp: Date.now().toString()
            }

            await this.kvStoreService.setVerificationProps(data)

            return true
            //there should be return send message to the email
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                VERIFICATION_SERVER_ERRORS.FAILED
            );
        }

    }

    generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    async validateVerifyCode(verifyCode: string, sessionKey: string): Promise<boolean> {
        const session = await this.kvStoreService.getSession({id: sessionKey})

        if (parseInt(session.verificationTimestamp) + VERIFY_KEY_TIMESTAMP < Date.now()) {
            throw new BadRequestException(VERIFICATION_BAD_REQUEST_ERRORS.OVERSTAYED)
        }

        if (session.verificationKey !== verifyCode) {
            throw new BadRequestException( VERIFICATION_BAD_REQUEST_ERRORS.WRONG_KEY)
        }

        return true
    }
}
