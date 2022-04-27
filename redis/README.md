# Redis

Redis is an open source in-memory **data structure store** used as a database, cache, message broker, and streaming engine. Is written in **ANSI C**.
- high availability via Redis Sentinel;
- automatic partitioning with Redis Cluster;

Atomic operations:
- append to a string;
- increment value in a hash;
- push element to a list;
- compute intersection;
- union and difference;
- others.

Redis works with a **in-memory dataset**. Can persist data either by periodically dumping the dataset to disk or appending each command to a disk-based log.
- can disable persistence.

Redis supports **asynchronous replication**, with non-blocking synchronization and auto-reconnection with partial resynchonization on net split.

Includes:
- Transactions
- Pub/Sub
- Lua scripting
- Keys with a limited time-to-live
- LRU eviction of keys
- Automatic failover

## Getting started with Redis
1. Install Redis.
2. Redis with CLI.

  - External programs talk to Redis using a TCP socket and a REDIS specific protocol.
  - Testing redis-cli: 
  ```bash
  $ redis-cli
  > ping
  PONG
  ```
  - `set mykey somevalue` faz um set de um valor **somevalue** na chave **somekey**.
  - `get mykey` faz um get através da chave **mykey**.

## Data types tutorial


