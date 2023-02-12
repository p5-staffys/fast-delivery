import { Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AuthModule } from './auth/auth.module';

//Aca van las rutas con sus modulos
export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
];

//Aca se importan los modulos exportados de modules, todos los que tengan endpoint correspondiente a la logica de negocio
@Module({
  imports: [RouterModule.forRoutes(routes), AuthModule],
})
export class RoutesModule {}
