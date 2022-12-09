const express=require('express');
const port=8000;
const bodyParser=require('body-parser');
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const passport=require('passport');
const LocalStrategy=require('./config/passport-local-strategy');
const expressSession=require('express-session');
const mongoStore=require('connect-mongo');

const app=express();

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);



//ejs layout
app.use(expressLayout);

app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({extended:false}));

app.use(expressSession({
    name:'user_id',
    secret:'AnyValue',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    store:mongoStore.create({
        mongoUrl:'mongodb://localhost/career-camp-db',
        autoRemove:false
    },function(err){
        console.log(err || "connect-mongo setup ok");
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//handling urls 
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Error in server run :: ",err);
        return;
    }
    console.log(`server is up on ${port} port`);
})