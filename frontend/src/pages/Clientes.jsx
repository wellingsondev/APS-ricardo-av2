import { useEffect, useState } from "react";
import api from "../services/api";
import "./styles.css";
import Sidebar from "../components/Sidebar";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");

  const [editando, setEditando] = useState(null);

  const [busca, setBusca] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // =========================
  // CARREGAR CLIENTES
  // =========================

  const carregarClientes = async () => {

    try {

      const response = await api.get("/clientes/");

      setClientes(response.data);

    } catch (err) {

      console.log(err);

      setErro("Erro ao carregar clientes");

    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  // =========================
  // LIMPAR FORM
  // =========================

  const limparFormulario = () => {

    setNome("");
    setCpfCnpj("");
    setTelefone("");
    setEmail("");
    setEndereco("");

    setEditando(null);
  };

  // =========================
  // VALIDAÇÕES
  // =========================

  const validarFormulario = () => {

    setErro("");
    setSucesso("");

    // NOME

    if (!nome.trim()) {
      setErro("Nome obrigatório");
      return false;
    }

    if (nome.length < 3) {
      setErro("Nome muito curto");
      return false;
    }

    // CPF/CNPJ

    if (!cpfCnpj.trim()) {
      setErro("CPF/CNPJ obrigatório");
      return false;
    }

    if (cpfCnpj.length < 11) {
      setErro("CPF/CNPJ inválido");
      return false;
    }

    // TELEFONE

    if (!telefone.trim()) {
      setErro("Telefone obrigatório");
      return false;
    }

    if (telefone.length < 8) {
      setErro("Telefone inválido");
      return false;
    }

    // EMAIL

    if (!email.trim()) {
      setErro("Email obrigatório");
      return false;
    }

    const regexEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      setErro("Email inválido");
      return false;
    }

    // ENDEREÇO

    if (!endereco.trim()) {
      setErro("Endereço obrigatório");
      return false;
    }

    return true;
  };

  // =========================
  // SALVAR CLIENTE
  // =========================

  const salvarCliente = async () => {

    if (!validarFormulario()) return;

    const dados = {
      nome,
      cpf_cnpj: cpfCnpj,
      telefone,
      email,
      endereco,
    };

    try {

      if (editando) {

        await api.put(
          `/clientes/${editando}/`,
          dados
        );

        setSucesso("Cliente atualizado");

      } else {

        await api.post(
          "/clientes/",
          dados
        );

        setSucesso("Cliente cadastrado");

      }

      limparFormulario();

      carregarClientes();

    } catch (err) {

      console.log(err);

      if (
        err.response &&
        err.response.data
      ) {

        const erros =
          Object.values(
            err.response.data
          ).flat();

        setErro(erros.join(" | "));

      } else {

        setErro("Erro ao salvar cliente");

      }
    }
  };

  // =========================
  // EDITAR
  // =========================

  const editarCliente = (cliente) => {

    setEditando(cliente.id);

    setNome(cliente.nome);
    setCpfCnpj(cliente.cpf_cnpj);
    setTelefone(cliente.telefone);
    setEmail(cliente.email);
    setEndereco(cliente.endereco);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // EXCLUIR
  // =========================

  const excluirCliente = async (id) => {

    const confirmar =
      window.confirm(
        "Deseja excluir este cliente?"
      );

    if (!confirmar) return;

    try {

      await api.delete(
        `/clientes/${id}/`
      );

      setSucesso("Cliente excluído");

      carregarClientes();

    } catch (err) {

      console.log(err);

      setErro("Erro ao excluir cliente");

    }
  };

  // =========================
  // FILTRO
  // =========================

  const clientesFiltrados =
    clientes.filter((cliente) => {

      return (
        cliente.nome
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          ) ||

        cliente.cpf_cnpj
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          ) ||

        cliente.telefone
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          )
      );
    });

  // =========================
  // RENDER
  // =========================

  return (
    <>
    <Sidebar />

    <div className="clientes-container">

      <div className="topo">

        <h1>
          Gestão de Clientes
        </h1>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
          className="input-busca"
        />

      </div>

      {/* ALERTAS */}

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

      {/* FORMULÁRIO */}

      <div className="card-form">

        <h2>
          {editando
            ? "Editar Cliente"
            : "Novo Cliente"}
        </h2>

        <div className="grid-form">

          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="CPF/CNPJ"
            value={cpfCnpj}
            onChange={(e) =>
              setCpfCnpj(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) =>
              setTelefone(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <textarea
          placeholder="Endereço"
          value={endereco}
          onChange={(e) =>
            setEndereco(e.target.value)
          }
        />

        <div className="acoes-form">

          <button
            className="btn-salvar"
            onClick={salvarCliente}
          >
            {editando
              ? "Atualizar"
              : "Cadastrar"}
          </button>

          <button
            className="btn-limpar"
            onClick={limparFormulario}
          >
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
              <th>CPF/CNPJ</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>

            </tr>

          </thead>

          <tbody>

            {clientesFiltrados.map(
              (cliente) => (

                <tr key={cliente.id}>

                  <td>
                    {cliente.nome}
                  </td>

                  <td>
                    {cliente.cpf_cnpj}
                  </td>

                  <td>
                    {cliente.telefone}
                  </td>

                  <td>
                    {cliente.email}
                  </td>

                  <td>

                    <button
                      className="btn-editar"
                      onClick={() =>
                        editarCliente(cliente)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn-excluir"
                      onClick={() =>
                        excluirCliente(
                          cliente.id
                        )
                      }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
    </>
  );
}

export default Clientes;