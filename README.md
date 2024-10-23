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

            Request :

                    

















    backend/
│
├── models/           # Mongoose schemas
├── routes/           # API routes
├── controllers/      # Business logic for routes         
├── .env              # Environment variables (like MongoDB URI)
├── index.js          # Main entry point  # Configurations (e.g., MongoDB connection)
└── package.json      # Project dependencies and scripts    
         
    
        