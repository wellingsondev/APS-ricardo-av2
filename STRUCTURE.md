# Estrutura do Projeto - APS Ricardo AV2

## 📂 Organização

```
├── backend/                 # ← API Django (todo o código backend)
│   ├── manage.py
│   ├── config/              # Configurações Django
│   ├── clientes/            # App: Clientes
│   ├── produtos/            # App: Produtos
│   ├── funcionarios/        # App: Funcionários
│   ├── vendas/              # App: Vendas
│   ├── testes/              # Testes de integração
│   ├── db.sqlite3           # Banco de dados
│   ├── pytest.ini
│   ├── requeriments.txt
│   └── README.md            # Instruções do backend
│
├── frontend/                # ← React + Vite (interface)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── manage.py                # Wrapper para executar Django da raiz
├── package.json
└── README.md
```

## 🚀 Como usar

### Backend (Django API)

```bash
# Executar servidor
python manage.py runserver

# Criar/aplicar migrations
python manage.py makemigrations
python manage.py migrate

# Executar testes
pytest
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

## 📝 Notas

- Todos os comandos Django são executados da **raiz do projeto** usando o wrapper `manage.py`
- O `manage.py` na raiz redireciona os comandos para `backend/manage.py`
- Banco de dados SQLite localizado em `backend/db.sqlite3`
- Variáveis de ambiente devem ser configuradas em `backend/.env`

Para mais detalhes sobre o backend, veja [backend/README.md](backend/README.md)
