# Nest Movies

Movies API created with Nest & Neo4j

## Requirements

- Node 16+
- Yarn 1.22+
- Docker Compose 2 (should be able to use `docker compose` syntax)

## Getting Started

Copy `.env.example` file:

```bash
cp .env.example .env
```

Install packages:

```bash
yarn
```

Start docker-compose to launch app & Neo4j database:

```bash
yarn compose
```

Seed data:

```bash
curl -X POST localhost:3000/data
```

Return data:

```bash
# Get all movies
curl -X GET localhost:3000/movies

# Get The Matrix movie
curl -X GET localhost:3000/movies/The%20Matrix

# Get all actors
curl -X GET localhost:3000/actors

# Get Keanu Reeves actor
curl -X GET localhost:3000/actors/Keanu%20Reeves
```

Delete all data (the entire db):

```bash
curl -X DELETE localhost:3000/data
```