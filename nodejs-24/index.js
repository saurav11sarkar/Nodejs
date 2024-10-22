import express from "express"
import chalk from "chalk";


const app = express();
app.use((req,res,next)=>{
    console.log(chalk.yellowBright('Hello world!'));
    next();
})

const port = 4000;
app.listen(port, ()=>{
    console.log(chalk.blueBright.underline(`http://127.0.0.1:${port}`));
});