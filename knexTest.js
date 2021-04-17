const knex = require("knex")({
    client: 'sqlite3',
    connection: {
      filename: './twitter.sqlite3',
    },
    useNullAsDefault: true
  });
  
 /* {try  {
  
    // Create a table
     knex.schema
      .createTable('users', table => {
        table.increments('id');
        table.string('user_name');
      })
      // ...and another
      .createTable('accounts', table => {
        table.increments('id');
        table.string('account_name');
        table
          .integer('user_id')
          .unsigned()
          .references('users.id');
      })
    
    // Then query the table...
    const insertedRows =  knex('users').insert({ user_name: 'Tim' })
  
    // ...and using the insert id, insert into the other table.
     knex('accounts').insert({ account_name: 'knex', user_id: insertedRows[0] })
  
    // Query both of the rows.
    const selectedRows =  knex('users')
      .join('accounts', 'users.id', 'accounts.user_id')
      .select('users.user_name as user', 'accounts.account_name as account')
  
    // map over the results
    const enrichedRows = selectedRows.map(row => ({ ...row, active: true }))
  
    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  }
}
*/
async function getTwitts() { await knex.schema.createTable('users', function (table) {
    table.increments('userId');
    table.string('name');
  });
}

getTwitts();

