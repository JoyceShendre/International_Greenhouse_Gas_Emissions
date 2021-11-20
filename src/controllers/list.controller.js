const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const async = require('async');
const readXlsxFile = require('read-excel-file/node');
const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
});

module.exports.uploadDataToDB = async (request, response) => {
    try {
        const db = await dbPromise;
        readXlsxFile('greenhouse_gas_inventory_data_data.xlsx')
            .then(async (rows) => {
                rows.forEach(async element => {
                    await db.run('INSERT INTO greenhouse_gas_inventory_data (country_name,all_years,gas_values,category) VALUES (?,?,?,?);', element['0'], element['1'], element['2'], element['3'])
                })

            }).catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllCountries = async (request, response) => {

    try {
        const db = await dbPromise;
        const getCountries = await db.all('SELECT g.id,g.country_or_area,g.year as current_year, (SELECT max(gd.year) FROM greenhouse_gas_inventory_data_data gd) as start_year,(SELECT min(gd.year) FROM greenhouse_gas_inventory_data_data gd) as end_year, g.value FROM greenhouse_gas_inventory_data_data g;');
        // console.log(getCountries)
        response.status(200).json({
            data: getCountries
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports.getGasInventoryData = async (request, response) => {

    var country_name = request.query.country_name;
    var start_year = request.query.start_year;
    var end_year = request.query.end_year;
    var category = request.query.category;
    var value = request.query.value;
    //console.log(country_name, start_year, end_year, category, value)
    try {
        const db = await dbPromise;
        await db.all(`SELECT   g.* FROM greenhouse_gas_inventory_data_data g WHERE g.country_or_area like '%${country_name}%' AND g.category like '%${category}%' AND g.value like '%${value}%' AND ( g.year BETWEEN ${start_year} AND ${end_year}) ORDER BY g.year;`).then((data) => {
            response.status(200).json({
                data: data
            });

        }).catch((error) => {
            console.error(error);
        });


    } catch (error) {
        console.log(error)

    }

}