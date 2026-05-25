import {
  FaChartBar,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaUserTie,
  FaSignOutAlt
} from "react-icons/fa"

import { Link, useNavigate } from "react-router-dom"

export default function Sidebar(){

  const navigate = useNavigate()

  function sair(){

    localStorage.removeItem("token")

    navigate("/")
  }

  return(

    <div className="
      w-[250px]
      h-screen
      bg-slate-900
      fixed
      left-0
      top-0
      p-6
      border-r
      border-slate-800
    ">

      <h1 className="
        text-3xl
        font-bold
        text-purple-500
        mb-10
      ">
        Sistema
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:text-purple-400"
        >
          <FaChartBar className="inline mr-2" />
          Dashboard
        </Link>

        <Link
          to="/clientes"
          className="hover:text-purple-400"
        >
          <FaUsers className="inline mr-2" />
          Clientes
        </Link>

        <Link
          to="/produtos"
          className="hover:text-purple-400"
        >
          <FaBox className="inline mr-2" />
          Produtos
        </Link>

        <Link
          to="/funcionarios"
          className="hover:text-purple-400"
        >
          <FaUserTie className="inline mr-2" />
          Funcionários
        </Link>

        <Link
          to="/vendas"
          className="hover:text-purple-400"
        >
          <FaShoppingCart className="inline mr-2" />
          Vendas
        </Link>

        <button
          onClick={sair}
          className="
            mt-10
            bg-red-600
            p-3
            rounded-xl
            font-bold
          "
        >
          <FaSignOutAlt className="inline mr-2" />
          Sair
        </button>

      </div>

    </div>
  )
}