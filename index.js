const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

let requests = 0;

//Middleware verifica a existência do ID
function checkIdExists(req, res, next){
  let existentId = false;
  const { id } = req.params

  for(j = 0; j < projects.length; j++){
    if(projects[j].id == id){
      existentId = true;
    }
  }

  if(!existentId){
    return res.status(400).json({ error: 'ID is required' });
  }

  return next();
}

//Middleware verifica a quantidade de requisições feitas
server.use((req, res, next) =>{
  requests++;
  console.log(`As requisições forem feitas: ${requests}, vezes`);


  return next();
});

//Criar projeto
server.post('/projects', (req, res)=>{
  const { id } = req.body;  
  const { title } = req.body;
  const tasks = [];  

  projects.push({id, title, tasks});

  return res.json(projects);

});

//Listar todos projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Editar projeto com id passado por parametro
server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for(i = 0; i < projects.length; i++){
    if (id == projects[i].id){
      projects[i].title = title;
    }
  }

  return res.json(projects);
});

//Deletar o projeto com o id passado por parametro
server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;

  for (i = 0; i < projects.length; i++) {
    if (id == projects[i].id) {
      projects.splice(i, 1);
    }
  }

  return res.send();
});

//Criar task
server.post('/projects/:id/tasks', checkIdExists, (req,res) =>{
  const { id } = req.params;
  const { name } = req.body;

  for (i = 0; i < projects.length; i++) {
    if (id == projects[i].id) {
      projects[i].tasks.push(name);
    }
  }

  return res.json(projects);
});


server.listen(3000);