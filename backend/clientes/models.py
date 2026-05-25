from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20)
    cpf_cnpj = models.CharField(max_length=20, unique=True)

    endereco = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nome
