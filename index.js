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

app.route("/login").get((request, response) => {
    const token = jwt.sign("pedro", "ABCD12345", {})
    const resposta = {usuario: "pedro", token}
    response.status(200).json(resposta)
})

app.route("/").get((request, response)=>{
    response.status(200).json(lista)
})

app.route("/").post((request, response)=>{
    lista.push(request.body)
    response.status(200).send("Contato cadastrado")
})