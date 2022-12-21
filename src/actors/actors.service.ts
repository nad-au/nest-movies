import { Injectable, NotFoundException } from '@nestjs/common';
import { map, mapArray, Neo4jService } from '@dbc-tech/nest-neo4j';
import { ActorEntity } from './entities/ActorEntity';
import { MovieEntity } from 'src/movies/entities/MovieEntity';

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

  async getActor(actorName: string): Promise<ActorEntity> {
    const result = await this.neo4jService.read(actorWithMovies, {
      actorName,
    });
    if (result.records.length === 0) throw new NotFoundException();

    const record = result.records[0];
    const actor = map(record, 'actor', ActorEntity);
    actor.movies = mapArray(record, 'movies', MovieEntity);

    return actor;
  }

  async getAllActors(): Promise<ActorEntity[]> {
    const result = await this.neo4jService.read(allActors);

    const actors = result.records.map((record) =>
      map(record, 'actor', ActorEntity),
    );
    return actors;
  }
}
