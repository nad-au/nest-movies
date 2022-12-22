import { Movie } from 'src/movies/nodes/movie.node';

export class Actor {
  born: number;
  name: string;

  movies?: Movie[];
}
