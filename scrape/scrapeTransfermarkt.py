import requests
from bs4 import BeautifulSoup

import pandas as pd

headers = {'User-Agent': 
           'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}

base_url = "https://www.transfermarkt.us"
league_url = "https://www.transfermarkt.us/premier-league/startseite/wettbewerb/GB1"

pageTree = requests.get(league_url, headers=headers)
pageSoup = BeautifulSoup(pageTree.content, 'html.parser')

def get_teams():
    team_links = []
    table = pageSoup.find("table", { "class" : "items" })

    #print (table.findAll("tr")[0].find("a", { "class" : "items" })

    for team in table.findAll("a", { "class" : "vereinprofil_tooltip" }, href=True):
        teamurl = base_url + team['href']
        if teamurl not in team_links:
            #print (teamurl)
            team_links.append(teamurl)

    #print('\n'.join(team_links))
    return team_links

def get_players(teams):
    player_links = []
    for team_url in teams:
        print("getting players from: " + team_url)
        pageTree = requests.get(team_url, headers=headers)
        pageSoup = BeautifulSoup(pageTree.content, 'html.parser')
        table = pageSoup.find("table", { "class" : "items" })

        for team in table.findAll("a", { "class" : "spielprofil_tooltip" }, href=True):
            playerurl = base_url + team['href']
            if playerurl not in player_links:
                #print (playerurl)
                player_links.append(playerurl)

    #print('\n'.join(player_links))
    return player_links


teams = get_teams()
players = get_players(teams)