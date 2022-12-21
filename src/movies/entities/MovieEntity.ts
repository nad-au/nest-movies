import { ActorEntity } from 'src/actors/entities/ActorEntity';

export class MovieEntity {
  released: number;
  tagline: string;
  title: string;
  actors?: ActorEntity[];
}
