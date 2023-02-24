import { Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

//Aca van las rutas con sus modulos
export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
    // can put childrenModules
  },
  {
    path: 'user',
    module: UserModule,
  },
];

const getModulesFromRoutes = (routes: Routes) => {
  return routes.map((route) => route.module);
};

//Aca se importan los modulos exportados de modules, todos los que tengan endpoint correspondiente a la logica de negocio
@Module({
  imports: [RouterModule.forRoutes(routes), ...getModulesFromRoutes(routes)],
})
export class RoutesModule {}
