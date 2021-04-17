const express = require ("express");
const twitsTB = require ('./dbHelper');
const Twitts= require('./recent_search');

const server = express();

server.use(express.json());

const  PORT = 5000;
var allrecords;
server.get('/', (req,res) =>{
   //res.json({message:`server is runnings on port ${PORT}`});
   
   (async () => {

    try {
        // Make request
         const response = await Twitts.getTwitts();
         
      //  console.log("************start of data**********");
        // parse the response array 
        /* for ( i in response.data){
            console.log(i);    
        console.log( response.data[i]);
                                }

        console.log("************end of data**********");
*/

        for ( i in response.data){
            addtoDB(response.data[i]);
                                }
          selectFromDB();
       console.log(allrecords);
            
    } catch (e) {
        console.log(e);
      //  process.exit(-1);
    }
    
})();

res.json( JSON.stringify(allrecords));

 })

 
server.listen(PORT, () => {
    console.log(`\n** Server running on port ${PORT} ***\n`);
});


// inset into DB
async function addtoDB (twData){
   try {
    console.log("************add Record to DB**********");
    console.log(twData);
    await twitsTB.add(twData);
   }
   catch (e){
    console.log(e);
   }
}

//select all
async function selectFromDB(){
    try {
        
         allrecords= await twitsTB.selectAll();
        console.log("************select Record from DB**********");
    console.log(records);
// iterate throught the record array
    for (i= 0; i< records.length; i++){
        console.log("record:"+i + "\n" + JSON.stringify(records[i])+'\n"')}

        
    } catch (error) {
        console.log(e);       
    }
}