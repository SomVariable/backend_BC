import {
  Inject,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSession, Session } from './kv-types/kv-store.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateVerifyDto } from './dto/update-verify-session.dto';
import { MISSING_SESSION_MESSAGE } from './constants/kv-store.constants';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class KvStoreService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createSession({ id }: CreateSession): Promise<Session> {
    try {
      const session: Session = {
        id,
        verificationKey: null,
        verificationTimestamp: null,
        status: 'ACTIVE',
      };

      await this.cacheManager.set(id, JSON.stringify(session));
      const sessionJSON: string = await this.cacheManager.get(id);
      const newSession: Session = await JSON.parse(sessionJSON);
      return newSession;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async setVerificationProps(
    id: string,
    data: UpdateVerifyDto,
  ): Promise<Session> {
    try {
      const session: Session = await this.updateSession(id, data);

      return session;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateSession(
    id: string,
    data: UpdateSessionDto,
  ): Promise<Session | null> {
    const session: Session = await JSON.parse(await this.cacheManager.get(id));

    if (!session) {
      throw new NotFoundException();
    }

    const updateObject = JSON.stringify({ ...session, ...data });

    await this.cacheManager.set(id, updateObject);

    const isUpdated = await this.cacheManager.get(id);

    if (isUpdated) {
      const updatedSession: Session = await JSON.parse(
        await this.cacheManager.get(id),
      );

      return updatedSession;
    }

    return null;
  }

  async getSession(id: string) {
    const dataFromStore: Session | string = await this.cacheManager.get(id);

    if (typeof dataFromStore === 'string') {
      const session: Session = JSON.parse(dataFromStore);

      return session;
    }

    return dataFromStore;
  }

  async blockSession(id: string) {
    const session: Session = await JSON.parse(await this.cacheManager.get(id));

    if (!session || session.status === 'BLOCKED') {
      return null;
    }

    const updateObject = JSON.stringify({ ...session, status: 'BLOCKED' });
    await this.cacheManager.set(id, updateObject);

    const updatedSession = await JSON.parse(await this.cacheManager.get(id));

    if (updatedSession.status === 'BLOCKED') {
      const updatedSession: Session = await JSON.parse(
        await this.cacheManager.get(id),
      );

      return updatedSession;
    }

    return updatedSession;
  }

  async activeSession(id: string): Promise<Session> {
    const session: Session = await JSON.parse(await this.cacheManager.get(id));

    if (!session || session.status === 'ACTIVE') {
      return null;
    }

    const updateObject = JSON.stringify({ ...session, status: 'ACTIVE' });
    await this.cacheManager.set(id, updateObject);
    const updatedSession: Session = await JSON.parse(
      await this.cacheManager.get(id),
    );

    if (updatedSession.status !== 'ACTIVE') {
      return null;
    }

    return updatedSession;
  }

  async deleteSession(id: string) {
    try {
      const session = await JSON.parse(await this.cacheManager.get(id));

      if (!session) {
        throw new BadRequestException(MISSING_SESSION_MESSAGE(id));
      }

      await this.cacheManager.del(id);

      return session;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  generateSessionKey(id: number, deviceType: string): string {
    return `${id}:${deviceType}`;
  }
}
