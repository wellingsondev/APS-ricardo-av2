# Backend - Django API

## Estrutura

Este diretório contém toda a aplicação Django com os seguintes apps:

- **clientes** - Gerenciamento de clientes
- **produtos** - Gerenciamento de produtos  
- **funcionarios** - Gerenciamento de funcionários
- **vendas** - Gerenciamento de vendas

## Como executar comandos Django

A partir da **raiz do projeto**, execute:

```bash
python manage.py <comando>
```

Exemplos:
```bash
python manage.py runserver        # Inicia o servidor de desenvolvimento
python manage.py makemigrations   # Cria migrations
python manage.py migrate          # Aplica migrations
python manage.py createsuperuser  # Cria usuário admin
python manage.py test             # Executa testes
```

## Testes

Os testes estão localizados em:
- `pytest.ini` - Configuração do pytest
- `testes/` - Testes de integração
- `conftest.py` - Configuração compartilhada de testes

Executar testes:
```bash
pytest                 # Todos os testes
pytest testes/         # Apenas testes de integração
python manage.py test  # Testes do Django
```

## Banco de dados

O banco SQLite está em `db.sqlite3` neste diretório.

## Variáveis de ambiente

Configure um arquivo `.env` na raiz deste diretório (backend/) com as variáveis necessárias.
