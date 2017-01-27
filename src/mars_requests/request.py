#!/usr/bin/env python
from ecmwfapi import ECMWFDataServer
server = ECMWFDataServer()
server.retrieve({
    "class": "ei",
    "dataset": "interim",
    "date": "1996-11-01/to/2016-10-31",
    "expver": "1",
    "grid": "0.001/0.001",
	"area": "47.368/6.800/45.866/10.399",
    "levtype": "sfc",
    "param": "33.128/141.128/144.128/165.128/166.128/167.128/189.128/238.128",
    "step": "12",
    "stream": "oper",
    "time": "00:00:00/12:00:00",
    "type": "fc",
    "target": "data.grb",
})
