# Cenários de Teste - Sistema de Vendas (PDV)

## 🔐 Módulo: Autenticação

Cenário: Login com sucesso  
Dado que o usuário está cadastrado  
Quando informa login e senha corretos  
Então o sistema deve permitir o acesso  

Cenário: Senha inválida  
Dado que o usuário existe  
Quando informa senha incorreta  
Então o sistema deve negar o acesso  

---

## 💰 Módulo: Vendas

Cenário: Realizar venda com sucesso  
Dado que existe um cliente, funcionário e produto cadastrados  
Quando o usuário realiza uma venda com itens válidos  
Então o sistema deve registrar a venda com sucesso  

Cenário: Venda sem itens  
Dado que existe um cliente e funcionário  
Quando o usuário tenta realizar uma venda sem itens  
Então o sistema deve impedir a operação  

Cenário: Redução de estoque após venda  
Dado que existe um produto com estoque disponível  
Quando uma venda é realizada  
Então o estoque do produto deve ser reduzido  

---

## 📦 Módulo: Produtos

Cenário: Criar produto com sucesso  
Dado que o usuário está autenticado  
Quando informa dados válidos  
Então o produto deve ser cadastrado  

Cenário: Produto com estoque válido  
Dado que existe um produto  
Então o estoque deve ser maior que zero  

Cenário: Excluir produto  
Dado que existe um produto  
Quando ele é removido  
Então deve ser excluído com sucesso  

---

## 👤 Módulo: Clientes

Cenário: Listar clientes  
Quando o usuário solicita a listagem  
Então o sistema retorna os clientes  

Cenário: Cadastrar cliente  
Quando dados válidos são informados  
Então o cliente é cadastrado  

Cenário: Cliente inválido  
Quando dados estão ausentes  
Então o sistema retorna erro  

---

## 👨‍💼 Módulo: Funcionários

Cenário: Cadastrar funcionário  
Dado que o usuário está autenticado  
Quando informa dados válidos  
Então o funcionário é cadastrado com sucesso  