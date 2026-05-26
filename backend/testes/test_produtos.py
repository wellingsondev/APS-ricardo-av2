import pytest


@pytest.mark.django_db
def test_criar_produto(
autenticado
):

    r=autenticado.post(

        "/api/produtos/",

        {

            "nome":"Mouse",

            "codigo":"001",

            "descricao":"Teste",

            "categoria":"A",

            "preco":50,

            "estoque":10

        }

    )

    assert r.status_code==201


@pytest.mark.django_db
def test_estoque(

produto

):

    assert produto.estoque>0


@pytest.mark.django_db
def test_excluir_produto(
autenticado,
produto
):

    r=autenticado.delete(
        f"/api/produtos/{produto.id}/"
    )

    assert r.status_code==204