from rest_framework import serializers
from .models import Venda, ItemVenda


class ItemVendaSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = ItemVenda

        fields = [

            "produto",
            "quantidade"

        ]


class VendaSerializer(
    serializers.ModelSerializer
):

    itens = ItemVendaSerializer(
        many=True
    )

    cliente_nome = serializers.CharField(
        source="cliente.nome",
        read_only=True
    )

    funcionario_nome = serializers.CharField(
        source="funcionario.nome",
        read_only=True
    )

    class Meta:

        model = Venda

        fields = [

            "id",

            "cliente",
            "cliente_nome",

            "funcionario",
            "funcionario_nome",

            "itens",

            "total",

            "data_venda"

        ]

        read_only_fields = [

            "total",
            "data_venda",
            "cliente_nome",
            "funcionario_nome"

        ]

    def validate(self, data):

        itens = data.get("itens", [])

        if not itens:
            raise serializers.ValidationError(
                "Venda precisa ter itens"
            )

        for item in itens:

            produto = item["produto"]

            quantidade = int(
                item["quantidade"]
            )

            if quantidade <= 0:

                raise serializers.ValidationError(
                    f"Quantidade inválida para {produto.nome}"
                )

            if produto.estoque < quantidade:

                raise serializers.ValidationError(
                    f"{produto.nome} possui apenas {produto.estoque} unidades"
                )

        return data


    def create(self,validated_data):

        itens=validated_data.pop(
            "itens"
        )

        venda=Venda.objects.create(
            **validated_data
        )

        total=0

        for item in itens:

            produto=item["produto"]

            quantidade=item["quantidade"]

            ItemVenda.objects.create(

                venda=venda,

                produto=produto,

                quantidade=quantidade,

                preco=produto.preco

            )

            produto.estoque-=quantidade

            produto.save()

            total+=(
                produto.preco
                *
                quantidade
            )

        venda.total=total

        venda.save()

        return venda