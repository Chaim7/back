const express = require('express')
const jsonServer = require('json-server')
const middlewares = jsonServer.defaults()
const routes = jsonServer.router('./db.json')
const bcryptjs= require('bcryptjs')
const server = express()
const Axios = require('axios')

server.use(express.json())
server.use(express.urlencoded({extended:true}))

Axios.defaults.baseURL='http://localhost:9090'

server.post('/sign-up',async (req,res)=>{
const {data} = await Axios.post('/users',{
    ...req.body,
    password:await bcryptjs.hash(req.body.password,10)
})
const response = await Axios.get('/users',{
    params:{
        username:req.body.username
    }
})
if(response.data.length>0){
    res.send({
        code:-1,
        msg:"账号已注册"
    })
    return
}
if(data.length>0){
    res.send({
        code:0,
        msg:"注册成功",
        data
    })
}

})
server.post('/sign-in',async (req,res)=>{
    const {username,password} = req.body
    const {data} = await Axios.get('/users',{
        params:{
            username}
    })
    if(data.length<=0){
        res.send({
            code:-1,
            msg:"账号密码错误"
        })
        return
    }
     
    const  user = data[0]
    const isok = await bcryptjs.compare(password,user.password)

    if(isok){
        res.send({
            code:0,
            msg:'登录成功'
        }) 
    }else{
        res.send({
            code:-1,
            msg:'密码错误'
        })
    }
})




server.use(middlewares)
server.use(routes)

server.listen(9090)