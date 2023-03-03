import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GetUserCommand,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { verify } from './jwt';

const config = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: 'sa-east-1',
};

const client = new CognitoIdentityProviderClient(config);

export async function signUp(username: string, password: string) {
  const input = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    Password: password,
  };

  const command = new SignUpCommand(input);

  return client.send(command);
}

export async function confirmRegistration(
  username: string,
  confirmationCode: string,
) {
  const input = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    ConfirmationCode: confirmationCode,
  };

  const command = new ConfirmSignUpCommand(input);

  return client.send(command);
}

export async function signIn(username: string, password: string) {
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

export async function signOut(token: string) {
  const input = { AccessToken: token };
  const command = new GlobalSignOutCommand(input);
  return client.send(command);
}

export async function authenticate(token: string) {
  return verify(token);
}

export async function getCurrentUser(token: string) {
  const input = { AccessToken: token };
  const command = new GetUserCommand(input);
  return client.send(command);
}
