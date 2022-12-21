import { MovieEntity } from 'src/movies/entities/MovieEntity';

export class ActorEntity {
  born: number;
  name: string;

  movies?: MovieEntity[];
}
