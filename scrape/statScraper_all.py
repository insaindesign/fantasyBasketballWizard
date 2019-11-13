from lxml import html
import requests
import json
import random
from datetime import datetime, date, timedelta
import pandas as pd
from selenium import webdriver
from collections import OrderedDict
import os
import time

this_season = False

#delete players
requests.get("https://www.sportswzrd.com/sreyalpllaeteled")

login_url = "https://login.yahoo.com/config/login?.src=fantasy&specId=usernameRegWithName&.intl=us&.lang=en-US&.done=https://basketball.fantasysports.yahoo.com/nba"

players_url = "https://basketball.fantasysports.yahoo.com/nba/150338/players?&sort=OR&sdir=1&status=ALL&pos=P&stat1=S_PSR&myteam=1&jsenabled=1"


#load and init chromedriver
chromedriver = "./chromedriver"
os.environ["webdriver.chrome.driver"] = chromedriver

driver = webdriver.Chrome(chromedriver)
driver.get(login_url)

email = "kobebryant5@yahoo.com"
password = "blackmamba24"

#enter username and click 'sign in'
driver.find_element_by_id('login-username').send_keys(email)
time.sleep(.2)
driver.find_element_by_id('login-signin').click()
time.sleep(.2)

#enter password and click 'sign in'
driver.find_element_by_id('login-passwd').send_keys(password)
time.sleep(.2)
driver.find_element_by_id('login-signin').click()
time.sleep(.2)

def process_row(p_row):
    try:
        p_row.remove("")
    except:
        pass
    try:
        p_row.remove("\ue035")
    except:
        pass
    try:
        p_row.remove("FA")
    except:
        pass
    try:
        p_row.remove("GTD")
    except:
        pass
    try:
        p_row.remove("INJ")
    except:
        pass
    try:
        p_row.remove("NA")
    except:
        pass
    return p_row

def get_url(p):
    id = p['id']
    id = id.replace(" ", "")
    id = id.replace("-", "")
    id = id.replace(".", "")
    try:
        ftpct = float(p['ft%']) * 100
        ftpct = round(ftpct, 1)
        ftpct = str(ftpct)
    except:
        ftpct = "0.0"
    try:
        fgpct = float(p['fg%']) * 100
        fgpct = round(fgpct, 1)
        fgpct = str(fgpct)
    except:
        fgpct = "0.0"
    if ftpct == "100.0":
        ftpct = ".999"
    p['team'] = p['team'].upper()
    return "https://www.sportswzrd.com/addplayer/?id=" + id + \
    "&position=" + p['position'] + \
    "&team=" + p['team'] + \
    "&mpg=" + p['mpg'] + \
    "&ppg=" + p['ppg'] + \
    "&orpg=" + p['orpg'] + \
    "&drpg=" + p['drpg'] + \
    "&rpg=" + p['rpg'] + \
    "&apg=" + p['apg'] + \
    "&spg=" + p['spg'] + \
    "&bpg=" + p['bpg'] + \
    "&topg=" + p['topg'] + \
    "&ato=" + p['ato'] + \
    "&ddpg=" + p['ddpg'] + \
    "&tdpg=" + p['tdpg'] + \
    "&ftmpg=" + p['ftm'] + \
    "&ftapg=" + p['fta'] + \
    "&ftpct=" + ftpct + \
    "&fgmpg=" + p['fgm'] + \
    "&fgapg=" + p['fga'] + \
    "&fgpct=" + fgpct + \
    "&threepm=" + p['threepm'] + \
    "&threepa=" + p['threepa'] + \
    "&format=json"

def handle_val(v):
    try:
        v = float(v)
        #v = int(v)
        return v
    except:
        return 0

def handle_division(d1, d2):
    try:
        avg = handle_val(d1) / handle_val(d2)
        avg = round(avg, 1)
        avg = str(avg)
        #print('avg: ', avg)
        return avg
    except Exception as e:
        #print(e)
        #print("d1: ", d1)
        #print("d2: ", d2)
        return '0.0'

def extract_stats(players):
    p_maps = []
    for p in range(1, len(players) - 1):
        p_row = players[p].split("\n")
        p_row = process_row(p_row)
        p_map = OrderedDict()
        p_map['id'] = p_row[0].split(" - ")[0]
        p_map['position'] = p_row[0].split(" - ")[1].replace(',', '-')
        for i in range(0, len(p_row)):
            if "%" in p_row[i]:
                index = i
        print("id: ", p_map['id'])
        p_map['gp'] = p_row[index-3]
        p_map['mpg'] = '0.0'
        p_map['team'] = p_map['id'].rstrip().split(" ")[-1]
        #p_map['mpg'] = p_row[index+1]
        p_map['fgm'] = handle_division(p_row[index+1].split("/")[0],  p_map['gp'])
        p_map['fga'] = handle_division(p_row[index+1].split("/")[1],  p_map['gp'])
        p_map['fg%'] = p_row[index+2]
        p_map['ftm'] = handle_division(p_row[index+3].split("/")[0],  p_map['gp'])
        p_map['fta'] = handle_division(p_row[index+3].split("/")[1],  p_map['gp'])
        p_map['ft%'] = p_row[index+4]
        p_map['threepa'] = handle_division(p_row[index+5],  p_map['gp'])
        p_map['threepm'] = handle_division(p_row[index+6],  p_map['gp'])
        p_map['ppg'] = handle_division(p_row[index+8],  p_map['gp'])
        p_map['orpg'] = handle_division(p_row[index+9],  p_map['gp'])
        p_map['drpg'] = handle_division(p_row[index+10],  p_map['gp'])
        p_map['rpg'] = handle_division(p_row[index+11],  p_map['gp'])
        p_map['apg'] = handle_division(p_row[index+12],  p_map['gp'])
        p_map['spg'] = handle_division(p_row[index+13],  p_map['gp'])
        p_map['bpg'] = handle_division(p_row[index+14],  p_map['gp'])
        p_map['topg'] = handle_division(p_row[index+15],  p_map['gp'])
        p_map['ato'] = handle_division(p_map['apg'], p_map['topg'])
        p_map['ddpg'] = handle_division(p_row[index+16],  p_map['gp'])
        p_map['tdpg'] = handle_division(p_row[index+17],  p_map['gp'])
        url = get_url(p_map)
        print(p_map)
        print(url)
        print(requests.get(url).content)
        p_maps.append(p_map)
    return p_maps

page = 0
to_csv = []
while page < 400:
    driver.get(players_url + "&count=" + str(page))
    time.sleep(.2)
    stats = driver.find_elements_by_xpath('//*[@class="players"]/*')
    players = stats[0].text.split("\ue061")
    to_csv.extend(extract_stats(players))
    time.sleep(.5)    
    page += 25


to_csv = pd.DataFrame(to_csv)
to_csv.to_csv("stats_all_proj.csv", index=False)

driver.close()
