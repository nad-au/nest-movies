import { Actor } from 'src/actors/nodes/actor.node';

export class Movie {
  released: number;
  tagline: string;
  title: string;
  actors?: Actor[];
}
