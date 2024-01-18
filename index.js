
const express = require('express');
const path = require ("path");
const app = express();


// app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")



// home page
app.get('/home_page', function(req, res){
    res.render("home_page")
});

//Contact Us page
app.get("/contact_us", function(req, res){
    res.render("contact_us")
})

//Our Service page
app.get('/our_service', function(req, res){
    res.render("our_service")
});

const port = 3000;

const message = (req, res, next) =>{
    console.log("this is the middleware running")
    next()
}

app.use(message)


// Custom middleware to verify the time of the request
const verifyTime = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hourOfDay = date.getHours();
  
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 24) {
      // If the request is within working hours, continue to the next middleware
      next();
    } else {
      // If the request is outside working hours, return an error response
      res.status(403).send('Access Forbidden: Outside working hours');
    }
  };
  
  // Use the custom middleware for all routes
  app.use(verifyTime);


// Serve the Our Services page
// app.get('/services', (req, res) => {
//   res.send('Explore Our Services Here');
// });

// Serve the Contact Us page
// app.get('/contact', (req, res) => {
//   res.send('this is the contact page');
// });

app.listen(port, () => {
  console.log(`Web application is running at http://localhost:${port}`);
});
