from rest_framework import serializers
from .models import Funcionario
from django.contrib.auth.models import User

class FuncionarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)

    password = serializers.CharField(write_only=True)

    class Meta:
        model = Funcionario
        fields = [
            'id',
            'username',
            'password',
            'nome',
            'idade',
            'cargo',
        ]
    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(username=username, password=password)
        funcionario = Funcionario.objects.create(user=user, **validated_data)
        return funcionario