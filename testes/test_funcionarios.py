import pytest


@pytest.mark.django_db
def test_cadastrar_funcionario(
autenticado
):

    r = autenticado.post(

        "/api/funcionarios/",

        {

            "username":"func1",

            "password":"123456",

            "nome":"Lucas",

            "idade":30,

            "cargo":"vendedor",

            "cpf":"12345678911",

            "telefone":"83999999999",

            "email":"lucas@email.com"

        },

        format="json"

    )

    print(r.data)

    assert r.status_code == 201