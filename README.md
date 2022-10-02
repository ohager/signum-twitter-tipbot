# Signum Twitter Tipbot

# Development

## Prerequisites

This bot needs a database connected to it. This project uses [Prisma](https://prisma.io) as DB abstraction layer. 
The original version uses the DBaaS [Planetscale](https://planetscale.com), but you may connect to other RDMS, i.e. Postgres, Sqlite, MariaDB etc

## Planetscale Migrations

> The scripts for database migration are exclusively for Planetscale. When using another database other scripts need to be used.

Each time the database model needs to be adjusted, i.e. the `schema.prisma` changed, you simply run `yarn db:update`.
This updates the configured database (configure in `.env`), which should always be the __non-production__ database.
With Planetscale you use - similar to git - branches, which can be merged to other branches then.
1. Open a PR with `yarn db:deploy-request <some name>`
2. If 1 was successful and tests work as expected run `yarn db:deploy <number_of_dr>`, where `number_of_dr` is the number returned by 1
