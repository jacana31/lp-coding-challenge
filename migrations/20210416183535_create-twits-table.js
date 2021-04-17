
exports.up = function(knex) {

    return knex.schema.createTable("twits", tbl =>{
    
        tbl.integer('author_id').notNullable();  
        tbl.integer('id').unique().notNullable();  
        tbl.text('text');  
        
        } )
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("twits")
  
};
