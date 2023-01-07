import pg from 'pg';

/**
 * This script create 100 partitions and attaches them to the main table
 * 
 * docke run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
 */

async function run () {
    try {
        const dbClientPostgres = new pg.Client({
            "user": "postgres",
            "password": "postgres",
            "host": "localhost",
            "port": 5432,
            "database": "postgres"
        });

        console.log("connecting to postgres ... ");
        await dbClientPostgres.connect();
        console.log("droping database customers...");
        await dbClientPostgres.query("drop database customers");
        console.log('creating database customers ...');
        await dbClientPostgres.query('create database customers');

        const dbClientCustomers = new pg.Client({
            "user": "postgres",
            "password": "postgres",
            "host": "localhost",
            "port": 5432,
            "database": "customers"
        });

        console.log('connecting to customers db...');
        await dbClientCustomers.connect();
        console.log('creating customers table ...');
        const sql = `create table customers (id serial, name text) partition by range (id)`;
        await dbClientCustomers.query(sql);
        console.log('creating partitions...');

        /**
         * Assuming the database will support 1B customers
         * and each partition will have 10M customers
         * that gives 1000/10 -> 100 partition table
         */
        for (let i = 0; i < 100; i++) {
            const idFrom  = i*10000000;
            const idTo = (i+1)*10000000;
            const partitionName = `customers_${idFrom}_${idTo}`;
            const psql1 = `create table ${partitionName}
                            (like customers including indexes)`;
            const psql2 = `
                ALTER TABLE customers
                ATTACH PARTITION ${partitionName}
                FOR VALUES FROM (${ifFrom}) to (${idTo})
            `;

            console.log(`creating partition ${partitionName}`);

            await dbClientCustomers.query(psql1);
            await dbClientCustomers.query(psql2);
        }

        console.log('closing connection');
        await dbClientCustomers.end();
        await dbClientPostgres.end();
        console.log('done');

    } catch (error) {
        console.error(`something went wrong ${JSON.stringify(error)}`);
    }
}
