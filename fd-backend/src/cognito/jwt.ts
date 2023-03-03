import { CognitoJwtVerifier } from 'aws-jwt-verify';

export async function verify(token: string) {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: 'access',
    clientId: process.env.CLIENT_ID,
  });

  return verifier.verify(token);
}
