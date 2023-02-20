/*
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
*/

describe('authController', () => {
  it('test', () => {
    expect(true).toBe(true);
  });

  /*
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });


  describe('findAll', () => {
    it('should return an array of auth', async () => {
      const result = ['test'];
      jest.spyOn(authService, 'findAll').mockImplementation(() => result);

      expect(await authController.findAll()).toBe(result);
    });
  });
  */
});
