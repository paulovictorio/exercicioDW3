const express = require('express')
const app = express()
const port = 4000

app.use(express.json())

var alunos = [
    { 
      ra:123, nome:'Diogo', turma:'ADS',
      habilidades:['Javascript', 'ReactJS', 'Redux'],
    },
    {
      ra:231, nome:'Leandro', turma:'DSM',
      habilidades:['VueJS', 'Ruby on Rails', 'Node'],
    }
]

app.post('/alunos', (req, res) => {
    alunos.push(req.body);
    res.status(201).send(`Aluno ${req.body.nome} adicionado com sucesso`);
});

app.post('/curso', (req, res) => {
    const aluno = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    if (!aluno) {
        res.status(404).send('Aluno não encontrado');
    }
    aluno.habilidades.push(req.body.curso);
    res.status(201).send(`Curso ${req.body.curso} adicionado!`);
});

app.put('/', (req, res) => {
    const index = alunos.findIndex(aluno => aluno.ra == parseInt(req.query.ra));
    if (index !== -1){
    alunos[index] = {ra: req.query.ra, nome: req.body.nome, turma: req.body.turma}
    res.send(JSON.stringify(alunos))
    } else {
        res.send('RA não encontrado')
    }
})

app.put('/curso', (req, res) => { 
    const aluno = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    if (!aluno) {
        res.status(404).send('Aluno não encontrado');
    }else{
        aluno.habilidades.push(req.body.curso);
        res.status(200).send('Curso alterado com sucesso');}
});

app.delete('/', (req, res) => {
    const index = alunos.findIndex(x => x.id == req.query.id);
    if (index !== -1){
        alunos.splice(index, 1);
        res.send(`Aluno Deletado`)
    } else {
        res.send(`Aluno não encontrado`)
    }
})

app.delete('/curso', (req, res) => {
    const aluno = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    if (!aluno) {
        res.status(404).send('Aluno não encontrado');
    }
    const index = aluno.habilidades.findIndex(habilidade => habilidade === req.body.curso);
    if (index !== -1) {
        aluno.habilidades.splice(index, 1);
        res.status(200).send('Curso removido com sucesso');
    } else {
        res.status(404).send('Curso não encontrado para este aluno');
    }
    
});

app.get('/', (req, res) => {
    const aluno = alunos.map(aluno => ({ra: aluno.ra, nome: aluno.nome, turma: aluno.turma}));
    res.json(aluno)
})

app.get('/ra', (req, res) => {
    const aluno = alunos.find(aluno => aluno.ra === parseInt(req.query.ra));
    const result = alunos.map(aluno => ({nome: aluno.nome, turma: aluno.turma, curso: aluno.curso}))
    if (!aluno){
        res.status(404).send('Aluno não encontrado');
    } else {
        res.json(result)
    }

})

app.listen(port, () => {
    console.log(`Exemplo rodando na porta ${port}`)
})
 

