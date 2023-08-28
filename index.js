console.log('subindo servidor com express')
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())

app.listen(8080, () => {
    console.log("Servidor Node ativo na porta 8080")
})

const lista = [
    {nome: "Pedro Henrique Matins Dagostini", telefone:"95874-8520", email: "pedro01dagostini@gmail.com"},
    {nome: "Luis Clauido Araujo", telefone:"92564-9984", email: "luis.claudio0@gmail.com"},
    {nome: "Cesar Augusto Ferreira", telefone:"98771-0258", email: "cesar.augusto@gmail.com"}
]

const filtroJwt = (request, response, next) => {
    console.log("entrou no filtro")
    let jwtOk = false
    let token = null
    const authorization = request.headers['authorization']
    console.log(authorization)

    if (authorization) {
        token = authorization.split(" ")[1]
        console.log(token)
    }

    if(token){
        jwt.verify(token, "ABC123", (err, payload) => {
            if(payload){
                next()
            } else {
                response.status(401).send("Token inválido")
            }
        })
    } else {
        return response.status(401).send("Falta informações de autorização")
    }

}

app.route("/login").get( (request, response) => {
    const payload = {user: "pedro", profile: "admin"}
    const token = jwt.sign(JSON.stringify(payload), "ABC123", {})
    const resposta = {usuario: "pedro", token}
    response.status(200).json(resposta)
})

app.route("/").get(filtroJwt, (request, response)=>{
    response.status(200).json(lista)
})

app.route("/").post(filtroJwt, (request, response)=>{
    lista.push(request.body)
    response.status(200).send("Contato cadastrado")
})