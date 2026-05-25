from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/login/', TokenObtainPairView.as_view()),
    path('api/refresh/', TokenRefreshView.as_view()),

    path('api/', include('clientes.urls')),
    path('api/', include('produtos.urls')),
    path('api/', include('funcionarios.urls')),
    path('api/', include('vendas.urls')),
]