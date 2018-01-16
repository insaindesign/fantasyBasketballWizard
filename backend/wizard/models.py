from django.db import models

# Create your models here.
class YahooStats(models.Model):
    myTeamUses = models.IntegerField()
    averageStatUses = models.IntegerField()
    ResearchPageUses = models.IntegerField()
    TransactionTrendsPageUses = models.IntegerField()

    def __str__(self):
        return "Yahoo Stats object id: " + self.ID

class ESPNStats(models.Model):
    myTeamuses = models.IntegerField()

class Test(models.Model):
    name = models.CharField(max_length=100)