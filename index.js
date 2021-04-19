const express = require ("express");
const twitsTB = require ('./dbHelper');
const Twitts= require('./recent_search');

const server = express();



server.use(express.json());

const  PORT = 5000;
// end point to search Tweeter , store in DB and send Html page with search result 
server.get('/', (req,res) =>{
   
   
   (async () => {

    try {
        // Make request
        
         const response = await Twitts.getTwitts();
         
         // insert each Json record into table to update existing set
        for ( i in response.data){
            console.log('Recieved Tweets from Tweeter: '+ JSON.stringify(response.data[i])+'\n');
            addtoDB(response.data[i]);
                                }
         // select all from table                        
        const allrecords=await selectFromDB();
        //console.log('got records'+ JSON.stringify(allrecords));
        res.writeHead(200,{'Content-Type': 'text/html'});
        var fs= require("fs");
        fs.readFile('index.html', 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                        }else{
                            // write records into the static html file 
                        data= data.replace('twitts-to-place-here', JSON.stringify(allrecords));
                            // send html to browser
                        res.write(data);
                        res.end();
                            }
                            }                     
                            );       
    } catch (e) {
        // send error message to client and close request
        console.log("Error from get request: "+ e);
        res.write("Request unsuccessful Twitter maybe unreachable ");
        return res.end();
    }
    
})();
 })

 
server.listen(PORT, () => {
    console.log(`\n** Server running on port ${PORT} ***\n`);
});
// end pont to dalate rows from table
server.post('/deleteDB', function (req, res) {
    
    (async () => {

        try{
    await deleteAll();
    res.send('Deleted All records from table ');
    console.log('deleted all records from table')
        }
        catch(e){
            console.log(e);
        }
  })();
})

// endpoint to select all rows as json objects
server.get('/allrows', function (req, res) {
    
    (async () => {

        try{
           // res.writeHead(200,{'Content-Type': 'application/json'});
            const alltwitts= await selectFromDB();
    res.send( JSON.stringify(alltwitts));
    console.log('sending All rows from table as JSON');
    console.log(alltwitts);
        }
        catch(e){
            console.log(e);
        }
  })();
})

// inset into DB
async function addtoDB (twData){
   try {
   // console.log("************add Record to DB**********");
    //console.log(twData);
    await twitsTB.add(twData);
   }
   catch (e){
    console.log(e);
   }
}

//select all function
async function selectFromDB(){
    try {
        const records= await twitsTB.selectAll();
        //console.log("************selected Record from DB**********");
        //console.log(records);
// iterate throught the record array
        //for (i= 0; i< records.length; i++){
        //console.log("record:"+i + "\n" + JSON.stringify(records[i])+'\n"')}
        return records ;
        } catch (error) {
        console.log(e);       
                        }
    }

    //delete all
async function deleteAll(){

        try {
        await twitsTB.deleteAll();
        //console.log('delete all');
        } catch (error) {
            console.log(error);
            
        }
    }