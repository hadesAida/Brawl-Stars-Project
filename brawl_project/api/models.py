from django.db import models
from django.contrib.auth.models import User

# Модель Роли
class Role(models.Model):
    name = models.CharField(max_length=100)  # Например: Урон, Поддержка

    def __str__(self):
        return self.name

# Модель для категорий (если нужно)
class Category(models.Model):
    name = models.CharField(max_length=100)  # Например: Любимые, Эпические

    def __str__(self):
        return self.name

# Модель для Бравлеров
class Brawler(models.Model):
    name = models.CharField(max_length=100)
    brawler_class = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)  # Класс бравлера (Урон, Поддержка)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)  # Категория (Любимые, Эпические)
    image_url = models.URLField(blank=True, null=True)  # Ссылка на изображение (необязательное поле)
    rarity = models.CharField(max_length=50, blank=True)  # Редкость (необязательное поле)
    description = models.TextField(blank=True, null=True)  # Описание (необязательное поле)
    title = models.CharField(max_length=100, blank=True)  # Звание (например, Шеф-повар)
    super_name = models.CharField(max_length=100, blank=True, null=True)  # Название суперспособности
    super_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Модель для суперспособности


# Модель для фактов о бравлере
class Fact(models.Model):
    brawler = models.ForeignKey(Brawler, on_delete=models.CASCADE, related_name='facts')  # Связь с бравлером
    text = models.TextField()  # Текст факта

    def __str__(self):
        return f"Факт о {self.brawler.name}"

# Модель для советов о бравлере
class Tip(models.Model):
    brawler = models.ForeignKey(Brawler, on_delete=models.CASCADE, related_name='tips')  # Связь с бравлером
    text = models.TextField()  # Текст совета

    def __str__(self):
        return f"Совет для {self.brawler.name}"

# Модель для хранения фаворитов пользователя
class UserFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    brawler = models.ForeignKey(Brawler, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.brawler}"
