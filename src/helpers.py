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

def grib_to_dataframe(grbs, nbMessages=-1):
    import pandas as pd
    #number of messages
    if(nbMessages < 0):
        nbMessages = grbs.messages
    #number of coordinate points
    nbPoints = grbs[1].latlons()[0].size
    searchingParameters = True
    parameters = []
    i = 1
    while(searchingParameters):
        #parameter of the current message
        param = grbs[i]['parameterName']
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

    latitudes = grbs[1].latlons()[0].flatten()
    longitudes = grbs[1].latlons()[1].flatten()
        
    #fill the dataframe
    for m in range(0, nbMessages):
        message = grbs[m+1]
        data = message.data()[0].flatten()
        for p in range(0, nbPoints):
            row = (m // nbParams)*nbPoints + p
            if (m % nbParams == 0):
                df.loc[row]['Date'] = message.validDate
                df.loc[row]['Latitude'] = latitudes[p]
                df.loc[row]['Longitude'] = longitudes[p]
            df.loc[row][message['parameterName']] = data[p]
    return df