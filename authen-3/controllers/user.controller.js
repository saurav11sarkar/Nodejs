const rootroute = (req,res)=>{
    res.status(200).render('index.ejs')
}

const getRegister = (req,res)=>{
    res.status(200).render('register.ejs')
}

module.exports = {rootroute, getRegister};