import { Controller, Delete, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  seed() {
    return this.dataService.seedMovieData();
  }

  @Delete()
  deleteAll() {
    return this.dataService.deleteMovieData();
  }
}
