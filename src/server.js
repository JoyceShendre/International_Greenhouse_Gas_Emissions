const CONFIG = require('../config');
const Express = require('express');
const app = new Express();
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const listRouter = require('./routers/list.router')


const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
})


app.use('/api/v1/greenhouse_gas_inventory', listRouter)

app.listen(CONFIG.PORT, () => {
    console.log(`App Is Listening On Port ${CONFIG.PORT}`);
});

const setup = async () => {
    const db = await dbPromise
    await db.migrate()
    app.listen(8000, () => {
        console.log('listening on localhost:8000')
    })
}
setup()

