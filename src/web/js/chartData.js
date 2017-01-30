// Avalanche victims per winter chart
var ctx = $("#deathChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1996/97', '1997/98', '1998/99', '1999/00', '2000/01', '2001/02',
    '2002/03', '2003/04', '2004/05', '2005/06', '2006/07', '2007/08',
    '2008/09', '2009/10', '2010/11', '2011/12', '2012/13', '2013/14',
    '2014/15', '2015/16'],
    datasets: [{
      label: 'Avalanche victims per winter',
      data: [24, 14, 36, 18, 32, 24, 20, 11, 26, 24, 21, 11, 28, 29, 26, 19, 22, 22, 33, 21],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }]
    },
    elements: {
      rectangle: {
        backgroundColor: 'rgba(215, 215, 215, 0.7)',
        borderColor: 'rgba(250, 250, 250, 1)',
        borderWidth: 0
      }
    },
    legend: {
      labels: {
        fontColor: '#f6f6f6',
        fontSize: 20,
        fontFamily: 'Lato',
        fontStyle: 'bold',
        boxWidth: 0
      }
    }
  }
});

// Avalanches per orientation chart
ctx2 = $('#orientationChart');
new Chart(ctx2, {
  data: {
    datasets: [{
      label: 'Mortal avalanches per orientation',
      data: [50, 28, 46, 9, 25, 16, 25, 11, 16, 1, 20, 10, 20, 19, 38, 24]
    }],
    labels: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  },
  type: 'polarArea',
  options: {
    title: {
      display: true,
      text: 'Mortal avalanches per orientation',
      fontSize: 20,
      fontColor: '#f6f6f6',
      fontFamily: 'Lato'
    },
    startAngle: -0.5*Math.PI-Math.PI/16,
    elements: {
      arc: {
        backgroundColor: 'rgba(215, 215, 215, 0.5)',
        borderColor: 'rgba(250, 250, 250, 0.9)',
        borderWidth: 2
      }
    },
    legend: {
      labels: {
        fontSize: 0,
        boxWidth: 0
      }
    },
    scale: {
      gridLines: {
        color: 'rgba(255, 255, 255, 0.4)'
      },
      ticks: {
        fontColor: '#000000',
        fontSize: 15,
        fontFamily: 'Lato',
        //showLabelBackdrop: false
        backdropColor: 'rgba(255, 255, 255, 0.5)'
      }
    }
  }
});

// Altitude chart
var ctx = $("#altitudeChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ 500,  750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000,
       3250, 3500, 3750, 4000],
    datasets: [{
      label: 'Histogram of mortal avalanche altitude',
      data: [ 1,  0,  0,  8, 13, 26, 65, 70, 60, 61, 22, 15,  9,  9],
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        title: function(items) {
          var item = items[0];
          return item.xLabel + '-' + (parseInt(item.xLabel) + 250) + ' m';
        },
        label: function(item, data) {
          return 'Number of avalanches: ' + data.datasets[item.datasetIndex].data[item.index];
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }]
    },
    elements: {
      rectangle: {
        backgroundColor: 'rgba(215, 215, 215, 0.7)',
        borderColor: 'rgba(250, 250, 250, 1)',
        borderWidth: 0
      }
    },
    legend: {
      labels: {
        fontColor: '#f6f6f6',
        fontSize: 20,
        fontFamily: 'Lato',
        fontStyle: 'bold',
        boxWidth: 0
      }
    }
  }
});

var ctx = $("#humanChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: 'Mortal avalanches per risk level',
      data: [7, 100, 189, 15, 2],
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        title: function(items) {
          var item = items[0];
          return 'Avalanche risk ' + item.xLabel;
        },
        label: function(item, data) {
          return 'Number of avalanches: ' + data.datasets[item.datasetIndex].data[item.index];
        }
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#f6f6f6',
          fontSize: 18,
          fontFamily: 'Lato'
        },
        gridLines: {
          color: 'rgba(170, 170, 170, 0.4)'
        }
      }]
    },
    elements: {
      rectangle: {
        backgroundColor: 'rgba(215, 215, 215, 0.7)',
        borderColor: 'rgba(250, 250, 250, 1)',
        borderWidth: 0
      }
    },
    legend: {
      labels: {
        fontColor: '#f6f6f6',
        fontSize: 20,
        fontFamily: 'Lato',
        fontStyle: 'bold',
        boxWidth: 0
      }
    }
  }
});
