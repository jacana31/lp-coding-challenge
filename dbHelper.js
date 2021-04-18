// this file contain queries 
const knex = require("knex");
const config = require('./knexfile');
const db = knex(config.development);

module.exports={ 
    add,
    selectAll,
    deleteAll
};


async function add(twits){
    try {
        const [id]=await db("twits").insert(twits);
        return id;    
    } catch (error) {
        if(error.code = 19)
        console.log('Insert record id: '+twits.id+' record already exists');          
        else
        console.log(error);
    }
    
}

async function selectAll(){
    return await db("twits");
} 

async function deleteAll(){
    await db("twits").delete();
}