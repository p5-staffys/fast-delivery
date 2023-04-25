import { Routes } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { SeedModule } from './seed/seed.module';
import { FirebaseDevModule } from './firebase/firebase_dev.module';

export const devRoutes: Routes = [
  {
    path: '/seed',
    module: SeedModule,
  },
  {
    path:'/firebase',
    module: FirebaseDevModule    }
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
