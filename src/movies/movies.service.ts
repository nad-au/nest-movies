import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Movie } from './nodes/movie.node';
import { nodeArrayProps, nodeProps } from 'src/utils/record-mapper';
import { Actor } from 'src/actors/nodes/actor.node';

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

  async getMovie(movieName: string): Promise<Movie> {
    const result = await this.neo4jService.read(movieWithActors, {
      movieName,
    });
    if (result.records.length === 0) throw new NotFoundException();

    const record = result.records[0];
    const movie = nodeProps<Movie>(record, 'movie');
    movie.actors = nodeArrayProps<Actor>(record, 'actors');

    return movie;
  }

  async getAllMovies(): Promise<Movie[]> {
    const result = await this.neo4jService.read(allMovies);

    return result.records.map((record) => nodeProps<Movie>(record, 'movie'));
  }
}
