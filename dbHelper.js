// this file contain queries 
const knex = require("knex");
const config = require('./knexfile');
const db = knex(config.development);

module.exports={ 
    add,
    selectAll
};


async function add(twits){
    const [id]=await db("twits").insert(twits);
    return id;
}

async function selectAll(){
    return db("twits");
} 