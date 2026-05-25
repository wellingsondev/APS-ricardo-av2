import { useQuery } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Dashboard() {

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () => (await api.get("/clientes/")).data,
    refetchInterval: 5000 // 🔥 atualiza sozinho a cada 5s
  });

  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => (await api.get("/produtos/")).data,
    refetchInterval: 5000
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-[250px] p-10 w-full">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-purple-600 text-white p-6 rounded-2xl">
            Clientes
            <h1 className="text-4xl font-bold">
              {clientes.length}
            </h1>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl">
            Produtos
            <h1 className="text-4xl font-bold">
              {produtos.length}
            </h1>
          </div>

        </div>

      </div>
    </div>
  );
}