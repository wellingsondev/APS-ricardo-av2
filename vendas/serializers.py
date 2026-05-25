from rest_framework import serializers
from .models import Venda, ItemVenda
from .models import Produto


class ItemVendaSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = ItemVenda
        fields = ['id', 'produto', 'produto_nome', 'quantidade', 'preco']


class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True, required=False)

    cliente_nome = serializers.CharField(source='cliente.nome', read_only=True)
    funcionario_nome = serializers.CharField(source='funcionario.nome', read_only=True)

    class Meta:
        model = Venda
        fields = [
            'id',
            'cliente',
            'cliente_nome',
            'funcionario',
            'funcionario_nome',
            'total',
            'data_venda',
            'itens'
        ]

    # 🔥 CREATE
    def create(self, validated_data):
        itens_data = validated_data.pop('itens', [])
        venda = Venda.objects.create(**validated_data)

        total = 0

        for item in itens_data:
            produto = item['produto']
            quantidade = item['quantidade']

            # 🔥 preço SEMPRE do produto (banco)
            preco = produto.preco

            ItemVenda.objects.create(
                venda=venda,
                produto=produto,
                quantidade=quantidade,
                preco=preco
            )
            if produto.estoque < quantidade:
                raise serializers.ValidationError(
                    f"Estoque insuficiente para o produto {produto.nome}"
                )
            produto.estoque -= quantidade
            produto.save()
            total += preco * quantidade

        venda.total = total
        venda.save()

        return venda

    # 🔥 UPDATE (corrigido e sem bug de duplicação de cálculo)
    def update(self, instance, validated_data):
        itens_data = validated_data.pop('itens', None)

        instance.cliente = validated_data.get('cliente', instance.cliente)
        instance.funcionario = validated_data.get('funcionario', instance.funcionario)
        instance.save()

        if itens_data is not None:
            instance.itens.all().delete()

            total = 0

            for item in itens_data:
                produto = item['produto']
                quantidade = item['quantidade']

                if produto.estoque < quantidade:
                    raise serializers.ValidationError(
                        f"Estoque insuficiente para o produto {produto.nome}"
                )
                
                preco = produto.preco

                ItemVenda.objects.create(
                    venda=instance,
                    produto=produto,
                    quantidade=quantidade,
                    preco=preco
                )

                total += preco * quantidade

            instance.total = total
            instance.save()

        return instance