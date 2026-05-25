import pytest

from rest_framework.test import APIClient

from django.contrib.auth.models import User

from clientes.models import Cliente
from produtos.models import Produto
from funcionarios.models import Funcionario


@pytest.fixture
def api():

    return APIClient()


@pytest.fixture
def usuario():

    return User.objects.create_user(
        username="admin",
        password="123"
    )


@pytest.fixture
def autenticado(api,usuario):

    api.force_authenticate(user=usuario)

    return api


@pytest.fixture
def cliente():

    return Cliente.objects.create(

        nome="Carlos",

        cpf_cnpj="11111111111",

        telefone="839999999",

        email="teste@email.com"
    )


@pytest.fixture
def produto():

    return Produto.objects.create(

        nome="Notebook",

        codigo="P001",

        descricao="Produto Teste",

        categoria="Informática",

        preco=3000,

        estoque=20
    )


@pytest.fixture
def funcionario(usuario):

    return Funcionario.objects.create(

        nome="João",

        idade=25,

        cargo="vendedor",

        cpf="11111111111",

        telefone="839999",

        email="joao@email.com",

        user=usuario
    )