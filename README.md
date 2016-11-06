# datavalanche

## Abstract

The goal of our project is to highlight the causes of avalanches which kill around 30 people per year in Switzerland. To do so we plan to use public data on mortal avalanche accidents available on the Schnee- und Lawinenforschung's website.

The next step would be to join this data with meteo data from the few days preceding an accident as the weather plays a major role in the formation of fragile snow layers.

Once the data is collected and pre-processed the project could follow two directions:

Apply machine learning techniques in order to improve avalanche risk prediction
Build an interactive visualisation of our data to sensitize people to avalanche risk
Data description

(All the data mentioned in this section is referenced in the links above)

Avalanche data from the Swiss Avalanche Foundation. Contains entries for every fatal avalanche in the last 20 years (359 avalanches). Contains the date, location, starting point, elevation, activity (e.g. off-piste skiing), victims, and danger-level that day.
Avalanche data from data-avalanche.org
Meteo data from ECMWF
Meteorological data might be slightly harder: the HISTALP data looked promising, however Switzerland is not a part of it, and it's only monthly data anyway. The Meteoswiss website is very confusing. There is some stuff on opendata.swiss, which in the end links to this: http://data.geo.admin.ch/ which isn't the clearest organisation either. Maybe we should directly contact Meteoswiss? I found this: data.geo.admin.ch/ch.meteoschweiz.swissmetnet/VQHA69.csv it is the data from all the swiss stations at 15:50 today (at least when I checked). How do we get all the data?
Feasibility and Risks

Meteo data seems a bit challenging to obtain and process. In case this part should not work we can still work on useful visualisation with the already available information such as location, altitude, orientation, avalanche risk, time of day, date. Moreover less fine grained data could be easier to find and process but only gives an estimation on the total amount of snow. Finally not using meteo data could allow us to use avalanche data from multiple sources as we will have more time to combine it.

## Deliverables

At the end of the project, depending on the data that we manage to collect and also on the results that we will obtain, we will provide an interactive visualization of the results obtained.
Different possibilities come to mind such as:
- Visualization of most likely places to encounter avalanches  
- Estimates of the accuracy of avalanches risks according to past data and meteorological conditions 
- ...
- ...

## Timeplan

These are the main milestones that we want to achieve. 

1) Gather meteorological data from ECMWF in regions of interests
2) Gather avalanche data from  www.slf.ch
3) Prepare and clean the data
4) Explanatory data analysis
5) Try some ML techniques to estimate avalanche risks (Might take a while)
6) Once suitable results are obtained, we can start on the visualization task


We estimate between one and two weeks per task, obviously some might take longer than others.


## Links and reference

Some links:

  * Avalanche data: www.slf.ch/praevention/lawinenunfaelle/index_EN

  * HISTALP (meteoroligcal data for the greater alpine region): http://www.zamg.ac.at/histalp/

  * Meteoswiss data page: http://www.meteosuisse.admin.ch/home/climat/passe.html

  * ECMWF Meteo datasets: http://apps.ecmwf.int/datasets/

  * opendata.swiss page for meteo: https://opendata.swiss/en/organization/bundesamt-fur-meteorologie-und-klimatologie-meteoschweiz

Some papers:

  * _Landslide susceptibility assessment using SVM machine learning algorithm_ https://www.researchgate.net/profile/Vit_Voenilek/publication/251557654_Landslide_susceptibility_assessment_using_SVM_machine_learning_algorithm/links/544ce1930cf2bcc9b1d8a407.pdf (About landslides, so not exactly the same but we can probably take some stuff from it.)
  * _Applying machine learning methods to avalanche forecasting_ https://www.researchgate.net/profile/Mikhail_Kanevski/publication/233598351_Applying_machine_learning_methods_to_avalanche_forecasting/links/0a85e531ee55d966b4000000.pdf (Written by two researchers from UNIL and one from University of Zürich. One of the former is still at UNIL, we might be able to contact him.)
  * _Robust snow avalanche detection using supervised machine learning
with infrasonic sensor arrays_ http://ac.els-cdn.com/S0165232X14002419/1-s2.0-S0165232X14002419-main.pdf?_tid=bb2b6f80-a046-11e6-9889-00000aacb35e&acdnat=1478013813_16ac65234852a2a05fcc0558200d7b66 (Not on the exact same subject but also written by Swiss researchers. Might be a useful reference.)
