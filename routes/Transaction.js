
const transactionController=require("../controllers/Transaction");
const authication=require("../middleware/verifyJWTToken")
const express = require("express"); 
const routes=express.Router(); 

routes.get("/transactions",authication,transactionController.getAllTransaction);
routes.get("/transaction/:transactionId",authication,transactionController.getTransaction);
routes.post("/transaction",authication,transactionController.addTransaction);
routes.put("/transaction/:transactionId",authication,transactionController.updateTransaction);
routes.delete("/transaction/:transactionId",authication,transactionController.deleteTransaction); 
routes.get("/summary",authication,transactionController.transactionSummary)

module.exports=routes;