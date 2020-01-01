const jsonServer = require('json-server')
const middlewares = jsonServer.defaults()
const routes = jsonServer.router('./db.json')
const server  = jsonServer.create()

server.use(middlewares)
server.use(routes)
server.listen(9090)