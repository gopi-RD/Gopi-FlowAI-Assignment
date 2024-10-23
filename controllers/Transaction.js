const transaction = require("../models/Transaction")
const category= require("../models/Category")
const user= require("../models/User")
const Category = require("../models/Category")

// Get All Transactions
const getAllTransaction=async (request, response) => {
    try{
        const transactions= await transaction.find({}).populate("category_id") 
        response.status(200).json(transactions)

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


// Get Transaction by ID 

const getTransaction=async (request, response) => {
    try{
        const {transactionId}=request.params
        const getTransaction = await transaction.findById({_id:transactionId}).populate("category_id") 
        if(!getTransaction){
            return response.status(404).json({error:`Transaction data not found`})
        }
        response.status(200).json(getTransaction)

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


//Add new transaction

const addTransaction=async (request, response) => {
    try {
        const { user_id=request.id, amount, type,name,description } = request.body;
    
        // Validate required fields
        if (!user_id || !amount || !type) {
          return response.status(400).json({ error_msg: 'All fields (user_id, amount, type, category_id) are required' });
        }
    
        // Check if the user exists
        const User = await user.findById(user_id);
        if (!User) {
          return response.status(400).json({ error_msg: 'User not found' });
        }

        const addCategory= new category({
            name,
            type
        })
       const saveCategory= await addCategory.save() 
       console.log(saveCategory)
       //await tranction.category_id.push(saveCategory)
        // Check if the category exists
        const categoryId = await category.findById(saveCategory._id);
        if (!categoryId) {
          return response.status(400).json({ error_msg: 'Category not found' });
        }
        // Create a new transaction
        const newTransaction = new transaction({
          user_id,
          amount,
          category_id:saveCategory._id,
          type,
          description,
        });
    
        // Save the transaction to the database
       const savetransaction= await newTransaction.save();
        User.transactionList.push(savetransaction)
         await User.save()
        response.status(201).json({message:`Transaction saved successfully`})

    }catch(err){
        response.status(400).json({error_msg:`Invalid request data ${err}`})       
    }
}

// Update Transaction by ID    


const updateTransaction=async (request, response) => {

    try{
        const {transactionId}=request.params
        const {amount,type,name,description}=request.body 
        const categoryData= await transaction.findById({_id:transactionId})
        const categoryId=categoryData.category_id
        console.log(categoryId)
          await category.findByIdAndUpdate({_id:categoryId},{name,type})
        const updatedTransaction=await transaction.findByIdAndUpdate({_id:transactionId},{amount,type,description}); 
        if(!updatedTransaction){
            return response.status(404).json({error:`Transaction not found`})
        }
        response.status(200).json({message:`Updated Transaction Successfully`})

    }
    catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}


// Delete Transaction by ID 

   
const deleteTransaction=async (request, response) => {
    try{
        const {transactionId}=request.params
        const deletedEmployee=await transaction.findByIdAndDelete({_id:transactionId})
        if(!deletedEmployee){
            return response.status(404).json({error:`Transaction not found`})
        }
        response.status(200).json({message:"Transaction deleted successfully"})

    }catch(err){
        response.status(400).json({error:`Invalid request data ${err}`})       
    }
}

const transactionSummary= async (request, response)=>{
    try{

        const { startDate, endDate} = request.query;
      
      // Create a filter object
      const filter = {};
  
      // If a category is provided, find the corresponding category ID
      /*if (category) {
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
          return res.status(400).json({ error: 'Category not found' });
        }
        filter.category = categoryDoc._id;  // Add category filter
      }
         */
      // If startDate and/or endDate are provided, add date filter
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) {
          filter.date.$gte = new Date(startDate);  // Greater than or equal to startDate
        }
        if (endDate) {
          filter.date.$lte = new Date(endDate);    // Less than or equal to endDate
        }
      }
  
      // Fetch filtered transactions
      const transactions = await transaction.find(filter)
  
      // Calculate summary
      const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      }, {
        totalIncome: 0,
        totalExpense: 0
      });
  
      // Calculate balance
      summary.balance = summary.totalIncome - summary.totalExpense;
  
      response.json(summary);

    }
catch(err){
    response.status(400).json({error:`Invalid request data ${err}`})       
}
}



module.exports={getAllTransaction,getTransaction,addTransaction,updateTransaction,deleteTransaction,transactionSummary}