const app = require("./app");
const { connectingDB } = require("./configs/connect.config");
const config = require("./configs/user.config");

const PORT = config.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running http://127.0.0.1:${PORT}`);
    connectingDB();
})