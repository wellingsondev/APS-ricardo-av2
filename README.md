# 🛒 Sistema de Gestão de Vendas

Sistema de gerenciamento de vendas desenvolvido com:

* Backend: Django REST Framework
* Frontend: Streamlit
* Banco de dados: SQLite
* Autenticação: JWT

---

# 📌 Funcionalidades

## 👨‍💼 Funcionários

* Cadastro de funcionários
* Login individual
* Edição de dados
* Exclusão de funcionários

## 👥 Clientes

* Cadastro de clientes
* Listagem de clientes
* Edição de clientes
* Exclusão de clientes

## 📦 Produtos

* Cadastro de produtos
* Controle de estoque
* Edição de produtos
* Exclusão de produtos

## 💰 Vendas

* Cadastro de vendas
* Venda com múltiplos produtos
* Carrinho de compras
* Cálculo automático do total
* Atualização automática do estoque

## 📊 Dashboard

* Quantidade de clientes
* Quantidade de produtos
* Quantidade de vendas

---

# 🛠️ Tecnologias Utilizadas

## Backend

* Python
* Django
* Django REST Framework
* Simple JWT

## Frontend

* Streamlit

## Banco de Dados

* SQLite

---

# 🚀 Como Executar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2️⃣ Entrar na pasta

```bash
cd NOME_DO_PROJETO
```

---

## 3️⃣ Criar ambiente virtual

```bash
python -m venv venv
```

---

## 4️⃣ Ativar ambiente virtual

### Windows

```bash
venv\Scripts\activate
```

---

## 5️⃣ Instalar dependências

```bash
pip install -r requirements.txt
```

---

# 🚀 Rodando o Backend Django

## Fazer migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Criar superusuário

```bash
python manage.py createsuperuser
```

---

## Rodar servidor Django

```bash
python manage.py runserver
```

Servidor:

```text
http://127.0.0.1:8000/
```

---

# 🚀 Rodando o Frontend Streamlit

Entrar na pasta frontend:

```bash
cd frontend
```

Rodar:

```bash
streamlit run app.py
```

Frontend:

```text
http://localhost:8501
```

---

# 🔐 Login

O sistema utiliza autenticação JWT.

Cada funcionário possui:

* login
* senha
* acesso individual

---

# 📂 Estrutura do Projeto

```text
projeto/
│
├── clientes/
├── funcionarios/
├── produtos/
├── vendas/
├── frontend/
│   └── app.py
├── config/
├── manage.py
└── requirements.txt
```

---

# 📌 Melhorias Futuras

* Permissões por cargo
* Dashboard com gráficos
* Relatórios PDF
* PostgreSQL
* Deploy na nuvem
* Tema dark mode
* Busca avançada de produtos

---

# 👨‍🎓 Projeto Acadêmico

Projeto desenvolvido para apresentação acadêmica com foco em:

* API REST
* CRUD
* autenticação
* integração frontend/backend
* gestão de vendas

---
