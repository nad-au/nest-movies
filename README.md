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

## Debugging

In debug mode your app is running outside of the container. For this reason you'll need to set the neo4j host to `localhost` instead of `neo4j` which is the service's host name when running in the compose network.

Edit `.env` file and change to:

```
NEO4J_HOST=localhost
```

In vscode use debug auto-atach. `Ctrl-Shift-P`, Debug: Toggle Auto Attach, Smart.

Start neo4j container:

```bash
yarn compose:neo4j
```

Start app in debug mode:

```bash
yarn start:debug
```

Should auto-attach and allow setting breakpoints etc.
