const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.listen(9000, () => console.log("OK"))
app.get('/',(req,res)=>{
   res.send("Victoria");
})

const mysql = require('mysql2/promise')
const connection = mysql.createPool({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: ''
})

app.get('/',(req,res)=>{
   res.send("Vic");
})

const getAllPessoas = async () => {
   const [query] =await connection
   .execute ('Select * from teste_pessoa.pessoa');
   return query;
}

app.get('/pessoa', async (req,res)=>{
   const consulta = await getAllPessoas();
   return res.status(200).json(consulta);
})

app.get('/pessoa/:id', async (req,res)=>{
   const {id} = req.params;
   const [query] = await connection.execute('select * from Teste_Pessoa.Pessoa where id = ?', [id]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query); 
})

app.post('/pessoa', async (req,res)=>{
   const {nome, email} = req.body
   const [query]= await connection.execute('insert into Teste_Pessoa.Pessoa (nome,email) values(?,?)', [nome,email])
   return res.json(query)
})

app.get('/pessoa/busca/:nome', async (req,res)=>{
   const {nome} = req.params;
   const [query] = await connection.execute('select * from Teste_Pessoa.Pessoa where nome = ?', [nome]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query); 
})