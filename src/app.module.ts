import { Neo4jConfig, Neo4jModule } from '@dbc-tech/nest-neo4j';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    Neo4jModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config: Neo4jConfig = {
          scheme: configService.get('NEO4J_SCHEME'),
          host: configService.get('NEO4J_HOST'),
          port: configService.get<number>('NEO4J_PORT'),
          username: configService.get('NEO4J_USERNAME'),
          password: configService.get('NEO4J_PASSWORD'),
          database: configService.get('NEO4J_DATABASE'),
          disableLosslessIntegers: true,
        };
        return config;
      },
      inject: [ConfigService],
    }),
    DataModule,
    ActorsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
