import express, { response } from 'express' //importa o express
import { PrismaClient } from '@prisma/client'
// precisa no package json colocar o "type" para funcionar a importação do express

const prisma = new PrismaClient()
const app = express() //passa o express como uma função para uma variavel, para acessar suas funcionalidades
app.use(express.json()) //faz com que o express passe a usar json

//Criar Usuario
app.post('/usuarios', async (req, res) => {
  console.log(req)

  await prisma.user.create({ //criar usuario no DB
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })

  res.status(201).send(req.body) //padrão de colocar se a requisição deu certo
})

//Puxar lista de usuarios
app.get('/usuarios', async (req, res) => { //requisição e respostas
  let users = []

  if(req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    const users = await prisma.user.findMany()
  }

  res.status(200).json(users) //resposta para o front
}) 

//Editar Usuario
app.put('/usuarios/:id', async (req, res) => {

  await prisma.user.update({ //atualiza usuario no DB
     //para saber quem vai atualizar
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })
  res.status(201).send(req.body) //padrão de colocar se a requisição deu certo
})


//Deletar
app.delete('/usuarios/:id', async (req, res) => {

  await prisma.user.delete({ //deleta usuario no DB
     //para saber quem vai atualizar
    where: {
      id: req.params.id
    }
  })
  res.status(201).json({message: 'Usuario deletado com sucesso'}) //padrão de colocar se a requisição deu certo
})

app.listen(3000)



/*
Criar usuario
Listar todos os usuarios
Editar um usuário
Deletar um usuario
*/

/*
BANCO DE DADOS
usuario: matheus
senha: BKZ1i2ZY5gkuRyiU
*/