const mysql = require('mysql2');

connectMyISAM();

async function connectMyISAM() {
    try {
        const con = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'test'
        });

        await con.beginTransaction();
        await con.query(`INSERT INTO employees_myisam (name) values (
            ?
            )`, 'Matheus');
        await con.commit();
        await con.close();
        console.log(result)
    } catch (error) {
        console.log(error);
    }
}
