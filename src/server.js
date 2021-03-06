const Express = require('express');
const app = new Express();
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const listRouter = require('./routers/list.router')
let port = process.env.PORT || 3000


const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
})

app.get('/', (req, res) => {
    res.send('Welcome.')
})
app.use('/api/v1/greenhouse_gas_inventory', listRouter)

app.listen(port, () => {
    console.log(`App Is Listening On Port ${port}`);
});

const setup = async () => {
    const db = await dbPromise
    await db.migrate()
    app.listen(8000, () => {
        console.log('listening on localhost:8000')
    })
}
setup()

