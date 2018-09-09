import datetime
import pytz
from django.shortcuts import render
from django.db.models import Q
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

class GamesRemaining(APIView):
    
    # gets called on a get request to this class. 
    def get(self, request):
        teamAcronym = request.GET.get("teamAcronym") # gets parameter "teamAcronym" from request
        requestDate = request.GET.get("date") # yyyy-mm-dd
        numGames = self.getNumberOfGames(teamAcronym, requestDate)
        return Response(numGames)
   
    def getNumberOfGames(self, teamAcronym, requestDate):
        team = DataLoader.getTeamFromAcronym(teamAcronym)
        date = DataLoader.stringDateToDateObject(requestDate)
        week = DataLoader.getWeekFromDate(date)
        remainingGames = Game.objects.filter(Q(homeTeam = team) | Q(roadTeam = team),week=week,date__gte=date)
        gamesThisWeek = Game.objects.filter(Q(homeTeam = team) | Q(roadTeam = team),week=week).count()
        gamesRemaining = remainingGames.count()
        
        # perform logic here to determine whether the game is over or not. ~3 hours after start date
        # if there is a game today AND current time is more than 3 hours after game time, subtract one from count
        
        #get nowtime in Eastern timezone
        #add 3 hours to game time (already in eastern)
        # if now is after (gametime + 3 hours) then the game is over and subtract 1 from count
        # else
        # return count
        
        
        #gameToday = False
        #for game in remainingGames:
        #    if game.date = date and :
                
        #EasternTimeNow = datetime.datetime.now()
        #pacificTimeZone = pytz.timezone('US/Pacific-New')

        #EasternTimeNow = pacificTimeZone.localize(pacificTimeZone)
        

        
        

        
        #return str(gamesRemaining) + "/" + str(gamesThisWeek)
        return gamesRemaining

class AllTeams(APIView):
    def get(self, request):
        return Response(TeamSerializer(Team.objects.all(), many=True).data)

class TotalGamesToday(APIView):
    def get(self, request):
        requestDate = request.GET.get("date")
        gameDate = DataLoader.stringDateToDateObject(requestDate)
        games = Game.objects.filter(date=gameDate).count()
        return Response(games)


class GetPlayerStats(APIView):
    def get(self, request):
        yahooPlayerID = request.GET.get("yahooPlayerID")
        return Response(Players.objects.get(yahooPlayerID=yahooPlayerID))


class UpdatePlayer(APIView):
    def post(self, request):
        return Response()

class GamesThisWeek(APIView):
    """Returns all games for the given week and team - /?teamAcronym=LAL&weekNum=3"""
    def get(self, request):

        # get the requested team and week objects from the database
        requestTeam = Team.objects.get(acronym = request.GET.get("teamAcronym"))
        requestWeek = Week.objects.get(weekNum = int(request.GET.get("weekNum")))

        # the count of the games that have the requested team as
        # either the home team OR road team and is in the requested week
        numGames = Game.objects.filter(Q(homeTeam = requestTeam) | Q(roadTeam = requestTeam), week=requestWeek).count() 
        return Response(numGames)

# Data loading methods
class LoadTeams(APIView):
    """loads all hard coded teams into database - /loadteams"""
    def get(self, request):
        DataLoader.loadTeams()
        return Response()

class LoadWeeks(APIView):
    """ loads all hard coded weeks into database - /loadweeks"""
    def get(self, request):
        DataLoader.loadWeeks()
        return Response()

class LoadGames(APIView):
    """ loads all games from schedule.csv to the database - /loadgames"""
    def get(self, request):
        DataLoader.loadGames()
        return Response()

class DeleteGames(APIView):
    """ deletes all games in the database -  /deletegames"""
    def get(self, request):
        DataLoader.deleteAllGames()
        return Response()
