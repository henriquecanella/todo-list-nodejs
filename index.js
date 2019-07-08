const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

//Listar todos projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Criar projeto
server.post('/projects', (req, res)=>{
  const { id } = req.body;  
  const { title } = req.body;
  const tasks = [];  

  projects.push({id, title, tasks});

  return res.json(projects);

});

server.listen(3000);