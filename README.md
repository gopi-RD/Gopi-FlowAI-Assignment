### Setup and run instructions
    1.Create a new project folder for your backend:
        mkdir backend
        cd backend 
    2. Initialize a new Node.js project:
        npm init -y 
        This will generate a package.json file for managing dependencies.
    3. install the necessary packages like 
        express,cors,dotenv,mongoose,bcrypt,jsonwebtoken,etc 

        npm install express mongoose dotenv jsonwebtoken bcrypt
        npm install -D nodemon  

    4. Set Up MongoDB Connection :

        to connect to MongoDB by using mongodb connect string provide by "mongodb Atlas"

    5. to run server by using the command "npm run dev"


### API Documentation :

    url:"http://localhost:3000" 

    ### Registeration API :
            url:"http://localhost:3000/user/register"
            path:"/user/register"
             method:"POST"

            Request :

                    {   "name":"gopi",
                        "email":"gopi@gmail.com",
                        "password":"gopi123"
                    }

            Response: 

                    {
                        "message": "User saved successfully"
                    }        


    ### Login API :
            url:"http://localhost:3000/user/login"
            path:"/user/login"
             method:"POST"

            Request :

                    { 
                        "email":"gopi@gmail.com",
                        "password":"gopi123"
                    }

            Reponse:
                     {
                        "jwt_token": "",
                        "message": "Login Successful"
                     }        

    ### Add Transaction :
            url:"http://localhost:3000/trans/transaction"
            path:"/trans/transaction"
             method:"POST"

            Request:
                    {
                        "amount":2000,
                        "type":"expense",
                        "name":"Food",
                        "description":"To spending food"
                    }

             Response:

                    {
                        "message": "Transaction saved successfully"
                    }       

    ### Get All Transactions :
            url:"http://localhost:3000/trans/transactions"
            path:"/trans/transactions"
            method:"GET"
            response:
                        [
                            {
                                "_id": "67188d6b1e9d0ba37c71ef23",
                                "user_id": "67188b941e9d0ba37c71ef1c",
                                "amount": 2000,
                                "type": "expense",
                                "category_id": {
                                    "_id": "67188d6b1e9d0ba37c71ef20",
                                    "name": "Food",
                                    "type": "expense",
                                    "__v": 0
                                },
                                "description": "To spending food",
                                "date": "2024-10-23T05:33:47.509Z",
                                "createdAt": "2024-10-23T05:45:15.470Z",
                                "updatedAt": "2024-10-23T05:45:15.470Z",
                                "__v": 0
                            }
                        ]
    ### Update the existing transaction:
            url:"http://localhost:3000/trans/transaction/transactionId"
            path:"/trans/transaction/:transactionId"
            method:"PUT"

             Request:
                    {
                        "amount":2000,
                        "type":"expense",
                        "name":"Food",
                        "description":"To spending food"
                    }

             Response:

                    {
                        "message": "Updated Transaction Successfully"
                    }       

    ### Delete the existing transaction :
            url:"http://localhost:3000/trans/transaction/transactionId"
            path:"/trans/transaction/:transactionId"
            method:"DELETE"

            Response:
                    {
                        "message": "Transaction deleted successfully"
                    }

    ### Summary Details :
            url:"http://localhost:3000/trans/summary?startDate=2024-01-01&endDate=2024-12-31"
            path:"/trans/summary"
            method:"GET"

            Response :

                    {
                        "totalIncome": 210000,
                        "totalExpense": 102000,
                        "balance": 108000
                    }


                            


            

















    backend/
│
├── models/           # Mongoose schemas
├── routes/           # API routes
├── controllers/      # Business logic for routes         
├── .env              # Environment variables (like MongoDB URI)
├── index.js          # Main entry point  # Configurations (e.g., MongoDB connection)
└── package.json      # Project dependencies and scripts    
         
    
        