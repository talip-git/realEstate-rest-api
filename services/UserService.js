const {pool} = require("../db/db")
const getAllUsers = async ()=>{
    try {
        const query = "select * from users"
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        throw error
    }
}
const findUserById = async (id)=>{
    try {
        const query = {
            text:"select * from users where users.userid = $1",
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
            text:`select * from users where users.${collumn} = $1`,
            values:[value]
        }
        const {rows} = await pool.query(query);
        return rows;
    } catch (error) {
        throw error
    }
}
const insertUser = async ({username,email,user_pass,isadmin = false,dob,balance,adressid})=>{
    try {
        let query = {
            text:"INSERT INTO users(username,email,user_pass,isadmin,dob,balance,adressid) values($1,$2,$3,$4,$5,$6,$7)",
            values:[username,email,user_pass,isadmin,dob,balance,adressid]
        }
        const {rows} = await pool.query(query);
        return rows[0];
    } catch (error) {
        throw error
    }
}
const updateUserById = async (id,newValues)=>{
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
        setString = setString.slice(0,setString.length-1)
        query = {
            text:`update users ${setString} where users.userid = \$${++index}`,
            values:[...values,id]
        }
        await pool.query(query);
        return true;
    } catch (error) {
        throw error
    }
}


module.exports = {
    findUserById,
    find,
    insertUser,
    updateUserById,
    getAllUsers
}