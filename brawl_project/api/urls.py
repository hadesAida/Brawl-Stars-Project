from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # JWT authentication routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API routes for brawlers and favorites
    path('brawlers/', views.get_brawlers, name='brawler-list'),
    path('brawlers/<int:pk>/', views.BrawlerDetail.as_view(), name='brawler-detail'),  # Используем класс BrawlerDetail
    path('favorite/', views.add_to_favorites, name='add-favorite'),
    path('brawlers/upload/', views.upload_brawlers, name='upload-brawlers'),
    path('brawlers/add_brawler/', views.add_brawler, name='add-brawler')
]


"""
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # Другие маршруты
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

"""