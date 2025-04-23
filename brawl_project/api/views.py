from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Brawler
from .serializers import BrawlerSerializer, UserFavoriteSerializer
from django.http import HttpResponse

# Главная страница
def index(request):
    return HttpResponse("Welcome to Brawl Stars API! Go to API Brawlers to see the brawlers list.")

# Получить список всех бравлеров
@api_view(['GET'])
def get_brawlers(request):
    brawlers = Brawler.objects.all()
    serializer = BrawlerSerializer(brawlers, many=True)
    return Response(serializer.data)

# Получить бравлера по ID
@api_view(['GET'])
def brawler_detail(request, pk):
    try:
        brawler = Brawler.objects.get(pk=pk)
    except Brawler.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BrawlerSerializer(brawler)
    return Response(serializer.data)

# Добавить одного бравлера
@api_view(['POST'])
def add_brawler(request):
    serializer = BrawlerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Массовая загрузка бравлеров
@api_view(['POST'])
def upload_brawlers(request):
    serializer = BrawlerSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Добавление в избранное
@api_view(['POST'])
def add_to_favorites(request):
    serializer = UserFavoriteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🔐 Главное представление, где авторизация нужна ТОЛЬКО на удаление
class BrawlerList(generics.ListCreateAPIView):
    queryset = Brawler.objects.all()
    serializer_class = BrawlerSerializer
    permission_classes = [permissions.AllowAny]  # Доступно всем (GET и POST)

class BrawlerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brawler.objects.all()
    serializer_class = BrawlerSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [permissions.IsAuthenticated()]  # Только авторизованным
        return [permissions.AllowAny()]  # GET, PUT, PATCH — всем







"""from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Character, Role, UserFavorite

from .serializers import CharacterSerializer, FavoriteSerializer, RoleSerializer

# Список всех персонажей
@api_view(['GET'])
def get_characters(request):
    characters = Character.objects.all()
    serializer = CharacterSerializer(characters, many=True)
    return Response(serializer.data)

# Добавление нового персонажа
@api_view(['POST'])
def add_character(request):
    serializer = CharacterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_characters(request):
    serializer = CharacterSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Получение персонажа по ID
@api_view(['GET'])
def character_detail(request, pk):
    try:
        character = Character.objects.get(pk=pk)
    except Character.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CharacterSerializer(character)
    return Response(serializer.data)

# Добавление фаворита
@api_view(['POST'])
def add_favorite(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Список ролей
@api_view(['GET'])
def get_roles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)

from django.shortcuts import render
from django.http import HttpResponse

# Представление для главной страницы
def index(request):
    return HttpResponse("Welcome to Brawl Stars API! Go to API Characters to see the characters list.")
from rest_framework import generics
from .models import Role
from .serializers import RoleSerializer

class RoleList(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

from rest_framework import generics
from .models import Character
from .serializers import CharacterSerializer

class CharacterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer"""

"""from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Character, Favorite, Role
from .serializers import CharacterSerializer, FavoriteSerializer, RoleSerializer

# List of all characters
@api_view(['GET'])
def get_characters(request):
    characters = Character.objects.all()
    serializer = CharacterSerializer(characters, many=True)
    return Response(serializer.data)

# Character details by ID
@api_view(['GET'])
def character_detail(request, pk):
    try:
        character = Character.objects.get(pk=pk)
    except Character.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CharacterSerializer(character)
    return Response(serializer.data)

# Adding to favorites
@api_view(['POST'])
def add_favorite(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List of roles
@api_view(['GET'])
def get_roles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)"""

"""from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Character, Favorite, Role
from .serializers import CharacterSerializer, FavoriteSerializer, RoleSerializer

# List of all characters
@api_view(['GET'])
def get_characters(request):
    characters = Character.objects.all()
    serializer = CharacterSerializer(characters, many=True)
    return Response(serializer.data)

# Character details by ID
@api_view(['GET'])
def character_detail(request, pk):
    try:
        character = Character.objects.get(pk=pk)
    except Character.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CharacterSerializer(character)
    return Response(serializer.data)

# Adding to favorites
@api_view(['POST'])
def add_favorite(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List of roles
@api_view(['GET'])
def get_roles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)

# In api/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to Brawl Stars API! Go to API Characters to see the characters list.")
"""