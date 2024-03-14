const express = require('express')
const app = express()

const hostname = 'localhost'
const port = 8017
app.get('/', function (req,res) {
  res.send('Hello world 123')
})

app.listen(port, hostname, () => {
  console.log(`Hello , Iam running sever at http://${hostname}:${port}`);
})