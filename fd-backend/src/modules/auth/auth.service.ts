import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GetUserCommand,
  GlobalSignOutCommand,
  DeleteUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const config = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
};

const client = new CognitoIdentityProviderClient(config);

@Injectable()
export class AuthService {
  async create(username: string, password: string) {
    const input = {
      ClientId: process.env.CLIENT_ID,
      Username: username,
      Password: password,
    };

    const command = new SignUpCommand(input);

    return client.send(command);
  }

  async confirm(username: string, confirmationCode: string) {
    const input = {
      ClientId: process.env.CLIENT_ID,
      Username: username,
      ConfirmationCode: confirmationCode,
    };

    const command = new ConfirmSignUpCommand(input);

    return client.send(command);
  }

  async signIn(username: string, password: string) {
    const input = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: process.env.CLIENT_ID,
    };
    const command = new InitiateAuthCommand(input);

    return client.send(command);
  }

  async signOut(token: string) {
    const input = { AccessToken: token };
    const command = new GlobalSignOutCommand(input);
    return client.send(command);
  }

  async authenticate(token: string) {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.USER_POOL_ID,
      tokenUse: 'access',
      clientId: process.env.CLIENT_ID,
    });

    return verifier.verify(token);
  }

  async getCurrentUser(token: string) {
    const input = { AccessToken: token };
    const command = new GetUserCommand(input);
    return client.send(command);
  }

  async remove(token: string) {
    const input = { AccessToken: token };
    const command = new DeleteUserCommand(input);
    return client.send(command);
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
}
