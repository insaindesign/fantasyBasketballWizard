from rest_framework import serializers
from .models import *

# this class helps get the objects and convert them to json to send in the response
# we need one for every object that we plan to send in the response
class YahooUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = YahooUse
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'
