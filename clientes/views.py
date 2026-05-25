from rest_framework import viewsets
from clientes.models import Cliente
from .serializers import ClienteSerializer
from rest_framework.permissions import IsAuthenticated

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]
    

    filterset_fields=['nome','cpf_cnpj','telefone']

# Create your views here.
