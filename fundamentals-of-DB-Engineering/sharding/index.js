const app = require('express')();
const { Client } = require("pg");
const HashRing = require('hashring');
const crypto  = require("crypto");
const hr = new HashRing();

hr.add("5432");
hr.add("5433");
hr.add("5434");

const clients = {
    "5432": new Client({
        host: "127.0.0.1",
        port: 5432,
        use: "postgres",
        password: "postgres",
        database: "postgres" 
    }),
    "5433": new Client({
        host: "127.0.0.1",
        port: 5433,
        use: "postgres",
        password: "postgres",
        database: "postgres" 
    }),
    "5434": new Client({
        host: "127.0.0.1",
        port: 5434,
        use: "postgres",
        password: "postgres",
        database: "postgres" 
    })
};

connect();
async function connect() {
    await clients["5432"].connect();
    await clients["5433"].connect();
    await clients["5434"].connect();
}

app.get('/', async (req, res) => {
    const urlId = req.query.urlId;
    const server = hr.get(urlId);
    const result = await clients[server].query("SELECT * FROM url_table WHERE url_id = $1", [urlId]);
    
    if(result.rowCount > 0) {
        res.send({
            urlId, url: result.rows[0], server
        });
    }
    res.sendStatus(404);
});

app.post('/', async (req, res) => {
    const url = req.query.url;

    // consistentl hash this to get a port!

    const hash = crypto.createHash("sha256").update(url).digest("base64");
    const urlId = hash.substring(0, 5);
    const server = hr.get(urlId);

    await clients[server].query("INSERT INTO url_table (url, url_id) VALUES ($1,$2)", [url, urlId]);

    res.send({
        urlId,
        url,
        server
    });
});

app.listen(8081, () => console.log('listining at 8081'));