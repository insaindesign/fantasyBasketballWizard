"""fantasyBasketballWizard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from wizard import views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('gamesremaining/', views.GamesRemaining.as_view()), #this maps that url to our games remaining class
    path('teams/', views.AllTeams.as_view()),
    path('gamestoday/', views.TotalGamesToday.as_view()),
    path('loadteams/', views.LoadTeams.as_view()),
    path('loadweeks/', views.LoadWeeks.as_view()),
    path('loadgames/', views.LoadGames.as_view()),
    path('deletegames/', views.DeleteGames.as_view()),
    path('gamesthisweek/',views.GamesThisWeek.as_view()),
    path('addplayer/', views.AddPlayer.as_view()),
    path('deleteplayers/', views.DeleteAllPlayers.as_view()),
    path('getplayer/', views.GetPlayerStats.as_view()),
    path('getweek/', views.GetWeekFromDate.as_view())
]
static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns = format_suffix_patterns(urlpatterns)
