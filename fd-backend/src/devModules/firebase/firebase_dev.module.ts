import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase_dev.controller';
import { FirebaseDevService } from './firebase_dev.service';

@Module({
  imports: [],
  exports: [],
  providers: [FirebaseDevService],
  controllers: [FirebaseController],
})
export class FirebaseDevModule {}
