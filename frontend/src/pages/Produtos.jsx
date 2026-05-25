import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./styles.css"; //


export default function Produtos() {

  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  const [editando, setEditando] = useState(null);

  const [busca, setBusca] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // =========================
  // CARREGAR
  // =========================
  const carregar = async () => {
    try {
      const response = await api.get("/produtos/");
      setProdutos(response.data);
    } catch {
      setErro("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  // =========================
  // LIMPAR
  // =========================
  const limpar = () => {
    setNome("");
    setCodigo("");
    setDescricao("");
    setCategoria("");
    setPreco("");
    setEstoque("");
    setEditando(null);
  };

  // =========================
  // VALIDAR
  // =========================
  const validar = () => {
    setErro("");
    setSucesso("");

    if (!nome) return setErro("Nome obrigatório"), false;
    if (!codigo) return setErro("Código obrigatório"), false;
    if (!descricao) return setErro("Descrição obrigatória"), false;
    if (!categoria) return setErro("Categoria obrigatória"), false;
    if (!preco) return setErro("Preço obrigatório"), false;
    if (!estoque) return setErro("Estoque obrigatório"), false;

    return true;
  };

  // =========================
  // SALVAR
  // =========================
  const salvar = async () => {
    if (!validar()) return;

    const dados = {
      nome,
      codigo,
      descricao,
      categoria,
      preco,
      estoque
    };

    try {

      if (editando) {
        await api.put(`/produtos/${editando}/`, dados);
        setSucesso("Produto atualizado");
      } else {
        await api.post("/produtos/", dados);
        setSucesso("Produto cadastrado");
      }

      limpar();
      carregar();

    } catch {
      setErro("Erro ao salvar produto");
    }
  };

  // =========================
  // EDITAR
  // =========================
  const editar = (p) => {
    setEditando(p.id);
    setNome(p.nome);
    setCodigo(p.codigo);
    setDescricao(p.descricao);
    setCategoria(p.categoria);
    setPreco(p.preco);
    setEstoque(p.estoque);
  };

  // =========================
  // EXCLUIR
  // =========================
  const excluir = async (id) => {
    if (!confirm("Deseja excluir?")) return;
    await api.delete(`/produtos/${id}/`);
    carregar();
  };

  // =========================
  // FILTRO
  // =========================
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>

    <Sidebar />
      <div className="clientes-container">
        
        

        <div className="topo">
          <h1>Produtos</h1>

          <input
            className="input-busca"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {erro && <div className="erro">{erro}</div>}
        {sucesso && <div className="sucesso">{sucesso}</div>}

        {/* FORM */}
        <div className="card-form">

          <h2>{editando ? "Editar Produto" : "Novo Produto"}</h2>

          <div className="grid-form">

            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
            <input placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
            <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
            <input placeholder="Estoque" value={estoque} onChange={e => setEstoque(e.target.value)} />

          </div>

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="acoes-form">

            <button className="btn-salvar" onClick={salvar}>
              {editando ? "Atualizar" : "Cadastrar"}
            </button>

            <button className="btn-limpar" onClick={limpar}>
              Limpar
            </button>

          </div>

        </div>

        {/* TABELA */}
        <div className="card-tabela">

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map(p => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.codigo}</td>
                  <td>{p.preco}</td>
                  <td>{p.estoque}</td>

                  <td>
                    <button className="btn-editar" onClick={() => editar(p)}>
                      Editar
                    </button>

                    <button className="btn-excluir" onClick={() => excluir(p.id)}>
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