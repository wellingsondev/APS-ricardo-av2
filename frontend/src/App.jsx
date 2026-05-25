import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Clientes from "./pages/Clientes"
import Produtos from "./pages/Produtos"
import Funcionarios from "./pages/Funcionarios"
import Vendas from "./pages/Vendas"

import ProtectedRoute from "./components/ProtectedRoute"

// cria o client UMA vez fora do componente
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <Clientes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/produtos"
            element={
              <ProtectedRoute>
                <Produtos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/funcionarios"
            element={
              <ProtectedRoute>
                <Funcionarios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendas"
            element={
              <ProtectedRoute>
                <Vendas />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App