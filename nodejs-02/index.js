const fs = require('fs');

fs.writeFile('demo1.txt', "My name is saurav sarkar.", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully file create");
    }
})
fs.appendFile('demo1.txt', "What is your name?", (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully file create");
    }
})
fs.readFile('demo1.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
})
fs.rename('demo1.txt','demo.txt', (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('successfully rename');
    }
})
// fs.unlink('demo.txt', (err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('successfully delete');
//     }
// })