import { Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { SeedModule } from './seed/seed.module';

export const devRoutes: Routes = [
  {
    path: '/seed',
    module: SeedModule,
  },
];

const getModulesFromRoutes = (routes: Routes) => {
  return routes.map((route) => route.module);
};

@Module({
  imports: [
    RouterModule.forRoutes(devRoutes),
    ...getModulesFromRoutes(devRoutes),
  ],
})
export class DevRoutesModule {}
