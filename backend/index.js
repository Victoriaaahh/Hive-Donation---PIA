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
   password: '',
   database: "bddhd"
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

app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
   
   
const [query] = await connection.execute(
    'UPDATE Teste_Pessoa.Pessoa SET nome = ?, email = ? WHERE id = ?', [nome, email, id])
    return res.send(query)
});
   
app.delete('/pessoa', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from Teste_Pessoa.Pessoa WHERE id = ?',
    [id])
    return res.send(query)
});

/* doador */

const getAllDoadores = async () => {
   const [query] =await connection
   .execute ('Select * from bdd-p.doador');
   return query;
}

app.get('/doador', async (req,res)=>{
   const consulta = await getAllDoadores();
   return res.status(200).json(consulta);
})

app.get('/doador/:id', async (req,res)=>{
   const {id} = req.params;
   const [query] = await connection.execute('select * from bdd-p.doador where id = ?', [id]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.post('/doador', async (req,res)=>{
   const {nome, email, cpf, endereco, telefone, data_nasc, senha, login, uf, cep } = req.body
   const [query]= await connection.execute('insert into bdd-p.doador (nome, email, cpf, endereco, telefone, data_nasc, senha, login, uf, cep ) values(?,?,?,?,?,?,?,?,?,?)', [nome, email, cpf, endereco, telefone, data_nasc, senha, login, uf, cep ])
   return res.json(query)
})

app.get('/doador/busca/:nome', async (req,res)=>{
   const {nome} = req.params;
   const [query] = await connection.execute('select * from bdd-p.doador where nome = ?', [nome]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.put('/doador/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, endereco, telefone, data_nasc, senha, login, uf, cep } = req.body;
   
   
const [query] = await connection.execute(
    'UPDATE bdd-p.doador SET nome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, data_nasc = ?, senha = ?, login = ?, uf = ?, cep = ? WHERE id = ?', [nome, email, cpf, endereco, telefone, data_nasc, senha, login, uf, id, cep])
    return res.send(query)
});
   
app.delete('/doador', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from bdd-p.doador WHERE id = ?',
    [id])
    return res.send(query)
});

/* doação */

const getAllDoacoes = async () => {
   const [query] =await connection
   .execute ('Select * from bdd-p.doacao');
   return query;
}

app.get('/doacao', async (req,res)=>{
   const consulta = await getAllDoacoes();
   return res.status(200).json(consulta);
})

app.get('/doacao/:id', async (req,res)=>{
   const {id} = req.params;
   const [query] = await connection.execute('select * from bdd-p.doacao where id = ?', [id]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.post('/doacao', async (req,res)=>{
   const {doador_id, campanha_id, date, pagamento, valor, status} = req.body
   const [query]= await connection.execute('insert into bdd-p.doacao (doador_id, campanha_id, date, pagamento, valor, status) values(?,?,?,?,?,?)', [doador_id, campanha_id, date, pagamento, valor, status])
   return res.json(query)
})

app.get('/doacao/busca/:valor', async (req,res)=>{
   const {valor} = req.params;
   const [query] = await connection.execute('select * from bdd-p.doacao where valor = ?', [valor]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.put('/doacao/:id', async (req, res) => {
    const { id } = req.params;
    const { doador_id, campanha_id, date, pagamento, valor, status} = req.body;
   
const [query] = await connection.execute(
    'UPDATE bdd-p.doacao SET doador_id = ?, campanha_id = ?, date = ?, pagamento = ?, valor = ?, status = ? WHERE id = ?', [doador_id, campanha_id, date, pagamento, valor, status, id])
    return res.send(query)
});
   
app.delete('/doacao', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from bdd-p.doacao WHERE id = ?',
    [id])
    return res.send(query)
});

/* campanha */
const getAllCampanhas = async () => {
   const [query] = await connection
   .execute ('Select * from campanha');
   return query;
}

app.get('/campanhas', async (req, res) => {
   try {
     const [rows] = await connection.query('SELECT * FROM campanha');
     res.json(rows);
   } catch (error) {
     console.error('Error fetching campaigns:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 });

app.get('/campanha/:id', async (req,res)=>{
   const {id} = req.params;
   const [query] = await connection.execute('select * from bdd-p.campanha where id = ?', [id]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.post('/campanha', async (req,res)=>{
   const {nome, titulo, meta, descricao, data_inicio, data_termino, url_video, url_img, campanhacol, usuario_id, id} = req.body
   const [query]= await connection.execute('insert into bdd-p.campanha (nome, titulo, meta, descricao, data_inicio, data_termino, url_video, url_img, campanhacol, usuario_id) values(?,?,?,?,?,?,?,?,?,?)', [nome, titulo, meta, descricao, data_inicio, data_termino, url_video, url_img, campanhacol, usuario_id, id])
   return res.json(query)
})

app.get('/campanha/busca/:nome', async (req,res)=>{
   const {nome} = req.params;
   const [query] = await connection.execute('select * from bdd-p.campanha where nome = ?', [nome]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.put('/campanha/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, titulo, meta, descricao, data_inicio, data_termino, url_video, url_img, campanhacol, usuario_id } = req.body;
   
   
const [query] = await connection.execute(
    'UPDATE bdd-p.campanha SET nome = ?, titulo = ?, meta = ?, descricao = ?, data_inicio = ?, data_termino = ?, url_video = ?, url_img = ?, campanhacol = ?, usuario_id = ? WHERE id = ?', [nome, titulo, meta, descricao, data_inicio, data_termino, url_video, url_img, campanhacol, usuario_id, id])
    return res.send(query)
});
   
app.delete('/campanha', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from bdd-p.campanha WHERE id = ?',
    [id])
    return res.send(query)
});

/* usuario */
const getAllUsuarios = async () => {
   const [query] =await connection
   .execute ('Select * from bdd-p.usuario');
   return query;
}

app.get('/usuario', async (req,res)=>{
   const consulta = await getAllUsuarios();
   return res.status(200).json(consulta);
})

app.get('/usuario/:id', async (req,res)=>{
   const {id} = req.params;
   const [query] = await connection.execute('select * from bdd-p.usuario where id = ?', [id]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.post('/usuario', async (req,res)=>{
   const {nome, senha, cpf} = req.body
   const [query]= await connection.execute('insert into bdd-p.usuario (nome,senha, cpf) values(?,?,?)', [nome, senha, cpf])
   return res.json(query)
})

app.get('/usuario/busca/:nome', async (req,res)=>{
   const {nome} = req.params;
   const [query] = await connection.execute('select * from bdd-p.usuario where nome = ?', [nome]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, senha, cpf } = req.body;
   
   
const [query] = await connection.execute(
    'UPDATE bdd-p.usuario SET nome = ?, senha = ?, cpf = ? WHERE id = ?', [nome, senha, cpf, id])
    return res.send(query)
});
   
app.delete('/usuario', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from bdd-p.usuario WHERE id = ?',
    [id])
    return res.send(query)
});

/* config */
const getAllConfiguracoes = async () => {
   const [query] =await connection
   .execute ('Select * from bdd-p.configuracoes');
   return query;
}

app.get('/configuracoes', async (req,res)=>{
   const consulta = await getAllConfiguracoes();
   return res.status(200).json(consulta);
})

app.get('/configuracoes/:nome', async (req,res)=>{
   const {nome} = req.params;
   const [query] = await connection.execute('select * from bdd-p.configuracoes where id = ?', [nome]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.post('/configuracoes', async (req,res)=>{
   const {logo, instagram, menu} = req.body
   const [query]= await connection.execute('insert into bdd-p.configuracoes ( logo, instagram, menu) values(?,?,?)', [logo, instagram, menu])
   return res.json(query)
})

app.get('/configuracoes/busca/:instagram', async (req,res)=>{
   const {instagram} = req.params;
   const [query] = await connection.execute('select * from bdd-p.configuracoes where instagram = ?', [instagram]);
   if(query.length === 0) return res.status(400).json({mensagem: 'Não encontrado. '})
   return res.status(200).json(query);
})

app.put('/configuracoes/:no,e', async (req, res) => {
    const { nome } = req.params;
    const { logo, instagram, menu } = req.body;
   
   
const [query] = await connection.execute(
    'UPDATE bdd-p.configuracoes SET logo = ?, instagram = ?, mnu = ? WHERE nome = ?', [logo, instagram, menu, nome])
    return res.send(query)
});
   
app.delete('/configuracoes', async (req, res) => {
    const { nome } = req.params;
    const [query] = await connection.execute(
    'DELETE from bdd-p.configuracoes WHERE nome = ?',
    [nome])
    return res.send(query)
});
