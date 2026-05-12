from rest_framework import serializers
from .models import Venda, ItemVenda
from clientes.serializers import ClienteSerializer
from produtos.serializers import ProdutoSerializer


class ItemVendaSerializer(serializers.ModelSerializer):

    produto_detalhes = ProdutoSerializer(source='produto', read_only=True)

    class Meta:
        model = ItemVenda
        fields = [
            'produto',
            'quantidade',
            'subtotal',
            'produto_detalhes'
        ]
        read_only_fields = ['subtotal']

class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True)

    class Meta:
        model = Venda
        fields = '__all__'
        
        read_only_fields = ['funcionario', 'total']

    def validate(self, data):
        itens = data.get('itens', [])
      
        if not itens:
            raise serializers.ValidationError("A venda deve conter pelo menos um item.")
        for item in itens:

            produto = item['produto']
            quantidade = item['quantidade']

            if quantidade <= 0:
                raise serializers.ValidationError(f"A quantidade para o produto {produto.nome} deve ser maior que zero.")
            if produto.estoque < quantidade:
                raise serializers.ValidationError(f"Estoque insuficiente para o produto {produto.nome}. Estoque disponível: {produto.estoque}")
        return data
    
    def create(self, validated_data):

        itens_data = validated_data.pop('itens')
        venda = Venda.objects.create(**validated_data)
        total_venda = 0
        
        for item in itens_data:

            produto = item['produto']
            quantidade = item['quantidade']
            subtotal = produto.preco * quantidade
            
            ItemVenda.objects.create(
                venda=venda,
                produto=produto,
                quantidade=quantidade,
                subtotal=subtotal
            )
            
            # Atualiza o estoque do produto
            produto.estoque -= quantidade
            produto.save()
            total_venda += subtotal
        venda.total = total_venda
        venda.save()
        return venda