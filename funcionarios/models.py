from django.db import models
from django.contrib.auth.models import User

class Funcionario(models.Model):
    CARGOS = (
        ('gerente', 'Gerente'),
        ('vendedor', 'Vendedor'),
        ('caixa', 'Caixa'),
    )
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()
    cargo = models.CharField(max_length=20, choices=CARGOS)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nome