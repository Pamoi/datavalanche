def CHtoWGSlat(x,y):
    """
    Convert CH1903 system to WGS1984 system (latitude)
 
    :param x: northing
    :param y: easting
    :return: latitude in WGS1984 system
 
    """
    x_aux = (x - 200000) / 1000000
    y_aux = (y - 600000) / 1000000
 
    lat = (16.9023892 + (3.238272 * x_aux)) \
          - (0.270978 * pow(y_aux, 2)) \
          - (0.002528 * pow(x_aux, 2)) \
          - (0.0447 * pow(y_aux, 2) * x_aux) \
          - (0.0140 * pow(x_aux, 3))
 
    lat = (lat * 100) / 36
 
    return lat
 
def CHtoWGSlng(x,y):
    """
    Convert CH1903 system to WGS1984 system (longitude)
 
    :param x: northing
    :param y: easting
    :return: longitude in WGS1984 system
 
    """
    x_aux = (x - 200000) / 1000000
    y_aux = (y - 600000) / 1000000
 
    lng = (2.6779094 + (4.728982 * y_aux) + (0.791484 * y_aux * x_aux) +
           (0.1306 * y_aux * pow(x_aux, 2))) - (0.0436 * pow(y_aux, 3))
 
    lng = (lng * 100) / 36
 
    return lng
 
def CH1903toWGS1984(x, y):
  """Converts coordinates from CH1903_LV03 to WGS1984 adopting the code taken from
     method from http://www.swisstopo.admin.ch/internet/swisstopo/de/home/products/software/products/skripts.html
 
     :param x: x coordinates in degrees in CH1903 (northing)
     :param y: y coordinates in degrees in CH1903 (easting)
     :return: a pair containing the latitude and longitude of the given coordinates, respectively"""
 
  lat = CHtoWGSlat(x, y)
  lng = CHtoWGSlng(x, y)
 
  return [lat, lng]
def find_avalanche(avalanche_data, community, date, date_column='date', community_column='community'):
    """Check in the provided data if there was an avalanche at the given time in the given community
    
    :param avalanche_data: data about avalanche, should be a Pandas dataframe containing the community 
    in which the avalanche occurred in a string column called community_column and the date in a column
    called date_colum, which should be of any type having a .timestamp() method
    :param community_column: the name of the column in avalanche_data containing the community
    :param community: the name of the community for which we want to know whether an avalanche occurred
    :param date_column: the name of the column in avalanche_date containing the date
    :param date: the date at which we want to know whether an avalanche occurred, should be any type with
    a .timestamp() method
    :return: a Boolean indicating whether an avalanche occurred"""
    return avalanche_data[(avalanche_data[community_column] == community) & (avalanche_data[date_column].map(lambda x: x.timestamp()) == date.timestamp())].size > 0
def date_to_winter(date):
    """Converts a datetime object into a string indicating which winter it refers to
    
    :param date: a datetime object
    :return: a string indicating a winter (for example '1994-1995'"""
    if(date.month > 6):
        return str(date.year) + '-' + str(date.year + 1)
    else:
        return str(date.year - 1) + '-' + str(date.year)
def grib_to_dataframe(grbs, nbMessages=-1):
    """Converts a pygrib.open object into a dataframe with one row per place and time
    
    :param grbs: a pygrib.open object
    :param nbMessages: the number of messages that should be processed. If no argument is passed, will process all of them
    :return: a pandas dataframe containting the data. Each row contains every parameter for one set of coordinates and date"""
    import pandas as pd
    #number of messages
    if(nbMessages < 0):
        nbMessages = grbs.messages
    #number of coordinate points
    nbPoints = grbs.message(1).latlons()[0].size
    searchingParameters = True
    parameters = []
    i = 1
    while(searchingParameters):
        #parameter of the current message
        param = grbs.message(i)['parameterName']
        #if don't already have it, add it to the list
        searchingParameters = param not in parameters
        if(searchingParameters):
            parameters.append(param)
        i += 1
    nbParams = len(parameters)
    #there is one row for each point in time and in space
    nbRows = int(nbPoints*nbMessages/nbParams)
    rows = range(0, nbRows)
    columns = ["Date", "Latitude", "Longitude"] + parameters
    #create an empty DataFrame
    df = pd.DataFrame(columns=columns, index=rows)

    latitudes = grbs.message(1).latlons()[0].flatten()
    longitudes = grbs.message(1).latlons()[1].flatten()
        
    #fill the dataframe
    for m in range(0, nbMessages):
        message = grbs.message(m+1)
        data = message.data()[0].flatten()
        for p in range(0, nbPoints):
            row = (m // nbParams)*nbPoints + p
            if (m % nbParams == 0):
                df.loc[row]['Date'] = message.validDate
                df.loc[row]['Latitude'] = latitudes[p]
                df.loc[row]['Longitude'] = longitudes[p]
            df.loc[row][message['parameterName']] = data[p]
    return df