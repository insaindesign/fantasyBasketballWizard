from django.db import models

# Create your models here.
# this is basically an API for the database. these are python objects that eventually
# get converted and stored in the database using some type of save method.
# they extend the class Model which is a django base model.
# we need to design these properly to store the schedule and other statistic info
class YahooUse(models.Model):
    
    myTeamUses = models.IntegerField()
    averageStatUses = models.IntegerField()
    ResearchPageUses = models.IntegerField()
    TransactionTrendsPageUses = models.IntegerField()


class ESPNStats(models.Model):
    myTeamuses = models.IntegerField()

class Week(models.Model):
    weekNum = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField()

class Day(models.Model):
    date = models.DateField()
    

class Team(models.Model):
    teamName = models.CharField(max_length=15)
    teamCity = models.CharField(max_length=25)
class Game(models.Model):
    time = models.TimeField()
    date = models.DateField()
    roadTeam = models.ForeignKey(Team,related_name='roadTeam',on_delete=models.CASCADE)
    homeTeam = models.ForeignKey(Team,related_name='homeTeam',on_delete=models.CASCADE)


    