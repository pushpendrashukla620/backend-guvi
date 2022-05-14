require('dotenv').config();
const colors=require('colors')
const express=require('express');
const cors=require("cors");
const db = require('./config/db');
const isAuthenticated = require('./config/isAutheniticated.config');
const router = require('./Router');
const morgan=require("morgan");
const bd=require("body-parser");




const app=express();

app.use(morgan('dev'));
app.use(bd.urlencoded({extended : false}));
app.use(bd.json());
app.use('/api' , router);
app.use(cors());


const port=process.env.PORT || 8080; 

app.get('/home' , isAuthenticated , (req,res) =>{
    res.json({
        message : 'Protected home route .' ,
        user:  req.user
    });
})
app.get('/' ,(req,res) =>{
    res.send('Hello Innitial App');
});
app.listen(port,()=>console.log(`server is listening on port ${`${port}`.bold.yellow}...`));