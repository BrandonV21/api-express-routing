const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

const data = require("./data");
const res = require("express/lib/response");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// return all users
app.get("/users", (req, res) => {
  res.json({users:data.users})
})

// users/2
app.get("/users/:userId" , (req, res) => {
  console.log(req.params)
  //Gets the userId parameter, parseInt is a function that coverts a string to a number
  const userId = parseInt(req.params.userId)
  //Find the user with that ID        find is a function that goes through the array of each object of the user to find if the userId matches
  const user = data.users.find(user => user.id === userId)
  // Send the user data back to the client
  res.send({user: user})
})

//POST /users --adds a new user
app.post("/users", (req, res) => {
  //We can get the json data from the post body using req.body
  console.log("in post USERS, body is:", req.body)

  //Create the new user
  const newUser = {
    id: data.users.length+1,
    //Get the email property from the post body
    email: req.body.email
  }

  data.users.push(newUser)
  res.json({user:newUser})
})

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
