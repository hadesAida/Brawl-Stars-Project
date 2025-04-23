
from django.contrib import admin
from django.urls import path, include
from api import views  # Импортируйте представление для главной страницы

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Подключаем API
    path('', views.index, name='home'),
    
]
