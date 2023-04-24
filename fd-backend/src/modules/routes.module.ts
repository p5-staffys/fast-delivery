import { Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { UserModule } from './user/user.module';
import { PackageModule } from './package/package.module';
import { AdminModule } from './admin/admin.module';

//Aca van las rutas con sus modulos
export const routes: Routes = [
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'package',
    module: PackageModule,
  },
  {
    path: 'admin',
    module: AdminModule,
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
