import { Module } from '@nestjs/common';
import { RoutesModule } from './modules/routes.module';

@Module({
  imports: [RoutesModule],
})
export class AppModule {}
