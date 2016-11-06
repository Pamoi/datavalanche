# datavalanche

## Abstract

The goal of our project is to highlight the causes of avalanches which kill around 30 people per year in Switzerland. To do so we plan to use public data on mortal avalanche accidents available on the Schnee- und Lawinenforschung's website.

The next step would be to join this data with meteo data from the few days preceding an accident as the weather plays a major role in the formation of fragile snow layers.

Once the data is collected and pre-processed the project could follow two directions:

- Apply machine learning techniques in order to improve avalanche risk prediction
- Build an interactive visualisation of our data to sensitize people to avalanche risk

## Data description

Links to data sources are in the Links and references section.

- The avalanche data from the Swiss Avalanche Foundation contains entries for every fatal avalanche in the last 20 years (359 avalanches). It contains the date, location, starting point, elevation, activity (e.g. off-piste skiing), victims, and danger-level that day.
- There is also avalanche data from data-avalanche.org in a similar format.
- Daily meteo data from ECMWF in GRIB format.
- The might be some meteo data on http://data.geo.admin.ch/ but it is not very clear what is available. It may also be possble to obtain some data from MeteoSwiss.

## Feasibility and Risks

Meteo data seems a bit challenging to obtain and process. In case this part should not work we can still work on useful visualisation with the already available information such as location, altitude, orientation, avalanche risk, time of day, date. However the machine learning approach would be compromised as we cannot reliably predict avalanches without taking meteo into account. Nevertheless less fine grained data could be easier to find and process but would only give an estimation of the total amount of snow. Finally not using meteo data could allow us to use avalanche data from multiple sources as we will have more time to combine it.

## Deliverables

Depending on the direction we take the project's outcome would take different shapes:

- If we obtain substantial results with machine learning we will develop a simple web portal or mobile app where a user can enter terrain observations and get an estimation of the avalanche risk.

- If going for a visualisation project the outcome would be a website presenting the various causes of avalanches illustrated by data visualisation to sensitize users to snow dangers.

## Timeplan

These are the main milestones that we want to achieve. 

1. Gather meteorological data from ECMWF in regions of interests
2. Gather avalanche data from  www.slf.ch
3. Prepare and clean the data
4. Explanatory data analysis
5. Try some ML techniques to estimate avalanche risks (Might take a while)
6. Once suitable results are obtained, we can start on the visualization task


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
