import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from '@dbc-tech/nest-neo4j';
import { Actor } from './nodes/actor.node';
import { nodeArrayProps, nodeProps } from 'src/utils/record-mapper';
import { Movie } from 'src/movies/nodes/movie.node';

export const allActors = `
  MATCH (actor:Person)
  RETURN actor
`;

export const actorWithMovies = `
  MATCH (actor:Person {name: $actorName})-[:ACTED_IN]->(movie:Movie)
  RETURN actor, COLLECT(movie) AS movies
`;

@Injectable()
export class ActorsService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getActor(actorName: string): Promise<Actor> {
    const result = await this.neo4jService.read(actorWithMovies, {
      actorName,
    });
    if (result.records.length === 0) throw new NotFoundException();

    const record = result.records[0];
    const actor = nodeProps<Actor>(record, 'actor');
    actor.movies = nodeArrayProps<Movie>(record, 'movies');

    return actor;
  }

  async getAllActors(): Promise<Actor[]> {
    const result = await this.neo4jService.read(allActors);

    return result.records.map((record) => nodeProps<Actor>(record, 'actor'));
  }
}
