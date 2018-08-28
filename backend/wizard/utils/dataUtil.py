import csv
import datetime
from wizard.models import Team
from wizard.models import Week
from wizard.models import Game


class DataLoader:
    """This class will load the base with the team and schedule data"""

    @staticmethod
    def loadTeams():
        Team(city="Atlanta", name="Hawks", acronym="ATL").save()
        Team(city="Boston", name="Celtics", acronym="BOS").save()
        Team(city="Brooklyn", name="Nets", acronym="BKN").save()
        Team(city="Charlotte", name="Hornets", acronym="CHA").save()
        Team(city="Chicago", name="Bulls", acronym="CHI").save()
        Team(city="Cleveland", name="Cavaliers", acronym="CLE").save()
        Team(city="Dallas", name="Mavericks", acronym="DAL").save()
        Team(city="Denver", name="Nuggets", acronym="DEN").save()
        Team(city="Detroit", name="Pistons", acronym="DET").save()
        Team(city="Golden State", name="Warriors", acronym="GSW").save()
        Team(city="Houston", name="Rockets", acronym="HOU").save()
        Team(city="Indiana", name="Pacers", acronym="IND").save()
        Team(city="Los Angeles", name="Clippers", acronym="LAC").save()
        Team(city="Los Angeles", name="Lakers", acronym="LAL").save()
        Team(city="Memphis", name="Grizzlies", acronym="MEM").save()
        Team(city="Miami", name="Heat", acronym="MIA").save()
        Team(city="Milwaukee", name="Bucks", acronym="MIL").save()
        Team(city="Minnesota", name="Timberwolves", acronym="MIN").save()
        Team(city="New Orleans", name="Pelicans", acronym="NOP").save()
        Team(city="New York", name="Knicks", acronym="NYK").save()
        Team(city="Oklahoma City", name="Thunder", acronym="OKC").save()
        Team(city="Orlando", name="Magic", acronym="ORL").save()
        Team(city="Philadelphia", name="76ers", acronym="PHI").save()
        Team(city="Phoenix", name="Suns", acronym="PHO").save()
        Team(city="Portland", name="Trailblazers", acronym="POR").save()
        Team(city="Sacramento", name="Kings", acronym="SAC").save()
        Team(city="San Antonio", name="Spurs", acronym="SAS").save()
        Team(city="Toronto", name="Raptors", acronym="TOR").save()
        Team(city="Utah", name="Jazz", acronym="UTA").save()
        Team(city="Washington", name="Wiazrds", acronym="WAS").save()

    @staticmethod    
    def loadWeeks():
        Week(weekNum=1, startDate="2018-10-15", endDate="2018-10-21").save()
        Week(weekNum=2, startDate="2018-10-22", endDate="2018-10-28").save()
        Week(weekNum=3, startDate="2018-10-29", endDate="2018-11-4").save()
        Week(weekNum=4, startDate="2018-11-5", endDate="2018-11-11").save()
        Week(weekNum=5, startDate="2018-11-12", endDate="2018-11-18").save()
        Week(weekNum=6, startDate="2018-11-19", endDate="2018-11-25").save()
        Week(weekNum=7, startDate="2018-11-26", endDate="2018-12-2").save()
        Week(weekNum=8, startDate="2018-12-3", endDate="2018-12-9").save()
        Week(weekNum=9, startDate="2018-12-10", endDate="2018-12-16").save()
        Week(weekNum=10, startDate="2018-12-17", endDate="2018-12-23").save()
        Week(weekNum=11, startDate="2018-12-24", endDate="2018-12-30").save()
        Week(weekNum=12, startDate="2018-12-31", endDate="2019-1-6").save()
        Week(weekNum=13, startDate="2019-1-7", endDate="2019-1-13").save()
        Week(weekNum=14, startDate="2019-1-14", endDate="2019-1-20").save()
        Week(weekNum=15, startDate="2019-1-21", endDate="2019-1-27").save()
        Week(weekNum=16, startDate="2019-1-28", endDate="2019-2-3").save()
        Week(weekNum=17, startDate="2019-2-4", endDate="2019-2-10").save()
        Week(weekNum=18, startDate="2019-2-11", endDate="2019-2-24").save()
        Week(weekNum=19, startDate="2019-2-11", endDate="2019-2-24").save()
        Week(weekNum=20, startDate="2019-2-25", endDate="2019-3-3").save()
        Week(weekNum=21, startDate="2019-3-4", endDate="2019-3-10").save()
        Week(weekNum=22, startDate="2019-3-11", endDate="2019-3-17").save()
        Week(weekNum=23, startDate="2019-3-18", endDate="2019-3-24").save()
        Week(weekNum=24, startDate="2019-3-25", endDate="2019-3-31").save()
        Week(weekNum=25, startDate="2019-4-1", endDate="2019-4-7").save()
        Week(weekNum=26, startDate="2019-4-8", endDate="2019-4-14").save()

    @staticmethod
    def loadGames():
        file = open('wizard/utils/schedule.csv')
        csvReader = csv.reader(file, delimiter=',')
        for row in csvReader:
            #str = row[0] + " " + row[1] + " "  + row[2] + " "  + row[3]

            d = row[0].split("-")
            gameDate = datetime.date(int(d[0]),int(d[1]),int(d[2]))
            # gameDate = stringDateToDateObject(row[0])
            t = row[1].split(":")
            gameTime = datetime.time(int(t[0]),int(t[1]),0)

            road = Team.objects.get(acronym=row[2])
            home = Team.objects.get(acronym=row[3])

            Game(date=gameDate, time=gameTime, roadTeam=road, homeTeam=home).save()
    
    @staticmethod
    def stringDateToDateObject(oldDate):
        d = oldDate.split("-")
        return datetime.date(int(d[0]),int(d[1]),int(d[2]))