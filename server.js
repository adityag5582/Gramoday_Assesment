import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Report from './reportModel.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());


const Mongo_Url = process.env.MONGO;
mongoose.connect(Mongo_Url, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch((error)=> console.log("Database not connected"));


app.listen(3000, ()=>{
    console.log("server running at http://localhost:3000");
});


app.post('/reports', async (req, res) => {

    const details = req.body;
    const report = await Report.findOne({
        marketID: details.reportDetails.marketID,
        cmdtyID: details.reportDetails.cmdtyID,
    });

    if(report)
    {
        const usersCount = report.users.length;
        report.price = ( (report.price)*usersCount + ((details.reportDetails.price)/(details.reportDetails.convFctr)) )/(usersCount+1);
        report.users.push(details.reportDetails.userID);      
        try {
            await report.save();
            res.send({
                status:"success",
                reportID: report._id,
            });
        } catch (error) {
            res.send(error.message);
        }
    }
    else{
        const report = new Report({
            marketID:details.reportDetails.marketID,
            marketName:details.reportDetails.marketName,
            cmdtyName:details.reportDetails.cmdtyName,
            cmdtyID:details.reportDetails.cmdtyID,
            users:[details.reportDetails.userID],
            priceUnit:"Kg",
            price:(details.reportDetails.price)/(details.reportDetails.convFctr),
          });  
        
          try {
            await report.save();
            res.send({
                status:"success",
                reportID: report._id,
            });
        } catch (error) {
            res.send(error.message);
        }
    }
    
    
  });
  


  app.get('/reports', async (req, res) => {

    const id = req.query.reportID.replace( /[\r\n]+/gm, "");
    const reportDetails = await Report.findById(id);
    if(reportDetails){
        res.send({
            _id: id,
            marketID: reportDetails.marketID,
            marketName: reportDetails.marketName,
            cmdtyName: reportDetails.cmdtyName,
            cmdtyID: reportDetails.cmdtyID,
            users: reportDetails.users,
            timestamp: reportDetails.timestamp,
            priceUnit: reportDetails.priceUnit,
            price: reportDetails.price
        });
    }else{
        res.send("Required report not found");
    }
    
  });