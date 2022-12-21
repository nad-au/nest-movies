import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
