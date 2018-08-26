from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Week
from .models import YahooUse
from .serializers import YahooStatsSerializer

# Create your views here.
# ignore
class TestView(APIView):
    def get(self, request):
        test = Test.objects.all()
        q = request.queryset
        serializer = TestSerializer(test, many=True)
        # you can return an http response with html to display a page
        return Response(serializer.data)


# class that gets called when hitting /gamesRemaining (this is configured in URLS.py)
# optional query parameter in call is /gamesRemaining?q=yourQueryHere
class GamesRemaining(APIView):
    #gets called on a get request to this class. 
    def get(self, request):
        query = request.GET.get("q") # gets parameter "q" from request
        print(query)
        serializer = YahooStatsSerializer(YahooStats.objects.all(), many=True)
        return Response(serializer.data)