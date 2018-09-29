"""These serializers convert data to json before sending in a response"""
from rest_framework import serializers
from .models import *

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'
        
class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Week
        fields = '__all__'
