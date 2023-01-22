const express=require("express")
const router=express.Router();
const {body}=require("express-validator");
const expenseController=require("../controllers/expenseController");
const verifyUser=require("../middleware/verifyUser");

router.get('/fetch',verifyUser,expenseController.getAllExpenses);
router.get('/fetch/:date',verifyUser,expenseController.getExpensesByDate);

router.post("/add",[
    body('title',"title can't be empty").exists().trim().escape(),
    body('price',"Invalid price").isInt().trim(),
    body("date","Invalid date").isDate().trim()
],verifyUser,expenseController.add);

router.post("/remove",verifyUser,expenseController.remove);


module.exports=router;