🛒 Sistema de Vendas (PDV)

Sistema completo de gestão de vendas, clientes, produtos e funcionários, desenvolvido com Django REST Framework no backend e React no frontend.

O sistema permite criar vendas com múltiplos itens, controle de estoque e histórico completo de operações.

🚀 Tecnologias utilizadas
Backend
Django 6
Django REST Framework
SQLite
SimpleJWT (autenticação)
Frontend
React
React Router DOM
React Query (@tanstack/react-query)
Axios
CSS customizado
📦 Funcionalidades
👤 Clientes
Cadastro
Listagem
Edição
Exclusão
👨‍💼 Funcionários
Cadastro
Controle de acesso às vendas
📦 Produtos
Cadastro com preço e estoque
Atualização
Controle de quantidade disponível
🧾 Vendas (PDV)
Adição de múltiplos produtos
Cálculo automático de total
Histórico de vendas
Edição de vendas
Exclusão de vendas
Controle de estoque (evita estoque negativo)
⚙️ Como executar o projeto
🔧 Backend (Django)
# criar ambiente virtual
python -m venv venv

# ativar
venv\Scripts\activate  # Windows

# instalar dependências
pip install -r requirements.txt

# rodar migrations
python manage.py migrate

# iniciar servidor
python manage.py runserver

Servidor roda em:

http://127.0.0.1:8000/
💻 Frontend (React)
cd frontend

# instalar dependências
npm install

# rodar projeto
npm run dev

Frontend roda em:

http://localhost:5173/
🔐 Autenticação

O sistema utiliza JWT:

Login gera token
Token é enviado no header:
Authorization: Bearer <token> 
