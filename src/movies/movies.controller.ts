import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAllMovies();
  }

  @Get(':name')
  getMovie(@Param('name') name: string) {
    return this.moviesService.getMovie(name);
  }
}
