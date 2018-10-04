from django.db import models
from django.utils import timezone
import datetime
import pytz

# Create your models here.

# this is basically an API for the database. these are python objects that eventually
# get converted and stored in the database using some type of save method.
# they extend the class Model which is a django base model.
# we need to design these properly to store the schedule and other statistic info

class Week(models.Model):
    weekNum = models.IntegerField(primary_key=True)
    startDate = models.DateField()
    endDate = models.DateField()

    def __str__(self):
        return "Week " + str(self.weekNum) + ": " + str(self.startDate) + " through " + str(self.endDate)

class Team(models.Model):
    name = models.CharField(max_length=15)
    city = models.CharField(max_length=25)
    acronym = models.CharField(primary_key=True,max_length=3)

    def __str__(self):
        return self.city + " " + self.name + " "

class Game(models.Model):
    time = models.TimeField()
    date = models.DateField()
    roadTeam = models.ForeignKey(Team, related_name='roadTeam', on_delete=models.CASCADE)
    homeTeam = models.ForeignKey(Team, related_name='homeTeam', on_delete=models.CASCADE)
    week = models.ForeignKey(Week, related_name='week', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.roadTeam) + " @ " + str(self.homeTeam) + " - " + str(self.time) + " " + str(self.date)

class Player(models.Model):
    playerID = models.CharField(max_length=60)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    ppg = models.DecimalField(max_digits=3, decimal_places=1)
    rpg = models.DecimalField(max_digits=3, decimal_places=1)
    apg = models.DecimalField(max_digits=3, decimal_places=1)
    spg = models.DecimalField(max_digits=2, decimal_places=1)
    bpg = models.DecimalField(max_digits=2, decimal_places=1)
    topg = models.DecimalField(max_digits=2, decimal_places=1)
    ftmpg = models.DecimalField(max_digits=3, decimal_places=1)
    ftapg = models.DecimalField(max_digits=3, decimal_places=1)
    ftpct = models.DecimalField(max_digits=3, decimal_places=1)
    fgapg = models.DecimalField(max_digits=3, decimal_places=1)
    fgmpg = models.DecimalField(max_digits=3, decimal_places=1)
    fgpct = models.DecimalField(max_digits=3, decimal_places=1)
    threepg = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        return str(self.playerID)

class UseType(models.Model):
    pageName = models.CharField(max_length=100)

    def __str__(self):
        return self.pageName

class Use(models.Model):
    timeStamp = models.DateTimeField(default = timezone.now)
    timeZone = models.CharField(max_length=25, default=timezone.get_current_timezone_name())
    useType = models.ForeignKey(UseType, on_delete=models.CASCADE)
    queryString = models.CharField(max_length=500)
    leagueID = models.CharField(max_length=15, null=True)

    def __str__(self):
        return str(self.useType) + " " + str(self.timeStamp)
