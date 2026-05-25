from rest_framework import viewsets,filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Produto
from .serializers import ProdutoSerializer
from rest_framework.permissions import IsAuthenticated

class ProdutoViewSet(viewsets.ModelViewSet):

    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = ['nome', 'categoria', 'codigo']
    search_fields = ['nome', 'descricao']
    ordering_fields = ['nome', 'preco', 'quantidade']
    


