#!/usr/bin/env python
from multiprocessing import Pool
import pandas as pd
import helpers
import pygrib
import datetime
import os.path

files = []
for i in range(0, 359):
    path = './data/grib_batch_1/avalanche'+str(i)+'.grb'
    if(os.path.isfile(path)):
        files.append(path)

def f(file):
	return pre_processing(helpers.grib_to_dataframe(pygrib.open(file)))

def temp_conv(x):
    zero_kelvin = 273.15
    if(x > 100):
        return x - zero_kelvin
    elif(x < -100):
        return x + zero_kelvin
    else:
        return x

def pre_processing(df):
	columns = df.columns.drop('Date')
	for column in columns:
	   	df[column] = df[column].astype('float')
	#convert the temperature fields into degrees celsius
	df['2 metre temperature'] = df['2 metre temperature'].map(temp_conv)
	df['Temperature of snow layer'] = df['Temperature of snow layer'].map(temp_conv)
	#convert the snow depth and snow fall into meters
	df['Snow depth'] = df['Snow depth']/(df['Snow density']/1000)
	df['Snowfall'] = df['Snowfall']/(df['Snow density']/1000)
	#convert the sunshine duration into hours
	df['Sunshine duration'] = df['Sunshine duration']/3600
	#average for each place
	df = df.groupby('Date', as_index=False).mean()
	#merge the two datapoints per day into one
	df['Date'] = df['Date'].map(lambda date: datetime.datetime(date.year, date.month, date.day))
	agg_functions = {}
	agg_functions.update(dict.fromkeys(df.columns.drop(['Date', 'Snowfall']), 'mean'))
	agg_functions.update(dict.fromkeys(['Snowfall'], 'sum'))
	df = df.groupby('Date', as_index=False).agg(agg_functions)
	return df

if __name__ == '__main__':
	with Pool(16) as p:
		dfs = p.map(f, files)
		meteo_data = dfs[0]
		for i in range(1, len(dfs)):
			meteo_data = meteo_data.append(dfs[i])
		meteo_data = meteo_data.set_index([list(range(0, meteo_data.shape[0]))])
		meteo_data.to_pickle('./data/meteo_data.pkl')



