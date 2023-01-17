const express=require("express")
const router=express.Router();
const {body}=require("express-validator");
const expenseController=require("../controllers/expenseController");
const verifyUser=require("../middleware/verifyUser");

router.get('/fetch',verifyUser,expenseController.getAllExpenses);
router.get('/fetch/:date',verifyUser,expenseController.getExpensesByDate);

router.post("/add",[
    body('title',"title: minimum 5 characters").isLength({min:5}).trim(),
    body('price',"Price: invalid price").isInt().trim(),
    body("date","Date: invalid date").isDate().trim()
],verifyUser,expenseController.add);

router.post("/remove",verifyUser,expenseController.remove);


module.exports=router;