import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';

import {
  signUp,
  confirmRegistration,
  signIn,
  authenticate,
  getCurrentUser,
} from 'src/cognito/cognito';

@Injectable()
export class AuthService {
  async create(email: string, password: string) {
    return signUp(email, password);
  }

  async confirm(email: string, confirmCode: string) {
    return confirmRegistration(email, confirmCode);
  }

  async sigIn(email: string, password: string) {
    return signIn(email, password);
  }

  async authenticate(token: string) {
    return authenticate(token);
  }

  async getCurrentUser(token: string) {
    return getCurrentUser(token);
  }

  findAll(): string {
    return `This action returns all auth`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} auth`;
  }

  update(id: number): string {
    return `This action updates a #${id} auth`;
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`;
  }
}
