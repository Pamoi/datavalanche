from multiprocessing import Pool
from math import ceil, floor
from ecmwfapi import ECMWFDataServer
import pandas as pd
from datetime import date
import helpers

def parsedate(ts):
    return date.fromtimestamp(int(ts))
server = ECMWFDataServer()
data = pd.read_csv('data/avalanches.csv', parse_dates=['date_posix_ts'], date_parser=parsedate)
params = []
for i in range(0, data.shape[0]):
	[lat, lon] = helpers.CH1903toWGS1984(data.loc[i]['starting_zone_X'], data.loc[i]['starting_zone_Y'])
	area = str(ceil(lat*1000)/1000)+'/'+str(floor(lon*1000)/1000)+'/'+str(floor(lat*1000)/1000)+'/'+str(ceil(lon*1000)/1000)
	target = './data/grib/avalanche'+str(i)+'.grb'
	params.append({'area': area, 'target': target})

def f(params):
    
	
	server.retrieve({
	    "class": "ei",
	    "dataset": "interim",
	    "date": "1996-11-01/to/2016-10-31",
	    "expver": "1",
	    "grid": "0.001/0.001",
	    "area": params['area'],
	    "levtype": "sfc",
	    "param": "33.128/141.128/144.128/165.128/166.128/167.128/189.128/238.128",
	    "step": "12",
	    "stream": "oper",
	    "time": "00:00:00/12:00:00",
	    "type": "fc",
	    "target": params['target'],
	})
if __name__ == '__main__':
    with Pool(16) as p:
        p.map(f, params)


