from django.db import models
import datetime
import pytz

# Create your models here.

# this is basically an API for the database. these are python objects that eventually
# get converted and stored in the database using some type of save method.
# they extend the class Model which is a django base model.
# we need to design these properly to store the schedule and other statistic info

#the types of pages that users can make a use of. will be a foriegn key in YahooUse
class YahooUseType(models.Model):
    pageName = models.CharField(max_length=25, primary_key=True)

    def __str__(self):
        return self.pk

#if we wanna keep track of Yahoo emails   
class YahooUser(models.Model):
    email = models.EmailField(primary_key=True)
    def __str__(self):
        return self.pk

class YahooUse(models.Model):
    timeStamp = models.DateTimeField(auto_now=True)
    useType = models.ForeignKey(YahooUseType,on_delete=models.CASCADE)
    user = models.ForeignKey(YahooUser,on_delete=models.CASCADE)

    def __str__(self):
        return self.useType


class ESPNUse(models.Model):
    timeStamp = models.DateTimeField(auto_now=True)
    useType = models.ForeignKey(YahooUseType,on_delete=models.CASCADE)


class Week(models.Model):
    weekNum = models.IntegerField(primary_key=True)
    startDate = models.DateField()
    endDate = models.DateField()

    def __str__(self):
        return "Week " + str(self.weekNum) + ": " + str(self.startDate) + " through " + str(self.endDate)

class Day(models.Model):
    date = models.DateField(primary_key=True)
    numberOfGames = models.IntegerField(default=0)

    def __str__(self):
        return str(self.numberOfGames) + " games on " + str(self.date)


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
    yahooPlayerID = models.IntegerField(primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    ppg = models.DecimalField(max_digits=2, decimal_places=1)
    rpg = models.DecimalField(max_digits=2, decimal_places=1)
    apg = models.DecimalField(max_digits=2, decimal_places=1)
    spg = models.DecimalField(max_digits=1, decimal_places=1)
    bpg = models.DecimalField(max_digits=1, decimal_places=1)
    topg = models.DecimalField(max_digits=1, decimal_places=1)
    ftmpg = models.DecimalField(max_digits=2, decimal_places=1)
    ftapg = models.DecimalField(max_digits=2, decimal_places=1)
    ftpct = models.DecimalField(max_digits=2, decimal_places=1)
    fgapg = models.DecimalField(max_digits=2, decimal_places=1)
    fgmpg = models.DecimalField(max_digits=2, decimal_places=1)
    gfpct = models.DecimalField(max_digits=2, decimal_places=1)
    threepg = models.DecimalField(max_digits=1, decimal_places=1)

class Test(models.Model):
    test = models.CharField(max_length=100)