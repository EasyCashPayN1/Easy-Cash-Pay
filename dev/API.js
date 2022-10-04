const express = require('express')
const app = express()

app.get('/EasyCashApp', function (req, res) {
  res.send('Here we will show our blockchain.')
});

app.listen(3000, function(){
    console.log("Server is runing on port number 30000")

});
