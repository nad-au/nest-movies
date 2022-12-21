import { Controller, Get, Param } from '@nestjs/common';
import { ActorsService } from './actors.service';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  getAll() {
    return this.actorsService.getAllActors();
  }

  @Get(':name')
  getMovie(@Param('name') name: string) {
    return this.actorsService.getActor(name);
  }
}
