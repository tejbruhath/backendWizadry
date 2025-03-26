const express = require ('express');
const app = express()
const port = 3000
const html = `
<h1>Hello,World!</h1>
<p>Welcome to my first express app!</p>
<img src="./Un;titled.jpeg" alt="Default">
<br>
<a href="/heroes">Heroes</a>
`
const path = require('path')
const redditData = require('./routes.json')
console.log(redditData)

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
//You can only send one res

// app.use((req,res)=>{
//     console.log(`New request received at ${Date.now()}`)
//     //res.send(html)
// })
//routes are matched in the order they are defined(very Important)
const date = new Date()
const hour = date.getHours()
const minute = date.getMinutes()

const formattedHour = hour < 10 ? `0${hour}`: hour
const formattedMinute = minute < 10 ? `0${{minute}}`: minute
const time = `${formattedHour}:${formattedMinute}`

app.get('/',(req,res)=>{  
    console.log(`New request received at ${Date.now()}`)
    res.render('home.ejs',{time,time})//check if its optmial to use global time variable
})
app.post('/',(req,res)=>{
    res.send(`You made a POST request`)
})
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const [data] = redditData.subreddit
    res.send(`<h1>Welcome to the ${subreddit} subreddit!</h1>
        <p>${data.description}</p>`)
})
//queries
app.get('/r/:subreddit/search',(req,res)=>{
    const {subreddit} = req.params
    const {q} = req.query
    res.send(`<h1>Showing results for ${q} in ${subreddit} subreddit!</h1>`)
})
app.get('/r/:subreddit/:postId',(req,res)=>{
    const {subreddit,postId} = req.params
    res.send(`<h1>Viewing post ID: ${postId} on ${subreddit}!`)
})
app.get('/heroes',(req,res)=>{
    res.send(`Heroes and villians have both 
       gone through pain and suffering.
       The only difference is that heroes
       use their pain to help others, while
       villians are used by their pain.`)
})



app.get('*',(req,res)=>{//This is a catch all route,only to be used when no other route is found

    res.send(`Uh-oh! Page not found`)
})

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})