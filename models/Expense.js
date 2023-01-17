const mongoose=require('mongoose');
const {Schema}=mongoose;

const expenseSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        date_created:{
            type:Date,
            default:Date.now
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
          }
    }
);

const Expense=mongoose.model("expenses",expenseSchema);

module.exports=Expense;