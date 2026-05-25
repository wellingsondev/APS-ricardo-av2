import pytest


@pytest.mark.django_db
def test_realizar_venda(

autenticado,

cliente,

produto,

funcionario

):

    venda={

        "cliente":
        cliente.id,

        "funcionario":
        funcionario.id,

        "itens":[

            {

                "produto":
                produto.id,

                "quantidade":
                2

            }

        ]

    }

    r=autenticado.post(

        "/api/vendas/",

        venda,

        format="json"

    )

    assert r.status_code==201


@pytest.mark.django_db
def test_venda_sem_item(

autenticado,

cliente,

funcionario

):

    r=autenticado.post(

        "/api/vendas/",

        {

            "cliente":
            cliente.id,

            "funcionario":
            funcionario.id,

            "itens":[]

        },

        format="json"

    )

    assert r.status_code==400


@pytest.mark.django_db
def test_venda_reduz_estoque(

autenticado,

cliente,

produto,

funcionario

):

    estoque=produto.estoque

    autenticado.post(

        "/api/vendas/",

        {

            "cliente":
            cliente.id,

            "funcionario":
            funcionario.id,

            "itens":[

                {

                    "produto":
                    produto.id,

                    "quantidade":
                    3

                }

            ]

        },

        format="json"

    )

    produto.refresh_from_db()

    assert produto.estoque<estoque