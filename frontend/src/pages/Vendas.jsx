import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./styles.css";

export default function Vendas() {

  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [cliente, setCliente] = useState("");
  const [funcionario, setFuncionario] = useState("");

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [itens, setItens] = useState([]);

  const [editando, setEditando] = useState(null);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // =========================
  // CARREGAR
  // =========================

  async function carregar() {

    try {

      const [
        c,
        f,
        p,
        v
      ] = await Promise.all([

        api.get("/clientes/"),
        api.get("/funcionarios/"),
        api.get("/produtos/"),
        api.get("/vendas/")

      ]);

      setClientes(c.data);
      setFuncionarios(f.data);
      setProdutos(p.data);
      setVendas(v.data.map(venda=>({

...venda,

itens:

venda.itens.map(i=>{

const prod=

p.data.find(
x=>x.id===i.produto
);

return{

...i,

preco:
prod?.preco || 0,

subtotal:

(
Number(
prod?.preco || 0
)

*

Number(
i.quantidade
)

)

};

})

}))
);

    }
    catch {

      setErro("Erro ao carregar dados");

    }

  }

  useEffect(() => {

    carregar();

  }, []);

  // =========================
  // LIMPAR
  // =========================

  function limpar() {

    setCliente("");
    setFuncionario("");
    setProduto("");
    setQuantidade(1);
    setItens([]);
    setEditando(null);

  }

  // =========================
  // ADICIONAR ITEM
  // =========================

  function adicionarCarrinho(){

    setErro("");

    if(!produto)
    return setErro(
    "Selecione produto"
    );

    if(quantidade<=0)
    return setErro(
    "Quantidade inválida"
    );

    const prod=
    produtos.find(
    p=>p.id==produto
    );

    if(!prod)
    return;

    if(
    Number(quantidade)
    >
    Number(prod.estoque)
    ){

    return setErro(

    `Estoque disponível: ${prod.estoque}`

    );

    }

    const subtotal=

    Number(prod.preco)
    *
    Number(quantidade);

    setItens([

    ...itens,

    {

    produto: prod.id,

    nome: prod.nome,

    quantidade: Number(quantidade),

    preco: Number(prod.preco),

    subtotal:
    Number(prod.preco)
    *
    Number(quantidade)

    }

    ]);

    setQuantidade(1);

    setProduto("");

    }

  // =========================
  // REMOVER ITEM
  // =========================

  function removerItem(index) {

    const novaLista = itens.filter(
      (_, i) => i !== index
    );

    setItens(novaLista);

  }

  // =========================
  // TOTAL
  // =========================

  const total = itens.reduce(

    (acc, item) =>

      acc + Number(item.subtotal),

    0

  );

  // =========================
  // SALVAR
  // =========================

  async function finalizarVenda() {

    setErro("");
    setSucesso("");

    if (!cliente)
      return setErro("Selecione cliente");

    if (!funcionario)
      return setErro("Selecione funcionário");

    if (itens.length === 0)
      return setErro("Carrinho vazio");

    try {

      const dados = {

        cliente,
        funcionario,

        itens: itens.map(i => ({

          produto: i.produto,
          quantidade: Number(i.quantidade),
          preco: Number(i.subtotal)

        }))

      };

      if (editando) {

        await api.put(
          `/vendas/${editando}/`,
          dados
        );

        setSucesso("Venda atualizada");

      }
      else {

        await api.post(
          "/vendas/",
          dados
        );

        setSucesso("Venda realizada");

      }

      limpar();

      carregar();

    }
    catch (e) {

      console.log(
        e.response?.data
      );

      setErro(
        JSON.stringify(
          e.response?.data
        )
      );

    }

  }

  // =========================
  // EDITAR
  // =========================

  function editar(v) {

    setEditando(v.id);

    setCliente(v.cliente);

    setFuncionario(v.funcionario);

    const itensFormatados = v.itens.map(item => ({
      produto: item.produto,
      nome: item.produto_nome,
      quantidade: Number(item.quantidade),

      // ✔ preço unitário direto do backend
      preco: Number(item.preco),

      // ✔ subtotal correto (caso não venha do backend)
      subtotal: Number(item.preco) * Number(item.quantidade)
    }));

    setItens(itensFormatados);

  }

  // =========================
  // EXCLUIR
  // =========================

  async function excluir(id) {

    if (!confirm("Deseja excluir a venda?"))
      return;

    try {

      await api.delete(
        `/vendas/${id}/`
      );

      carregar();

    }
    catch {

      setErro(
        "Erro ao excluir venda"
      );

    }

  }
  

  return (

    <>

      <Sidebar />

      <div className="clientes-container">

        <div className="topo">

          <h1>Vendas</h1>

        </div>

        {erro && (
          <div className="erro">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="sucesso">
            {sucesso}
          </div>
        )}

        <div className="vendas-grid">

          {/* FORM */}

          <div className="card-form">

            <h2>
              {editando
                ? "Editar Venda"
                : "Nova Venda"}
            </h2>

            {/* CLIENTE */}

            <select
              value={cliente}
              onChange={(e) =>
                setCliente(e.target.value)
              }
            >

              <option value="">
                Selecione Cliente
              </option>

              {clientes.map(c => (

                <option
                  key={c.id}
                  value={c.id}
                >

                  {c.nome}

                </option>

              ))}

            </select>

            {/* FUNCIONARIO */}

            <select
              value={funcionario}
              onChange={(e) =>
                setFuncionario(
                  e.target.value
                )
              }
            >

              <option value="">
                Selecione Funcionário
              </option>

              {funcionarios.map(f => (

                <option
                  key={f.id}
                  value={f.id}
                >

                  {f.nome}

                </option>

              ))}

            </select>

            {/* PRODUTOS */}

            <div className="grid-form">

              <select
                value={produto}
                onChange={(e) =>
                  setProduto(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Produto
                </option>

                {produtos.map(p => (

                  <option
                    key={p.id}
                    value={p.id}
                  >

                    {p.nome}

                  </option>

                ))}

              </select>

              <input
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(
                    e.target.value
                  )
                }
              />

              <button
                className="btn-salvar"
                onClick={
                  adicionarCarrinho
                }
              >

                Adicionar

              </button>

            </div>

            {/* ITENS */}

            <div className="lista-itens">

              {itens.map((i, index) => (

                <div
                  key={index}
                  className="item-venda"
                >

                  <div>

                    <h3>
                      {i.nome}
                    </h3>

                    <p>
                      Quantidade:
                      {" "}
                      {i.quantidade}
                    </p>

                    <p>
                      Preço Unitário:
                      {" "}
                      R$ {Number(i.preco).toFixed(2)}
                    </p>

                    <p>

                      Subtotal:
                      {" "}

                      R$
                      {" "}

                      {Number(i.subtotal).toFixed(2)}

                    </p>

                  </div>

                  <button
                    className="btn-excluir"
                    onClick={() =>
                      removerItem(index)
                    }
                  >

                    Remover

                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* TOTAL */}

          <div className="card-tabela">

            <h2>
              Carrinho
            </h2>

            <h1>

              R$
              {" "}

              {total.toFixed(2)}

            </h1>

            <button
              className="btn-salvar"
              onClick={
                finalizarVenda
              }
            >

              {editando
                ? "Atualizar Venda"
                : "Finalizar Venda"}

            </button>

            {editando && (

              <button
                className="btn-limpar"
                onClick={limpar}
              >

                Cancelar

              </button>

            )}

          </div>

        </div>

        {/* HISTORICO */}

        <div className="card-tabela">

          <h2>
            Histórico de Vendas
          </h2>

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Cliente</th>
                <th>Funcionário</th>
                <th>Total</th>
                <th>Data</th>
                <th>Ações</th>

              </tr>

            </thead>

            <tbody>

              {vendas.map(v => (

                <tr key={v.id}>

                  <td>
                    {v.id}
                  </td>

                  <td>
                    {v.cliente_nome}
                  </td>

                  <td>
                    {v.funcionario_nome}
                  </td>

                  <td>

                    R$
                    {" "}

                    {Number(v.total).toFixed(2)}

                  </td>

                  <td>

                   {
                      new Date(v.data_venda).toLocaleDateString("pt-BR")
                    }

                  </td>

                  <td>

                    <button
                      className="btn-editar"
                      onClick={() =>
                        editar(v)
                      }
                    >

                      Editar

                    </button>

                    <button
                      className="btn-excluir"
                      onClick={() =>
                        excluir(v.id)
                      }
                    >

                      Excluir

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}