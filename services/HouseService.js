const {pool} = require("../db/db")
const getAllHouses = async ()=>{
    try {
        const query = "select * from houses"
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        throw error
    }
}
const findHouseById = async (id)=>{
    try {
        const query = {
            text:"select * from houses where houses.houseid = $1",
            values:[id]
        }
        const {rows} = await pool.query(query)
        return rows;
    } catch (error) {
        throw error
    }
}
const find = async (collumn,value)=>{
    try {
        const query = {
            text:`select * from houses where houses.${collumn} = $1`,
            values:[value]
        }
        const {rows} = await pool.query(query);
        return rows;
    } catch (error) {
        throw error
    }
}
const insertHouse = async ({isbought=false,isrent=false,price,noofrooms,squareft,estateid,adressid})=>{
    try {
        let query = {
            text:"INSERT INTO houses(isbought,isrent,price,noofrooms,squareft,estateid,adressid) values($1,$2,$3,$4,$5,$6,$7)",
            values:[isbought,isrent,price,noofrooms,squareft,estateid,adressid]
        }
        const {rows} = await pool.query(query);
        return rows[0];
    } catch (error) {
        throw error
    }
}
const updateHouseById = async (id,newValues)=>{
    try {
        let query = {};
        let setString = `set`
        let index = 0;
        let values = []
        for (const key in newValues) {
            const value = newValues[key]
            if(value){
                values.push(value);
                setString += ` ${key} = \$${++index},`
            }
        }
        query = {
            text:`update houses ${setString} where houses.houseid = \$${++index}`,
            values:values
        }
        await pool.query(query);
    } catch (error) {
        throw error
    }
}


module.exports = {
    findHouseById,
    find,
    insertHouse,
    updateHouseById,
    getAllHouses
}