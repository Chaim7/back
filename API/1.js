const jsonServer = require('json-server')
const middlewares = jsonServer.defaults()
const routes = jsonServer.router('./db.json')
const express = require('express')
const server = express()
const Axios = require('axios')
const bcryptjs = require('bcryptjs')
Axios.defaults.baseURL='http://localhost:9090'

server.use(express.json())
server.use(express.urlencoded({extended:true}))
// const {data} = Axios.post('/sing-login',req.body)
server.post('/sign-up',async(req,res) => {
   const {data} = await Axios.post('/users',{...req.body,
password:await bcryptjs.hash(req.body.password,10)})
   const response =await Axios.get('/users',{params:{username:req.body.username}})
   
   if(response.data.length>0){
       res.send({
           code:-1,
           msg:'用户名已经被注册过了'
       })
       return
   }   res.send({
       code:0,
       msg:'注册成功',
       data
        })
})
server.use('/sign-in',async (req,res)=>{
    const {username,password} = req.body
    const {data} = await Axios.get('/users',{
        params:{
            username
        }
    })
    console.log(data)
    if(data.length<=0){
        res.send({
            code:-1,
            msg:"账号或密码错误"
        })
        return
    }
    const user=data[0]
    const isok=await bcryptjs.compare(password,user.password)
    if(isok){
        res.send({
            code:-1,
            msg:'登录成功'
        }) } else {
            res.send({
                code:-1,
                msg:'登录失败'
            })
        }
    
})




server.use(routes)
server.use(middlewares)

server.listen(9090)

