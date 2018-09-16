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

login_url = "https://login.yahoo.com/config/login?.src=fantasy&specId=usernameRegWithName&.intl=us&.lang=en-US&.done=https://basketball.fantasysports.yahoo.com/nba"

players_url = "https://basketball.fantasysports.yahoo.com/nba/23790/players?status=ALL"

page = 0

#load and init chromedriver
chromedriver = "/Users/alexdoria/Downloads/chromedriver"
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



def extract_stats(players):
    p_maps = []
    for p in range(1, len(players) - 1):
        p_row = players[p].split("\n")
        p_row = process_row(p_row)
        #print("player: ", p_row)
        p_map = OrderedDict()
        p_map['id'] = p_row[0].split("-")[0]
        p_map['position'] = p_row[0].split("-")[1]
        for i in range(0, len(p_row)):
            if "%" in p_row[i]:
                index = i
        print("id: ", p_map['id'])
        p_map['team'] = p_map['id'].rstrip().split(" ")[-1]
        p_map['mpg'] = p_row[index+1]
        p_map['fgm'] = p_row[index+2].split("/")[0]
        p_map['fga'] = p_row[index+2].split("/")[1]
        p_map['fg%'] = p_row[index+3]
        p_map['ftm'] = p_row[index+4].split("/")[0]
        p_map['fta'] = p_row[index+4].split("/")[1]
        p_map['ft%'] = p_row[index+5]
        p_map['threepg'] = p_row[index+6]
        p_map['ppg'] = p_row[index+7]
        p_map['rpg'] = p_row[index+8]
        p_map['asg'] = p_row[index+9]
        p_map['spg'] = p_row[index+10]
        p_map['bpg'] = p_row[index+11]
        p_map['topg'] = p_row[index+12]
        print(p_map)
        p_maps.append(p_map)
    return p_maps

to_csv = []
while page < 300:
    
    driver.get(players_url + "&count=" + str(page))

    stats = driver.find_elements_by_xpath('//*[@class="players"]/*')

    players = stats[0].text.split("\ue061")

    to_csv.extend(extract_stats(players))
    
    time.sleep(.5)
    
    page += 25


to_csv = pd.DataFrame(to_csv)
to_csv.to_csv("stats.csv", index=False)

driver.close()
