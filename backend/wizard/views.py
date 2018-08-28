from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.dataUtil import DataLoader
from .models import *
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
# optional query parameter in call is /gamesRemaining?date=2019-1-1
class GamesRemaining(APIView):
    
    # gets called on a get request to this class. 
    def get(self, request):
        teamAcronym = request.GET.get("teamAcronym") # gets parameter "teamAcronym" from request
        date = request.GET.get("date") 
        numGames = self.getNumberOfGames(teamAcronym, date)
        return Response(numGames)
   
    def getNumberOfGames(self, teamAcronym, date):
        
        # perform logic here to determine number of games as of date for teamacronym
        return 2

class AllTeams(APIView):
    def get(self, request):
        return Response(TeamSerializer(Team.objects.all(), many=True).data)

class TotalGamesToday(APIView):
    def get(self, request):
        requestDate = request.GET.get("date")
        d = requestDate.split("-")#"2018-1-1"
        gameDate = datetime.date(int(d[0]),int(d[1]),int(d[2]))
        games = Game.objects.filter(date=gameDate).count()
        print(games)
        #serializer = GameSerializer(games, many=True)
        return Response(games)

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

class LoadGames(APIView):
    def get(self, request):
        DataLoader.loadGames()
        return Response()
