import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    marketID:{type: String, required:true},
    marketName:{type: String, required:true},
    cmdtyName:{type: String, required:true},
    cmdtyID:{type: String, required:true},
    users:[{type:String}],
    timestamp : { type : String, default: Date.now},
    priceUnit:{type:String},
    price:{type: Number, required:true},

}, {
    timestamps: true
});

const report = mongoose.model("Report", reportSchema);

export default report;