from django.db import models
from clientes.models import Cliente
from funcionarios.models import Funcionario
from produtos.models import Produto


class Venda(models.Model):

    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE
    )

    funcionario = models.ForeignKey(
        Funcionario,
        on_delete=models.CASCADE
    )

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    data_venda = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Venda {self.id}"


class ItemVenda(models.Model):

    venda = models.ForeignKey(
        Venda,
        related_name="itens",
        on_delete=models.CASCADE
    )

    produto = models.ForeignKey(
        Produto,
        on_delete=models.CASCADE
    )

    quantidade = models.IntegerField()

    preco = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.produto.nome