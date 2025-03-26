const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const redditData = require('./data.json')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.render('reddit.ejs')
})
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const data = redditData[subreddit]
    
    res.render('reddit.ejs',{...data})
})





app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})