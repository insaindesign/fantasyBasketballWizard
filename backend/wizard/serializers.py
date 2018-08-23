from rest_framework import serializers
from .models import YahooStats
from .models import ESPNStats

# this class helps get the objects and convert them to json to send in the response
# we need one for every object that we plan to send in the response
class YahooStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = YahooStats
        fields = '__all__'