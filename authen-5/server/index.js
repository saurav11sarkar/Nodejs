const app = require("./app");
const { connectDB } = require("./configs/database.config");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`);
    connectDB();
})