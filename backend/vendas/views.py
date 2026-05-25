from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Venda
from .serializers import VendaSerializer

from .models import Funcionario


class VendaViewSet(viewsets.ModelViewSet):

    queryset = Venda.objects.all()

    serializer_class = VendaSerializer
    is_authenticated = IsAuthenticated
    
    def destroy(
        self,
        request,
        *args,
        **kwargs
    ):

        venda = self.get_object()


        # DEVOLVE ESTOQUE
        for item in venda.itens.all():

            produto = item.produto

            produto.estoque += item.quantidade

            produto.save()


        venda.delete()

        return Response(
            {
                "mensagem":
                "Venda excluída e estoque restaurado"
            },
            status=204
        )

    def perform_create(self, serializer):

        funcionario = Funcionario.objects.get(
            user=self.request.user
        )

        serializer.save(
            funcionario=funcionario
        )