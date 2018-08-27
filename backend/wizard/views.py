from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.scheduler import DataLoader
from .models import Week
from .models import YahooUse
from .serializers import *

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
        teamAcronym = request.GET.get("teamAcronym") # gets parameter "teamAcronym" from request
        date = request.GET.get("date") 
        numGames = self.getNumberOfGames(teamAcronym, date)
        return Response(numGames)
    def getNumberOfGames(self, teamAcronym, date):
        #perform logic here to determine number of games as of date for teamacronym
        return 2

class AllTeams(APIView):
    def get(self, request):
        return Response(TeamSerializer(Team.objects.all(), many=True).data)

class TotalGamesToday(APIView):
    def get(self, request):
        requestDate = request.GET.get("date")
        print(requestDate)
        day = Day.objects.filter(date=requestDate)
        serializer = DaySerializer(day, many=True)
        return Response(serializer.data)

class GamesThisWeek(APIView):
    def get(self, request):
        teamAcronym = request.GET.get("teamAcronym")
        return Response(serializer.data)

class LoadTeams(APIView):
    def get(self, request):
        DataLoader.loadTeams()
        return Response()

class LoadWeeks(APIView):
    def get(self, request):
        DataLoader.loadWeeks()
        return Response()
