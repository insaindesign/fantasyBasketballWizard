from lxml import html
import requests
import pandas as pd
from time import sleep
import re

team_url_suffix = []

domain = "https://www.espn.com"
first_url = domain + "/nba/team/roster/_/name/atl/atlanta-hawks"

page = requests.get(first_url, timeout=3)
tree = html.fromstring(page.content)

urls = tree.xpath('//*[@class="dropdown dropdown--md h-100 pageHeading__team-stats-dropdown"]//@data-url')

def process_player_cells(cells):
    rows = pd.DataFrame()
    names = []
    jersey_nums = []
    positions = []
    ages = []
    heights = []
    weights = []
    colleges = []
    salaries = []
    
    cells = cells[1:]
    row = []
    c = 0
    
    while c < len(cells):
        s = cells[c].text_content()
        jersey_nums.append(re.match('.*?([0-9]+)$', s).group(1))
        names.append(cells[c].text_content())
        #jersey_nums.append(cells[c+1].text_content())
        positions.append(cells[c+1].text_content())
        ages.append(cells[c+2].text_content())
        heights.append(cells[c+3].text_content())
        weights.append(cells[c+4].text_content())
        colleges.append(cells[c+5].text_content())
        salaries.append(cells[c+6].text_content())
        c += 7
        while c < len(cells) and cells[c].text_content() == '': c += 1

    rows['names'] = pd.Series(names)
    rows['jersey_nums'] = pd.Series(jersey_nums)
    rows['positions'] = pd.Series(positions)
    rows['ages'] = pd.Series(ages)
    rows['heights'] = pd.Series(heights)
    rows['weights'] = pd.Series(weights)
    rows['colleges'] = pd.Series(colleges)
    rows['salaries'] = pd.Series(salaries)
    print(rows)
    return rows
                       
cities = []
teamNames = []
                       
for u in urls:
    print("scraping ", domain + u)
    page = requests.get(domain + u, timeout=3)
    tree = html.fromstring(page.content)

    city = tree.xpath('//*[@class="flex flex-wrap"]//text()')[0]
    teamName = tree.xpath('//*[@class="flex flex-wrap"]//text()')[1]
                       
    player_cells = tree.xpath('//*[@class="Table2__table-scroller Table2__table"]//td')
    tempLeague = process_player_cells(player_cells)
    cities.append([city] * len(tempLeague))
    teamNames.append([city] * len(tempLeague))
    
    tempLeague.to_csv("player_info/" + teamName + "_roster.csv", index=False)

    sleep(3)

#create league of all teams
#leage = pd.DataFrame()
#cities = pd.Series(cities)
#teamNames = pd.Series(teamNames)
#league.insert(0, teamNames)
#league.insert(0, cities)
