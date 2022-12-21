import { Injectable, NotFoundException } from '@nestjs/common';
import { map, mapArray, Neo4jService } from '@dbc-tech/nest-neo4j';
import { MovieEntity } from './entities/MovieEntity';
import { ActorEntity } from 'src/actors/entities/ActorEntity';

export const allMovies = `
  MATCH (movie:Movie)
  RETURN movie
`;

export const movieWithActors = `
  MATCH (movie:Movie {title: $movieName})-[:ACTED_IN]-(actor:Person)
  RETURN movie, COLLECT(actor) AS actors
`;

@Injectable()
export class MoviesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getMovie(movieName: string): Promise<MovieEntity> {
    const result = await this.neo4jService.read(movieWithActors, {
      movieName,
    });
    if (result.records.length === 0) throw new NotFoundException();

    const record = result.records[0];
    const movie = map(record, 'movie', MovieEntity);
    movie.actors = mapArray(record, 'actors', ActorEntity);

    return movie;
  }

  async getAllMovies(): Promise<MovieEntity[]> {
    const result = await this.neo4jService.read(allMovies);

    const movies = result.records.map((record) =>
      map(record, 'movie', MovieEntity),
    );
    return movies;
  }
}
