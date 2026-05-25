import pytest


@pytest.mark.django_db
def test_listar_clientes(
autenticado
):

    r=autenticado.get(
        "/api/clientes/"
    )

    assert r.status_code==200


@pytest.mark.django_db
def test_cadastrar_cliente(
autenticado
):

    dados={

        "nome":"Maria",

        "cpf_cnpj":"123456",

        "telefone":"999",

        "email":"m@email.com"
    }

    r=autenticado.post(
        "/api/clientes/",
        dados
    )

    assert r.status_code==201


@pytest.mark.django_db
def test_cliente_invalido(
autenticado
):

    r=autenticado.post(
        "/api/clientes/",
        {}
    )

    assert r.status_code==400