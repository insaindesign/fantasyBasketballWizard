# Fantasy Wizard Backend
# est. 2017
import datetime
import pytz
from django.shortcuts import render, redirect
from django.db.models import Q
from rest_framework.views import APIView
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework import status, permissions
from .utils.dataUtil import DataLoader
from .models import *
from .serializers import *
from decimal import *
from .custom.forms import RegistrationForm

# ---------------------- API VIEWS -----------------------------


class GamesRemaining(APIView):
    """
        Returns all gamesRemaining/GamesThisWeek for the given team and date. 
        /?pageName=javascriptPage&teams=LAL,OKC,GSW,BOS,&date=2019-1-1&format=json
    """

    def get(self, request):
        dayBeforeSeasonStartDate = datetime.date(2018, 10, 15)
        gameCountList = []
        requestTeamsString = request.GET.get("teams")
        pageName = request.GET.get("pageName")
        requestTeams = self.getCleanedTeamsString(requestTeamsString)
        requestWeek = request.GET.get("weekNum")
        date = request.GET.get("date")
        queryString = request.META.get("QUERY_STRING")
        leagueID = request.GET.get("leagueID")
        
        print("Request: Games Remaining as of " + date)
        print(requestTeams)
        requestDate = DataLoader.stringDateToDateObject(date)  # yyyy-m-d


        # if no week in the request, get the corresponding week
        if requestWeek == None:
            requestWeek = DataLoader.getWeekFromDate(date)

        # get each teams games remaining as of the request date
        for teamAcronym in requestTeams:
            requestTeam = DataLoader.getTeamFromAcronym(teamAcronym)
            gamesRemaining = Game.objects.filter(Q(homeTeam=requestTeam) | Q(
                roadTeam=requestTeam), week=requestWeek, date__gte=requestDate)
            numGamesRemaining = gamesRemaining.count()

            if(self.isTodaysGameOver(gamesRemaining, requestDate) == True):
                print("Today's game for " + teamAcronym + " is over")
                numGamesRemaining = numGamesRemaining - 1

            numGames = Game.objects.filter(Q(homeTeam=requestTeam) | Q(
                roadTeam=requestTeam), week=requestWeek).count()
            fraction = str(numGamesRemaining) + "/" + str(numGames)
            gameCountList.append(fraction)

        print("Response for Games Remaining")
        print(gameCountList)
        #numGames = Game.objects.filter(Q(homeTeam = requestTeam) | Q(roadTeam = requestTeam), week=requestWeek).count()

        return Response(gameCountList)

    def isTodaysGameOver(self, gamesRemaining, requestDate):
        """
            Determines whether todays game is over

            gamesRemaining - a list of Games
                - if one of these games is today
                    -is it currently 3 hours after this game start time?
            requestDate - date that the request came in on

            if there is a game today AND it is over - True
            else - False
        """
        # get nowtime
        now = datetime.datetime.now().astimezone(pytz.timezone('US/Eastern'))
        # get todays game
        todaysGameQuery = gamesRemaining.filter(date=requestDate)

        # no game today
        if todaysGameQuery.count() < 1:
            return False

        todaysGame = todaysGameQuery[0]
        gameTime = todaysGame.time
        gameDate = todaysGame.date
        gameDateTime = datetime.datetime(gameDate.year, gameDate.month,
                                         gameDate.day, gameTime.hour, gameTime.minute,
                                         tzinfo=pytz.timezone('US/Eastern')
                                         )

        # for testing. change this to which time you want to test as of
        #now = datetime.datetime(gameDate.year, gameDate.month, gameDate.day, 23, 1, tzinfo=pytz.timezone('US/Eastern'))

        threeHours = datetime.timedelta(hours=3)
        gameEndTime = gameDateTime + threeHours

        print("START")
        print(gameDateTime)
        print("NOW")
        print(now)
        print("ENDTime")
        print(gameEndTime)
        print(gameEndTime < now)
        
        # date1 < date2
        # date1 is considered less than date2 when date1 precedes date2 in time. 
        return gameEndTime < now
        

    def getCleanedTeamsString(self, teamsString):
        # remove last character (comma in this case)
        teamsString = teamsString[:-1].upper()

        # espn has a few dumbass acronyms
        teamsString = teamsString.replace("WSH", "WAS")
        teamsString = teamsString.replace("NOR", "NO")
        teamsString = teamsString.replace("UTAH", "UTA")
        teamsString = teamsString.replace("PHX", "PHO")
        return teamsString.split(",")

    def getNumberOfGames(self, requestTeam, requestWeek, requestDate):
        return Game.objects.filter(Q(homeTeam=requestTeam) | Q(roadTeam=requestTeam), week=requestWeek).count()

    def getNumberOfRemainingGames(self, teamAcronym, requestWeek, requestDate):
        return Game.objects.filter(Q(homeTeam=requestTeam) | Q(roadTeam=requestTeam), week=requestWeek, date__gte=requestDate).count()


class AllTeams(APIView):
    def get(self, request):
        return Response(TeamSerializer(Team.objects.all(), many=True).data)


class TotalGamesToday(APIView):
    def get(self, request):
        requestDate = request.GET.get("date")
        requestWeek = request.GET.get("weekNum")

        if requestDate == None:
            requestDate = str(Week.objects.get(weekNum=requestWeek).startDate)

        gameDate = DataLoader.stringDateToDateObject(requestDate)
        games = Game.objects.filter(date=gameDate).count()
        return Response(games)


class GetPlayerStats(APIView):

    def get(self, request):
        playersString = request.GET.get("players")
        players = playersString[:-1].split(",")
        playerList = []
        print("Request: Player stats for: " + playersString)

        for playerID in players:
            try:
                playerList.append(Player.objects.get(playerID=playerID))
            except:
                print(playerID + " not found")

        serializer = PlayerSerializer(playerList, many=True)
        print("Response: " + str(playerList))
        return Response(serializer.data)

class AddPlayer(APIView):
    """  
        Adds a player to the database
        ?id=JHardenHou&team=HOU&ppg=22.1&rpg=7.4&apg=4.9&spg=2.0&bpg=1.5
        &topg=2.2&ftmpg=7.4&ftapg=8.7&ftpct=85&fgapg=17.8&fgmpg=11.2
        &fgpct=54.2&threepg=2.3&format=json
    """

    def get(self, request):
        team = DataLoader.getTeamFromAcronym(request.GET.get("team"))
        id = request.GET.get("id")
        Player(playerID=id,
               team=team,
               ppg=Decimal(request.GET.get("ppg")),
               rpg=Decimal(request.GET.get("rpg")),
               apg=Decimal(request.GET.get("apg")),
               spg=Decimal(request.GET.get("spg")),
               bpg=Decimal(request.GET.get("bpg")),
               topg=Decimal(request.GET.get("topg")),
               ftmpg=Decimal(request.GET.get("ftmpg")),
               ftapg=Decimal(request.GET.get("ftapg")),
               fgapg=Decimal(request.GET.get("fgapg")),
               ftpct=Decimal(request.GET.get("ftpct")),
               fgmpg=Decimal(request.GET.get("fgmpg")),
               fgpct=Decimal(request.GET.get("fgpct")),
               threepg=Decimal(request.GET.get("threepg"))
               ).save()
        return Response("successfully added player: " + id)


class GamesThisWeek(APIView):
    """
        Returns all games for the given week and team - 
        /?teams=LAL,OKC,GSW,BOS,&weekNum=3
    """

    def get(self, request):
        gameCountList = []
        # get the requested team and week objects from the database
        requestTeams = request.GET.get("teams")
        requestTeams = requestTeams[:-1]
        requestDate = request.GET.get("date")
        print(requestDate)
        print(requestTeams)
        requestWeek = DataLoader.getWeekFromDate(requestDate)

        for teamAcronym in requestTeams:
            print(teamAcronym)
            requestTeam = DataLoader.getTeamFromAcronym(teamAcronym.upper())

            # the count of the games that have the requested team as
            # either the home team OR road team and is in the requested week

            numGames = Game.objects.filter(Q(homeTeam=requestTeam) | Q(
                roadTeam=requestTeam), week=requestWeek).count()
            gameCountList.append(numGames)

        #numGames = Game.objects.filter(Q(homeTeam = requestTeam) | Q(roadTeam = requestTeam), week=requestWeek).count()
        return Response(gameCountList)


class GetWeekFromDate(APIView):
    """ 
        Returns the week object for the requested date -
        /getweek/?date=2019-1-1
    """

    def get(self, request):
        requestDate = request.GET.get("date")
        serializer = WeekSerializer(DataLoader.getWeekFromDate(requestDate))
        return Response(serializer.data)

# -------------- Template Views --------------------------------

class PrivacyPolicy(TemplateView):
    def get(self, request):
        return render(request, template_name='wizard/privacyPolicy.html')


class Contact(TemplateView):
    def get(self, request):
        url = 'https://chrome.google.com/webstore/detail/fantasy-basketball-wizard/bmojbnihkmbdandkddobjnilkegcooll?hl=en'
        return redirect(url)

class Home(TemplateView):
    def get(self, request):
        return render(request, template_name='wizard/index.html')

class NBAFantasyDashboard(TemplateView):
    def get(self, request):
        
        return render(request, template_name='wizard/nbafantasydashboard.html')

class Register(TemplateView):
    def get(self, request):
        form = RegistrationForm()
        args = {'form':form}
        return render(request, template_name='wizard/register.html', context=args)
    def post(self, request):
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/home')
        else:
            return render(request, 'wizard/register.html', {'form': form})


# -------------- Data loading methods --------------------------


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


class DeleteAllPlayers(APIView):
    """ deleted all players in the database - /deletepayers """

    def get(self, request):
        DataLoader.deleteAllPlayers()
        return Response()


class LoadAllData(APIView):
    """ loads all teams, weeks, then games all in one request"""

    def get(self, request):
        DataLoader.loadTeams()
        DataLoader.loadWeeks()
        DataLoader.loadGames()
        return Response("data successfully loaded")
