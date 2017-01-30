# datavalanche

## Abstract

The goal of our project is to highlight the causes of avalanches which kill around 30 people per year in Switzerland. We use a public data on mortal avalanche accidents available on the Schnee- und Lawinenforschung's website: http://www.slf.ch/praevention/lawinenunfaelle/unfaelle_langj/index_EN.

We also use weather data from the few days preceding an accident as the weather plays a major role in the formation of fragile snow layers. For this we use the data available at: http://apps.ecmwf.int/datasets/data/interim-full-daily/levtype=sfc/

Those datasets allow us to explore the different factors involved in avalanches with different visualizations.  

## Data description

Links to data sources are in the Links and references section.

- The avalanche data from the Swiss Avalanche Foundation contains entries for every fatal avalanche in the last 20 years (359 avalanches). It contains the date, location, starting point, elevation, activity (e.g. off-piste skiing), victims, and danger-level that day.
- There is also avalanche data from data-avalanche.org in a similar format.
- Daily weather data from ECMWF in GRIB format.
- The might be some weather data on http://data.geo.admin.ch/ but it is not very clear what is available. It may also be possible to obtain some data from weatherSwiss.

## Problems and Solutions

Crawling the data for both weather and avalanches is the first difficulty encountered. For this reason different scripts are implemented on in javascript: `avalanche_data_processor.js` which allow us to get the html table as a pandas dataframe. The python script: `all_request.py` allows the querying of the weather data, this was very time consuming (several days to get the whole dataset) since it was using a special library and data format. The python script: `pre_processing.py` then transformed the GRIB files into pandas dataframes. This was also quite long.
Once this was done we regrouped everything in the `datavalanche.ipynb` notebook and proceeded to do some exploratory data analysis to later produce different visualizations. This includes different plots of weather data, avalanches data and 2 different interactive maps.

Finally we created a HTML webpage containing the main findings:
 http://htmlpreview.github.io/?https://github.com/Pamoi/datavalanche/blob/master/src/web/index.html 

## Deliverables

- The `datavalanche.ipynb` with the different visualizations. 

- Am homemade fancy HTML webpage with nice graphs and visualizations showing the main discoveries of our research:
 http://htmlpreview.github.io/?https://github.com/Pamoi/datavalanche/blob/master/src/web/index.html

## Timeplan

These are the main milestones that we want to achieve. 

1. Gather meteorological data from ECMWF in regions of interests
2. Gather avalanche data from  www.slf.ch
3. Prepare and clean the data
4. Explanatory data analysis
5. Once suitable results are obtained, we can start on the visualization task


We estimate between one and two weeks per task, obviously some might take longer than others.


## Links and reference

Some links:

  * Avalanche data: www.slf.ch/praevention/lawinenunfaelle/index_EN

  * HISTALP (weatherroligcal data for the greater alpine region): http://www.zamg.ac.at/histalp/

  * weatherswiss data page: http://www.weathersuisse.admin.ch/home/climat/passe.html

  * ECMWF weather datasets: http://apps.ecmwf.int/datasets/

  * opendata.swiss page for weather: https://opendata.swiss/en/organization/bundesamt-fur-weatherrologie-und-klimatologie-weatherschweiz

Some papers:

  * _Landslide susceptibility assessment using SVM machine learning algorithm_ https://www.researchgate.net/profile/Vit_Voenilek/publication/251557654_Landslide_susceptibility_assessment_using_SVM_machine_learning_algorithm/links/544ce1930cf2bcc9b1d8a407.pdf (About landslides, so not exactly the same but we can probably take some stuff from it.)
  * _Applying machine learning methods to avalanche forecasting_ https://www.researchgate.net/profile/Mikhail_Kanevski/publication/233598351_Applying_machine_learning_methods_to_avalanche_forecasting/links/0a85e531ee55d966b4000000.pdf (Written by two researchers from UNIL and one from University of Zürich. One of the former is still at UNIL, we might be able to contact him.)
  * _Robust snow avalanche detection using supervised machine learning
with infrasonic sensor arrays_ http://ac.els-cdn.com/S0165232X14002419/1-s2.0-S0165232X14002419-main.pdf?_tid=bb2b6f80-a046-11e6-9889-00000aacb35e&acdnat=1478013813_16ac65234852a2a05fcc0558200d7b66 (Not on the exact same subject but also written by Swiss researchers. Might be a useful reference.)
