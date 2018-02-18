from rest_framework import serializers
from .models import YahooStats
from .models import ESPNStats
from .models import Test

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'