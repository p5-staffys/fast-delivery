import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralError } from 'src/common/error-handlers/exceptions';
import { Public } from 'src/common/guards/auth.guard';
import { SingInDto } from './dto/singin.dto';
import { FirebaseDevService } from './firebase_dev.service';

@ApiTags('Dev Firebase Just for Token')
@Controller()
export class FirebaseController {
  constructor(private readonly firebaseDeService: FirebaseDevService) {}

  //JUST FOR DEV
  @Public()
  @Post()
  async sing(@Body() emailAndPassowrd: SingInDto): Promise<string> {
    try {
      const { email, password } = emailAndPassowrd;
      const userCredentials = await this.firebaseDeService.signIn(
        email,
        password,
      );
      return await userCredentials.user.getIdToken();
    } catch (err: unknown) {
      throw new GeneralError(
        'Email o password incorrecto verificar existencias en firebase//JUSTFORDEV',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
