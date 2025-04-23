from rest_framework import serializers
from .models import Brawler, UserFavorite, Fact, Tip, Role, Category


class RoleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Role
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Category
        fields = ['id', 'name']



class FactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fact
        fields = ['text']


class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = ['text']
        




class BrawlerSerializer(serializers.ModelSerializer):
    brawler_class = RoleSerializer(required=False, allow_null=True)
    category = CategorySerializer(required=False, allow_null=True)
    facts = FactSerializer(many=True, required=False, allow_null=True)
    tips = TipSerializer(many=True, required=False, allow_null=True)
    

    class Meta:
        model = Brawler
        fields = ['id', 'name', 'brawler_class', 'category', 'image_url', 'rarity', 'description', 'title', 'facts', 'tips', 'super_name', 'super_description']

    def create(self, validated_data):
        facts_data = validated_data.pop('facts', [])
        tips_data = validated_data.pop('tips', [])
        category_data = validated_data.pop('category', None)
        brawler_class_data = validated_data.pop('brawler_class', None)

        # Обработка категории (сделаем пустое значение None)
        if category_data and category_data.get('name'):
            category_name = category_data['name']
            category, created = Category.objects.get_or_create(name=category_name)
            validated_data['category'] = category
        else:
            validated_data['category'] = None

        # Обработка роли (сделаем пустое значение None)
        if brawler_class_data and brawler_class_data.get('name'):
            brawler_class_name = brawler_class_data['name']
            brawler_class, created = Role.objects.get_or_create(name=brawler_class_name)
            validated_data['brawler_class'] = brawler_class
        else:
            validated_data['brawler_class'] = None

        # Создание Brawler
        brawler = Brawler.objects.create(**validated_data)

        # Создание фактов и подсказок
        for fact in facts_data or []:
            Fact.objects.create(brawler=brawler, **fact)
        for tip in tips_data or []:
            Tip.objects.create(brawler=brawler, **tip)

        return brawler

    def update(self, instance, validated_data):
        facts_data = validated_data.pop('facts', [])
        tips_data = validated_data.pop('tips', [])
        category_data = validated_data.pop('category', None)
        brawler_class_data = validated_data.pop('brawler_class', None)

        # Обработка категории (сделаем пустое значение None)
        if category_data and category_data.get('name'):
            category_name = category_data['name']
            category, created = Category.objects.get_or_create(name=category_name)
            instance.category = category
        else:
            instance.category = None

        # Обработка роли (сделаем пустое значение None)
        if brawler_class_data and brawler_class_data.get('name'):
            brawler_class_name = brawler_class_data['name']
            brawler_class, created = Role.objects.get_or_create(name=brawler_class_name)
            instance.brawler_class = brawler_class
        else:
            instance.brawler_class = None

        # Обновление Brawler
        return super().update(instance, validated_data)


class UserFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavorite
        fields = ['id', 'user', 'brawler', 'created_at']

# --- Custom serializers based on serializers.Serializer (по заданию) ---

class BrawlerShortSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class BrawlerFeedbackSerializer(serializers.Serializer):
    brawler_id = serializers.IntegerField()
    feedback_text = serializers.CharField(max_length=500)

