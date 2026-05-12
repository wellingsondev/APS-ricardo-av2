from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Venda
from .serializers import VendaSerializer

from funcionarios.models import Funcionario


class VendaViewSet(viewsets.ModelViewSet):

    queryset = Venda.objects.all()

    serializer_class = VendaSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        funcionario = Funcionario.objects.get(
            user=self.request.user
        )

        serializer.save(
            funcionario=funcionario
        )