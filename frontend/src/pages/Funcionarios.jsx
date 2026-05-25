import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./styles.css";

export default function Funcionarios(){

const [funcionarios,setFuncionarios]=useState([]);

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

const [nome,setNome]=useState("");
const [idade,setIdade]=useState("");

const [cargo,setCargo]=useState("");

const [cpf,setCpf]=useState("");

const [telefone,setTelefone]=useState("");

const [email,setEmail]=useState("");

const [editando,setEditando]=useState(null);

const [erro,setErro]=useState("");

const [sucesso,setSucesso]=useState("");

const [busca,setBusca]=useState("");

useEffect(()=>{

carregar();

},[]);

async function carregar(){

try{

const response=
await api.get("/funcionarios/");

setFuncionarios(
response.data
);

}

catch{

setErro(
"Erro ao carregar"
);

}

}

function limpar(){

setUsername("");

setPassword("");

setNome("");

setIdade("");

setCargo("");

setCpf("");

setTelefone("");

setEmail("");

setEditando(null);

}

function validar(){

setErro("");

if(!username)
return setErro("Usuário obrigatório");

if(!password&&!editando)
return setErro("Senha obrigatória");

if(!nome)
return setErro("Nome obrigatório");

if(!idade)
return setErro("Idade obrigatória");

if(!cargo)
return setErro("Cargo obrigatório");

if(!cpf)
return setErro("CPF obrigatório");

if(!telefone)
return setErro("Telefone obrigatório");

if(!email)
return setErro("Email obrigatório");

return true;

}

async function salvar(){

if(validar()!==true)
return;

const dados={

username,

password,

nome,

idade:Number(idade),

cargo,

cpf,

telefone,

email

};

try{

if(editando){

await api.put(
`/funcionarios/${editando}/`,
dados
);

setSucesso(
"Funcionário atualizado"
);

}

else{

await api.post(
"/funcionarios/",
dados
);

setSucesso(
"Funcionário cadastrado"
);

}

limpar();

carregar();

}

catch(error){

console.log(
error.response?.data
);

setErro(

JSON.stringify(
error.response?.data
)

);

}

}

function editar(f){

setEditando(f.id);

setNome(f.nome);

setIdade(f.idade);

setCargo(f.cargo);

setCpf(f.cpf);

setTelefone(f.telefone);

setEmail(f.email);

}

async function excluir(id){

if(
!confirm(
"Excluir?"
)
)
return;

await api.delete(
`/funcionarios/${id}/`
);

carregar();

}

const filtrados=

funcionarios.filter(

f=>

f.nome
?.toLowerCase()
.includes(
busca.toLowerCase()
)

);

return(

<>

<Sidebar/>

<div className="clientes-container">

<div className="topo">

<h1>

Funcionários

</h1>

<input
className="input-busca"
placeholder="Buscar"
value={busca}
onChange={
e=>
setBusca(
e.target.value
)
}
/>

</div>

{erro&&
<div className="erro">
{erro}
</div>
}

{sucesso&&
<div className="sucesso">
{sucesso}
</div>
}

<div className="card-form">

<h2>

{

editando

?

"Editar"

:

"Novo Funcionário"

}

</h2>

<div className="grid-form">

<input
placeholder="Usuário"
value={username}
onChange={
e=>
setUsername(
e.target.value
)
}
/>

<input
type="password"
placeholder="Senha"
value={password}
onChange={
e=>
setPassword(
e.target.value
)
}
/>

<input
placeholder="Nome"
value={nome}
onChange={
e=>
setNome(
e.target.value
)
}
/>

<input
type="number"
placeholder="Idade"
value={idade}
onChange={
e=>
setIdade(
e.target.value
)
}
/>

<select
value={cargo}
onChange={
e=>
setCargo(
e.target.value
)
}
>

<option value="">

Cargo

</option>

<option value="gerente">

Gerente

</option>

<option value="vendedor">

Vendedor

</option>

<option value="caixa">

Caixa

</option>

</select>

<input
placeholder="CPF"
value={cpf}
onChange={
e=>
setCpf(
e.target.value
)
}
/>

<input
placeholder="Telefone"
value={telefone}
onChange={
e=>
setTelefone(
e.target.value
)
}
/>

<input
placeholder="Email"
value={email}
onChange={
e=>
setEmail(
e.target.value
)
}
/>

</div>

<div className="acoes-form">

<button
className="btn-salvar"
onClick={salvar}
>

Salvar

</button>

<button
className="btn-limpar"
onClick={limpar}
>

Limpar

</button>

</div>

</div>

<div className="card-tabela">

<table>

<thead>

<tr>

<th>Nome</th>

<th>Cargo</th>

<th>Email</th>

<th>Ações</th>

</tr>

</thead>

<tbody>

{

filtrados.map(

f=>

<tr key={f.id}>

<td>

{f.nome}

</td>

<td>

{f.cargo}

</td>

<td>

{f.email}

</td>

<td>

<button
className="btn-editar"
onClick={()=>
editar(f)
}
>

Editar

</button>

<button
className="btn-excluir"
onClick={()=>
excluir(f.id)
}
>

Excluir

</button>

</td>

</tr>

)

}

</tbody>

</table>

</div>

</div>

</>

);

}