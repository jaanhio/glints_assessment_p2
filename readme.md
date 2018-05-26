# Glints Technical assessment Part 2

This assessment is separated into frontend and backend.

This is the backend repo. For frontend repo, please refer to here (https://github.com/jaanhio/-glints_assessment_p2_frontend)

PDF copy of ERD diagram can be found on root of folder. 
---
## 1.Setup and seed postgresql db

Run the following commands according to their respective order.

1. Create db
`createdb hungrycomehere`

2. Create tables
`psql -d hungrycomehere -a -f tables.sql`

3. Seed restaurant table
`psql -d hungrycomehere -a -f restaurant_seed.sql`

4. Seed opening hours table
`psql -d hungrycomehere -a -f openinghours_seed.sql`
---

## 2. Create config for connection to postgresql db

Create a `.env` file on root directory of repo.

This file will contain db config information and also secret key for generation of jwt. For secret key generation, check out [LastPass Password generator](https://www.lastpass.com/password-generator).

Below is an example of `.env` file.
```
db_user='jianhaotan'
db_host='127.0.0.1'
db_database = 'hungrycomehere'
db_port = 5432
secret = '%IzOi9j@aGPBo2UqN*n60JgPA'
```
---

## 3. Start server
`yarn server`

