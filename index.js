
import  express  from "express";
import bodyParser from "body-parser";
import {dirname} from "path"
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000;
var userIsAuthorized = false;
app.use(bodyParser.urlencoded({extended: true}));
 
function passwordChek(req, res, next){
const password = req.body["pass"]
if(password=== "ILOVEPROGRAMMING"){
    userIsAuthorized = true;
}
next();
}

app.use(passwordChek)

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
})
app.post("/check", (req, res) => {
    if(userIsAuthorized){
        res.sendFile(__dirname + "/public/secret.html")
        userIsAuthorized = false
    }else{
        res.sendFile(__dirname + "/public/index.html")
    }
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});