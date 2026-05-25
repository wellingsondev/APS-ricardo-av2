import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login(){
 

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  async function entrar(){

    try{

      const response = await api.post(
        "/login/",
        {
          username,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.access
      )

      navigate("/dashboard")

    }catch{
      alert("Login inválido")
    }
  }

  return(

    <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-slate-950
    ">

      <div className="
        bg-slate-900
        p-10
        rounded-3xl
        shadow-2xl
        w-[400px]
      ">

        <h1 className="
          text-4xl
          font-bold
          text-center
          text-purple-500
          mb-10
        ">
          Sistema de Vendas
        </h1>

        <input
          placeholder="Usuário"
          className="
            w-full
            p-4
            rounded-xl
            bg-slate-800
            mb-4
          "
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="
            w-full
            p-4
            rounded-xl
            bg-slate-800
            mb-6
          "
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={entrar}
          className="
            w-full
            p-4
            rounded-xl
            bg-gradient-to-r
            from-purple-600
            to-blue-600
            font-bold
          "
        >
          Entrar
        </button>

      </div>

    </div>
  )
}