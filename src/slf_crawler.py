import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import re
import requests
import json
import datetime

def parse_dates(data_string):
    def create_date(match):
        return '"' + match.group(1) + "-" + match.group(2) + "-" + match.group(3) + '"'

    return re.sub(r"new Date\((\d+),(\d+),(\d+)\)", create_date, data_string)

SLF_DATA_URL = 'http://www.slf.ch/praevention/lawinenunfaelle/unfaelle_langj/index_EN'

# Get HTML page
r = requests.get(SLF_DATA_URL)
#soup = BeautifulSoup(r.text, 'html.parser')

# Extract data
pattern = re.compile(r"addRows\((\[.*\])\);", re.DOTALL)
match = re.search(pattern, r.text)
if match:
    data_string = match.group(1)
    data_string = parse_dates(data_string)
    data = json.loads(data_string)
    print(data)
else:
    print('Could not find data in page !')
