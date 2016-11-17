var fs = require('fs');

var header = ['winter', 'date_posix_ts', 'canton', 'community', 'starting_zone_Y', 'starting_zone_X', 'elevation', 'aspect_id', 'aspect_string', 'activity', 'victims', 'caught', 'buried', 'danger_level'];

/*
 * Transforms an array containing avalanche data into a CSV line.
 */
function processAvalancheData(avalanche) {
  out = []
  out[0] = avalanche[0];
  // Transform date to POSIX timestamp
  out[1] = avalanche[1].getTime() / 1000.0;
  out[2] = avalanche[2];
  out[3] = avalanche[3];
  // Extract coordinates from url
  var coordinates = /Y=(\d+)&X=(\d+)/.exec(avalanche[4]);
  if (coordinates == null) {
    console.log(out[3]);
  }
  out[4] = coordinates[1];
  out[5] = coordinates[2];
  out[6] = avalanche[5];
  out[7] = avalanche[6].v;
  out[8] = avalanche[6].f;
  out[9] = avalanche[7];
  // Extract number of victims, caught people and buried people
  victims = /(\d+) \((\d+), (\d+)\)/.exec(avalanche[8]);
  out[10] = victims[1];
  out[11] = victims[2];
  out[12] = victims[3];
  out[13] = avalanche[9].v;

  return out.join(',');
}

var data = [
  ["2015/16", new Date(2016,6,4), "VS", "Baltschieder", "<a href=http://map.geo.admin.ch/?Y=631760&X=138570&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bietschhorn</a>", "3440", {v: 5, f: "E"}, "1", "1 (2, 0)", {v: 0, f: ""}],

  ["2015/16", new Date(2016,4,5), "GR", "Flims", "<a href=http://map.geo.admin.ch/?Y=737700&X=197340&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Surenjoch / Piz Sardona</a>", "2900", {v: 6, f: "ESE"}, "1", "1 (1, 1)", {v: 0, f: ""}],

  ["2015/16", new Date(2016,3,29), "VS", "Naters", "<a href=http://map.geo.admin.ch/?Y=640290&X=146390&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sattelhorn</a>", "3680", {v: 11, f: "SW"}, "1", "1 (2, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201604281700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,3,20), "GR", "Sils im Engadin/Segl", "<a href=http://map.geo.admin.ch/?Y=781510&X=135430&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Fora</a>", "2810", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201604191700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,3,19), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=570830&X=93228&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Portalet</a>", "3100", {v: 2, f: "NNE"}, "2", "1 (2, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201604181700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,3,17), "VS", "Fieschertal", "<a href=http://map.geo.admin.ch/?Y=657295&X=151555&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Galmilicke</a>", "3340", {v: 16, f: "NNW"}, "1", "1 (6, 3)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201604161700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,3,3), "GR", "Arosa", "<a href=http://map.geo.admin.ch/?Y=767520&X=181220&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Aroser Alp / Verborgnen Weng</a>", "2280", {v: 4, f: "ENE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201604030800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,2,28), "GL", "Glarus Süd", "<a href=http://map.geo.admin.ch/?Y=733710&X=206730&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gulderstock</a>", "2150", {v: 16, f: "NNW"}, "1", "1 (2, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201603271700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,2,27), "VS", "Obergoms", "<a href=http://map.geo.admin.ch/?Y=669160&X=145896&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sulzlicke / Lengtal</a>", "2440", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201603261700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,2,26), "BE", "Lenk", "<a href=http://map.geo.admin.ch/?Y=600590&X=138090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Iffigenalp / Mittaghore</a>", "1940", {v: 16, f: "NNW"}, "1", "1 (1, 0)", {v: 1, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201603251700_gk_c_en_complete.pdf' target='_blank'>1</a>"}],

  ["2015/16", new Date(2016,2,5), "GR", "Safiental", "<a href=http://map.geo.admin.ch/?Y=742770&X=163910&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Safien / Zhinderst / Höllgraben</a>", "2660", {v: 11, f: "SW"}, "1", "2 (2, 2)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201603050800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,1,27), "SZ", "Muotathal", "<a href=http://map.geo.admin.ch/?Y=698050&X=200300&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Blüemberg</a>", "1680", {v: 16, f: "NNW"}, "1", "1 (1, 0)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201602261700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,1,21), "VS", "Saas-Almagell", "<a href=http://map.geo.admin.ch/?Y=638250&X=100620&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Allalin / Hohlaubgletscher</a>", "2860", {v: 6, f: "ESE"}, "2", "1 (6, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201602201700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,0,30), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=777980&X=171790&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Büelenhorn / Monstein</a>", "2770", {v: 3, f: "NE"}, "1", "1 (3, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201601291700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,0,24), "BE", "Aeschi bei Spiez", "<a href=http://map.geo.admin.ch/?Y=625290&X=160575&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Latrejespitz</a>", "2400", {v: 15, f: "NW"}, "1", "1 (3, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201601231700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2015/16", new Date(2016,0,16), "VS", "Saxon", "<a href=http://map.geo.admin.ch/?Y=582670&X=108265&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Combe de Saxon</a>", "2250", {v: 1, f: "N"}, "2", "2 (4, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201601151700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2016,0,9), "VS", "Ried-Brig", "<a href=http://map.geo.admin.ch/?Y=647980&X=123600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bodmertälli / Mäderhorn</a>", "2543", {v: 15, f: "NW"}, "1", "2 (3, 3)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2016/nb/en/pdf/201601081700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2015/16", new Date(2015,9,24), "GR", "Poschiavo", "<a href=http://map.geo.admin.ch/?Y=794532&X=139453&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Palü / Vadret da Palü</a>", "3782", {v: 6, f: "ESE"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["2014/15", new Date(2015,4,6), "GR", "Lumnezia", "<a href=http://map.geo.admin.ch/?Y=721530&X=165830&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Stgir / Alp Diesrut</a>", "2630", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 0, f: ""}],

  ["2014/15", new Date(2015,3,12), "VS", "Mont-Noble", "<a href=http://map.geo.admin.ch/?Y=605500&X=112390&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointes des Tsavolires</a>", "2980", {v: 1, f: "N"}, "1", "2 (4, 4)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201504111700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2015,3,4), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=783880&X=184490&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Brämabüel</a>", "2260", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201504040800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,2,28), "UR", "Wassen", "<a href=http://map.geo.admin.ch/?Y=680275&X=175850&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chli Griessenhorn</a>", "2340", {v: 3, f: "NE"}, "1", "1 (2, 2)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201503271700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2015,2,28), "VS", "Bourg-Saint-Pierre", "<a href=http://map.geo.admin.ch/?Y=584900&X=82450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Vélan, couloir Hannibal</a>", "3500", {v: 13, f: "W"}, "1", "1 (1, 0)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201503271700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2015,2,27), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=602523&X=92680&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Petit Col de Charmotane</a>", "3180", {v: 7, f: "SE"}, "1", "1 (6, 2)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201503261700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2015,2,3), "GR", "Samnaun", "<a href=http://map.geo.admin.ch/?Y=823610&X=206380&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Munschuns</a>", "2550", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201503030800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,1,21), "VS", "Bourg-Saint-Pierre", "<a href=http://map.geo.admin.ch/?Y=579580&X=79582&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Combe des Morts</a>", "2500", {v: 1, f: "N"}, "1", "4 (5, 4)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201502201700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2015,1,10), "GR", "Val Müstair", "<a href=http://map.geo.admin.ch/?Y=817368&X=167506&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Daint</a>", "2590", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201502091700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,1,8), "VS", "Staldenried", "<a href=http://map.geo.admin.ch/?Y=636815&X=119280&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gspon, Breiti</a>", "2320", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201502071700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,1,2), "GR", "Disentis / Mustér", "<a href=http://map.geo.admin.ch/?Y=703820&X=172900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz las Palas / Val Segnas</a>", "1970", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201502020800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,31), "GR", "Seewis im Prättigau", "<a href=http://map.geo.admin.ch/?Y=764710&X=209140&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Vilan</a>", "2340", {v: 5, f: "E"}, "1", "5 (8, 7)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501301700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,31), "SG", "Wildhaus-Alt St. Johann", "<a href=http://map.geo.admin.ch/?Y=741408&X=224215&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hinderrugg</a>", "2250", {v: 13, f: "W"}, "2", "1 (1, 0)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501301700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,31), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=605567&X=143973&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Rägeboldshore, I de Hellere</a>", "1980", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501301700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,31), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=631452&X=156214&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chlys Schilthoren, Tistelwang</a>", "2380", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501301700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,30), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=604732&X=144872&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hahnenmoospass</a>", "1875", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501291700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,29), "SG", "Amden", "<a href=http://map.geo.admin.ch/?Y=733105&X=225687&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gulme, Vorder Höhi</a>", "1550", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501281700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,29), "VS", "Riddes", "<a href=http://map.geo.admin.ch/?Y=586075&X=106360&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col des Mines</a>", "2380", {v: 1, f: "N"}, "2", "1 (5, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501281700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,18), "GR", "St. Moritz", "<a href=http://map.geo.admin.ch/?Y=780400&X=153175&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Nair</a>", "2950", {v: 7, f: "SE"}, "2", "1 (3, 2)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501171700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,6), "GR", "Bivio", "<a href=http://map.geo.admin.ch/?Y=774050&X=153500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz dAgnel</a>", "3050", {v: 9, f: "S"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501060800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,4), "GR", "Valsot", "<a href=http://map.geo.admin.ch/?Y=813430&X=199240&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Heidelbergerspitze</a>", "2730", {v: 6, f: "ESE"}, "1", "1 (2, 2)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501040800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2015,0,4), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=613725&X=120985&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Rotsé</a>", "2513", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201501040800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2014,11,20), "SG", "Mels", "<a href=http://map.geo.admin.ch/?Y=748276&X=202734&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pizol</a>", "2820", {v: 5, f: "E"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201412191700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2014/15", new Date(2014,11,8), "VS", "Simplon", "<a href=http://map.geo.admin.ch/?Y=642750&X=116430&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Böshorn / Rauthorn</a>", "3170", {v: 7, f: "SE"}, "1", "1 (4, 0)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2015/nb/en/pdf/201412071700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2014/15", new Date(2014,10,20), "NW", "Emmetten", "<a href=http://map.geo.admin.ch/?Y=684266&X=198406&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Oberbauenstock</a>", "1850", {v: 15, f: "NW"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["2013/14", new Date(2014,7,4), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=615001&X=96954&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointe de Zinal</a>", "3690", {v: 9, f: "S"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["2013/14", new Date(2014,6,19), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=611330&X=102467&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointes de Mourti</a>", "3460", {v: 1, f: "N"}, "1", "2 (6, 4)", {v: 0, f: ""}],

  ["2013/14", new Date(2014,6,19), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=619865&X=100645&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Zinalrothorn</a>", "3760", {v: 9, f: "S"}, "1", "2 (2, 1)", {v: 0, f: ""}],

  ["2013/14", new Date(2014,2,17), "VS", "Täsch", "<a href=http://map.geo.admin.ch/?Y=621234&X=100900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Unter Äschjoch</a>", "3570", {v: 3, f: "NE"}, "2", "2 (3, 2)", {v: 1, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201403161700_gk_c_en_complete.pdf' target='_blank'>1</a>"}],

  ["2013/14", new Date(2014,1,18), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=611792&X=109503&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Arête de Sorebois / Combe Durant</a>", "2785", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201402171700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2014,1,17), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=590373&X=106777&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>LArpette</a>", "2210", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201402161700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2014,1,9), "VS", "Martigny Combe", "<a href=http://map.geo.admin.ch/?Y=568490&X=99600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointe Ronde / Luy / La Giète</a>", "2330", {v: 2, f: "NNE"}, "1", "1 (6, 2)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201402081700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2014,0,5), "VS", "Mont-Noble", "<a href=http://map.geo.admin.ch/?Y=604100&X=115000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointe de Masserey</a>", "2680", {v: 14, f: "WNW"}, "1", "4 (6, 4)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201401050800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2014,0,5), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=587572&X=112484&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Forêt du Ban / Tracouet</a>", "2025", {v: 16, f: "NNW"}, "2", "1 (1, 0)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201401050800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,30), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=603574&X=94403&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Serre de Vuibé</a>", "2390", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312300800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,30), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=572320&X=95559&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Aiguilles dArpette / Val dArpette</a>", "2640", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312300800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,30), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=778034&X=172726&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Affereidgufer / Büelenhorn</a>", "2590", {v: 4, f: "ENE"}, "1", "1 (2, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312300800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,29), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=573664&X=84137&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Dotse / Cretté Létemaire</a>", "2072", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312290800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,29), "VD", "Bex", "<a href=http://map.geo.admin.ch/?Y=579700&X=125900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bas Crots</a>", "2050", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312290800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,27), "GR", "St. Moritz", "<a href=http://map.geo.admin.ch/?Y=780320&X=153210&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Nair</a>", "3010", {v: 7, f: "SE"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312270800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2013/14", new Date(2013,11,26), "UR", "Realp", "<a href=http://map.geo.admin.ch/?Y=680880&X=159030&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Witenwasserental / Schweig</a>", "1720", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 4, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2014/nb/en/pdf/201312260800_gk_c_en_complete.pdf' target='_blank'>4</a>"}],

  ["2012/13", new Date(2013,3,14), "VS", "Fieschertal", "<a href=http://map.geo.admin.ch/?Y=644460&X=154510&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Trugberg</a>", "3730", {v: 9, f: "S"}, "1", "1 (2, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201304131700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2012/13", new Date(2013,3,13), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=618131&X=92229&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Matterhorn</a>", "3380", {v: 7, f: "SE"}, "1", "1 (3, 0)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201304121700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,3,12), "VS", "Fieschertal", "<a href=http://map.geo.admin.ch/?Y=649200&X=151700&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grünhornlücke</a>", "3320", {v: 9, f: "S"}, "1", "1 (13, 7)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201304111700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2012/13", new Date(2013,2,29), "GR", "Poschiavo", "<a href=http://map.geo.admin.ch/?Y=807990&X=142376&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Val da Camp / Val Viola</a>", "2370", {v: 13, f: "W"}, "1", "2 (5, 4)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201303281700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,2,21), "GR", "Disentis / Mustér", "<a href=http://map.geo.admin.ch/?Y=702080&X=175080&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Gendusas / Val Strem</a>", "2820", {v: 8, f: "SSE"}, "2", "1 (5, 2)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201303201700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,2,19), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=563222&X=98539&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Grand Jeur / Tête Balme</a>", "2065", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201303181700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2012/13", new Date(2013,2,4), "GR", "Tujetsch", "<a href=http://map.geo.admin.ch/?Y=696200&X=167800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tschamut</a>", "1890", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201303040800_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,16), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=574060&X=96800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grands Plans</a>", "2160", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302151700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,16), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=616160&X=116790&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Touno</a>", "2720", {v: 9, f: "S"}, "1", "1 (2, 2)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302151700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,13), "VS", "Isérables", "<a href=http://map.geo.admin.ch/?Y=588460&X=109100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Plan du Fou / Prafleuri</a>", "2470", {v: 13, f: "W"}, "2", "1 (1, 0)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302121700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,13), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=590428&X=104192&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bec des Etagnes</a>", "3150", {v: 10, f: "SSW"}, "2", "2 (6, 4)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302121700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,12), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=611100&X=111100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Corne de Sorebois</a>", "2600", {v: 13, f: "W"}, "2", "1 (1, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302111700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,1,3), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=615980&X=121090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bella Tola / Rothorn</a>", "2890", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201302030800_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2012/13", new Date(2013,0,29), "FR", "Semsales", "<a href=http://map.geo.admin.ch/?Y=566100&X=153950&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Teysachaux / Tremetta</a>", "1750", {v: 0, f: ""}, "1", "1 (1, 1)", {v: 3, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201301281700_gk_c_en_complete.pdf' target='_blank'>3</a>"}],

  ["2012/13", new Date(2013,0,24), "GR", "Alvaneu", "<a href=http://map.geo.admin.ch/?Y=767300&X=175425&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Mosch / Val digl Guert</a>", "2250", {v: 5, f: "E"}, "1", "1 (1, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201301231700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2013,0,19), "BE", "Kandergrund", "<a href=http://map.geo.admin.ch/?Y=621030&X=154435&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ärmighore</a>", "2690", {v: 13, f: "W"}, "1", "1 (2, 1)", {v: 2, f: "<a href='http://www.slf.ch/schneeinfo/Archiv/lwdarchiv/2013/nb/en/pdf/201301181700_gk_c_en_complete.pdf' target='_blank'>2</a>"}],

  ["2012/13", new Date(2012,11,23), "SG", "Vilters Wangs", "<a href=http://map.geo.admin.ch/?Y=748903&X=207068&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gamidaurspitz</a>", "2260", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 4, f: "4"}],

  ["2012/13", new Date(2012,11,19), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=588490&X=105960&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Les Lués Rares</a>", "2525", {v: 3, f: "NE"}, "2", "1 (4, 1)", {v: 3, f: "3"}],

  ["2012/13", new Date(2012,10,12), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=794694&X=143846&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Diavolezza / oberhalb Lej da Diavolezza</a>", "2740", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 0, f: ""}],

  ["2012/13", new Date(2012,9,27), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=789985&X=139516&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Bernina / La Spedla</a>", "3950", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 0, f: ""}],

  ["2011/12", new Date(2012,3,25), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=589446&X=104771&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col des Gentianes / Louettes Econdoue</a>", "2800", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,3,23), "FR", "Plaffeien", "<a href=http://map.geo.admin.ch/?Y=594610&X=167140&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schafarnisch</a>", "2100", {v: 16, f: "NNW"}, "1", "1 (2, 0)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,3,17), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=617077&X=115930&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de Vijivi</a>", "2900", {v: 15, f: "NW"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,3,17), "GR", "Lavin", "<a href=http://map.geo.admin.ch/?Y=800875&X=186336&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Linard</a>", "3305", {v: 9, f: "S"}, "1", "1 (3, 1)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,3,9), "VS", "Bourg St Pierre", "<a href=http://map.geo.admin.ch/?Y=584959&X=82509&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Vélan / couloir Hannibal</a>", "3500", {v: 12, f: "WSW"}, "1", "1 (1, 0)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,1,24), "NW", "Stans", "<a href=http://map.geo.admin.ch/?Y=669890&X=198880&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Stanserhorn / Grosslangzug</a>", "1340", {v: 1, f: "N"}, "3", "1 (1, 1)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,1,17), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=781585&X=189235&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Weissfluhjoch / Meierhofer Tälli</a>", "2480", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,1,12), "GR", "Haldenstein", "<a href=http://map.geo.admin.ch/?Y=755024&X=195393&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Haldensteiner Calanda / Calandasiten</a>", "2499", {v: 5, f: "E"}, "1", "1 (1, 0)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,1,10), "VS", "Obergoms", "<a href=http://map.geo.admin.ch/?Y=667364&X=155881&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sidelhorn</a>", "2530", {v: 7, f: "SE"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,1,9), "GR", "Langwies", "<a href=http://map.geo.admin.ch/?Y=777427&X=185707&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chüpfenflue / Tritt</a>", "2300", {v: 2, f: "NNE"}, "1", "1 (1, 0)", {v: 3, f: "3"}],

  ["2011/12", new Date(2012,1,8), "NW", "Hergiswil (NW)", "<a href=http://map.geo.admin.ch/?Y=661820&X=203600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pilatus</a>", "1940", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,0,27), "UR", "Andermatt / Hospental", "<a href=http://map.geo.admin.ch/?Y=688080&X=164000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Felsental</a>", "1800", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2011/12", new Date(2012,0,3), "GR", "Avers", "<a href=http://map.geo.admin.ch/?Y=764540&X=143425&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Juferhorn / Mugmolbach</a>", "2820", {v: 3, f: "NE"}, "1", "2 (4, 3)", {v: 3, f: "3"}],

  ["2011/12", new Date(2011,11,29), "GR", "Celerina / Schlarigna", "<a href=http://map.geo.admin.ch/?Y=780130&X=155335&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Glüna / Piz Corviglia / Chüdera</a>", "2995", {v: 5, f: "E"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2011,11,23), "GR", "Bever", "<a href=http://map.geo.admin.ch/?Y=774959&X=155358&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Picuogl / Val Bever / Chamanna Jenatsch</a>", "2690", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2011,11,20), "VS", "Fully", "<a href=http://map.geo.admin.ch/?Y=574750&X=112500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Planuit / Buitonne</a>", "2000", {v: 7, f: "SE"}, "3", "1 (1, 1)", {v: 0, f: ""}],

  ["2011/12", new Date(2011,11,11), "VS", "Saas Almagell", "<a href=http://map.geo.admin.ch/?Y=640695&X=94350&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Monte Moro</a>", "2970", {v: 3, f: "NE"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2011/12", new Date(2011,11,7), "VS", "Saas Fee", "<a href=http://map.geo.admin.ch/?Y=636700&X=101570&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Felskinn / Skigebiet Saas Fee</a>", "3100", {v: 1, f: "N"}, "3", "1 (2, 2)", {v: 0, f: ""}],

  ["2010/11", new Date(2011,3,1), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=616268&X=113657&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Crête de Barneuza</a>", "2820", {v: 15, f: "NW"}, "1", "3 (7, 4)", {v: 2, f: "2"}],

  ["2010/11", new Date(2011,2,26), "VS", "Bourg Saint Pierre", "<a href=http://map.geo.admin.ch/?Y=583450&X=86631&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tsandéserte / Valsorey</a>", "2190", {v: 3, f: "NE"}, "1", "5 (10, 9)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,20), "BE", "Grindelwald", "<a href=http://map.geo.admin.ch/?Y=646651&X=169102&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Widderfeld / First</a>", "2430", {v: 11, f: "SW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,20), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=628880&X=90093&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Monte Rosahütte</a>", "2630", {v: 14, f: "WNW"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,19), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=792110&X=184860&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gorigrat / Jörihorn</a>", "2770", {v: 13, f: "W"}, "1", "3 (4, 4)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,13), "VS", "Bourg Saint Pierre", "<a href=http://map.geo.admin.ch/?Y=581700&X=82940&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bourg St Bernard</a>", "2120", {v: 3, f: "NE"}, "1", "2 (2, 2)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,12), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=630165&X=94580&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Triftji / Stockhorn</a>", "2740", {v: 14, f: "WNW"}, "1", "2 (3, 3)", {v: 2, f: "2"}],

  ["2010/11", new Date(2011,2,10), "BE", "Saxeten", "<a href=http://map.geo.admin.ch/?Y=631125&X=162735&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Nideri Sulegg</a>", "2270", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2010/11", new Date(2011,2,1), "BE", "Gsteig", "<a href=http://map.geo.admin.ch/?Y=587110&X=134900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Stiereberg / Mittaghore</a>", "2080", {v: 3, f: "NE"}, "2", "1 (3, 2)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,2,1), "VS", "Mollens", "<a href=http://map.geo.admin.ch/?Y=605470&X=134550&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Bonvin</a>", "2925", {v: 3, f: "NE"}, "2", "1 (1, 0)", {v: 3, f: "3"}],

  ["2010/11", new Date(2011,1,5), "UR", "Erstfeld", "<a href=http://map.geo.admin.ch/?Y=686310&X=187310&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ängi / Waldnacht</a>", "1680", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2010/11", new Date(2011,0,31), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=612270&X=145420&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Vordere Loner</a>", "2870", {v: 11, f: "SW"}, "1", "2 (2, 2)", {v: 2, f: "2"}],

  ["2010/11", new Date(2011,0,16), "GL", "Glarus Süd", "<a href=http://map.geo.admin.ch/?Y=726050&X=197475&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gross Chärpf</a>", "2750", {v: 11, f: "SW"}, "1", "1 (3, 1)", {v: 2, f: "2"}],

  ["2010/11", new Date(2010,11,27), "UR", "Andermatt", "<a href=http://map.geo.admin.ch/?Y=692750&X=168780&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Vordere Felli / Oberalp</a>", "2280", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2010/11", new Date(2010,11,19), "UR", "Unterschächen", "<a href=http://map.geo.admin.ch/?Y=700100&X=187540&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grundplanggen / Brunni</a>", "1700", {v: 5, f: "E"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,5,6), "BE", "Kandersteg", "<a href=http://map.geo.admin.ch/?Y=623340&X=148125&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Fründenhütte</a>", "2520", {v: 1, f: "N"}, "1", "1 (3, 0)", {v: 0, f: ""}],

  ["2009/10", new Date(2010,3,18), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=627300&X=89750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schwärze / Gornergletscher</a>", "2780", {v: 2, f: "NNE"}, "2", "1 (2, 1)", {v: 1, f: "1"}],

  ["2009/10", new Date(2010,3,7), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=617800&X=111700&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col des Arpettes</a>", "2950", {v: 15, f: "NW"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2009/10", new Date(2010,3,5), "TI", "Capriasca", "<a href=http://map.geo.admin.ch/?Y=722440&X=107660&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Monte Bar</a>", "1610", {v: 8, f: "SSE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,3,3), "GR", "Bergün Bravuogn ", "<a href=http://map.geo.admin.ch/?Y=786460&X=166240&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Kesch</a>", "3350", {v: 5, f: "E"}, "1", "1 (2, 0)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,28), "GR", "Langwies", "<a href=http://map.geo.admin.ch/?Y=776517&X=186500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Wangegg / Sapün</a>", "2225", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,27), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=582480&X=100040&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Forêt du Vernay / Bruson</a>", "1625", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,26), "VS", "Törbel", "<a href=http://map.geo.admin.ch/?Y=628130&X=120280&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Augstbordhorn</a>", "2810", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,25), "GR", "Avers", "<a href=http://map.geo.admin.ch/?Y=760950&X=148860&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Täli / Pürd</a>", "2360", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,21), "GR", "Scuol", "<a href=http://map.geo.admin.ch/?Y=821220&X=183750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Cna Lischana CAS</a>", "2470", {v: 14, f: "WNW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,20), "BE", "Saxeten", "<a href=http://map.geo.admin.ch/?Y=630900&X=162750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Nideri Sulegg</a>", "2100", {v: 14, f: "WNW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2009/10", new Date(2010,1,20), "UR", "Realp", "<a href=http://map.geo.admin.ch/?Y=679350&X=157080&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Stelliboden - Muttenreuss</a>", "2170", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,20), "GR", "Safien", "<a href=http://map.geo.admin.ch/?Y=738644&X=164009&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tomülpass</a>", "2364", {v: 6, f: "ESE"}, "1", "2 (9, 4)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,14), "GR", "Sils im Engadin Segl ", "<a href=http://map.geo.admin.ch/?Y=774520&X=145520&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Fuorcla Grevasalvas</a>", "2640", {v: 9, f: "S"}, "1", "1 (2, 2)", {v: 2, f: "2"}],

  ["2009/10", new Date(2010,1,7), "GR", "Peist", "<a href=http://map.geo.admin.ch/?Y=774100&X=191360&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mattjisch Horn</a>", "2390", {v: 12, f: "WSW"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,1,4), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=632580&X=162150&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gälbe Schopf / Lobhornhütte</a>", "2170", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,0,31), "SG", "Amden", "<a href=http://map.geo.admin.ch/?Y=733940&X=224340&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Flügespitz</a>", "1680", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,0,31), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=607530&X=115830&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>LAbondance / Roc dOrzival</a>", "2740", {v: 7, f: "SE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,0,31), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=605115&X=144510&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Geils / Skigebiet Adelboden</a>", "1810", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,0,3), "VS", "Liddes", "<a href=http://map.geo.admin.ch/?Y=581570&X=97700&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tête de la Payanne</a>", "2380", {v: 6, f: "ESE"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2009/10", new Date(2010,0,3), "BE", "Diemtigen", "<a href=http://map.geo.admin.ch/?Y=607710&X=152840&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bodezehore</a>", "2320", {v: 15, f: "NW"}, "1", "7 (12, 12)", {v: 2, f: "2"}],

  ["2009/10", new Date(2009,11,21), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=563332&X=98213&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Combe des Jeurs / Tête de Balme</a>", "2150", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,5,13), "GR", "Poschiavo", "<a href=http://map.geo.admin.ch/?Y=794570&X=139460&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Palü</a>", "3770", {v: 7, f: "SE"}, "1", "3 (3, 0)", {v: 0, f: ""}],

  ["2008/09", new Date(2009,4,25), "VS", "Saas Fee", "<a href=http://map.geo.admin.ch/?Y=634750&X=106440&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Fallgletscher</a>", "3270", {v: 9, f: "S"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["2008/09", new Date(2009,3,27), "VS", "Trient ", "<a href=http://map.geo.admin.ch/?Y=568740&X=95000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Petite Pointe dOrny / Col des Ecandies</a>", "3000", {v: 15, f: "NW"}, "1", "1 (7, 3)", {v: 2, f: "2"}],

  ["2008/09", new Date(2009,3,1), "GR", "Samnaun", "<a href=http://map.geo.admin.ch/?Y=823950&X=206670&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Munschuns / Pasterblaunas</a>", "2440", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2008/09", new Date(2009,3,1), "BE", "Kandersteg", "<a href=http://map.geo.admin.ch/?Y=614400&X=146250&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Inner Ueschine / Uf de Wenge / Balme</a>", "1900", {v: 6, f: "ESE"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2008/09", new Date(2009,2,20), "VS", "Liddes", "<a href=http://map.geo.admin.ch/?Y=584980&X=92300&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Petit Combin / Boveire</a>", "2690", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2008/09", new Date(2009,2,14), "VS", "Nax", "<a href=http://map.geo.admin.ch/?Y=604250&X=117800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Noble / Tour de Bonvin</a>", "2300", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,2,14), "SG", "Amden", "<a href=http://map.geo.admin.ch/?Y=735120&X=224160&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Glattchamm</a>", "1680", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,2,11), "LU", "Luthern", "<a href=http://map.geo.admin.ch/?Y=638105&X=206090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Napf</a>", "1400", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,2,7), "LU", "Hasle", "<a href=http://map.geo.admin.ch/?Y=646800&X=199025&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Heiligkreuz / First</a>", "1455", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,1,28), "SG", "Altstätten", "<a href=http://map.geo.admin.ch/?Y=756820&X=239460&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Rüthi / Plona / Chelen</a>", "725", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,1,16), "GR", "Klosters Serneus ", "<a href=http://map.geo.admin.ch/?Y=788510&X=187940&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pischa / Pischaboden</a>", "2380", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,1,15), "GR", "Saas", "<a href=http://map.geo.admin.ch/?Y=788650&X=199800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schlappiner Spitz</a>", "2380", {v: 13, f: "W"}, "1", "2 (3, 3)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,1,11), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591320&X=106541&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Lac de Cleuson</a>", "2240", {v: 13, f: "W"}, "1", "3 (4, 4)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,0,25), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591640&X=104090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Verbier / Mont-Fort / Lac du Grand Désert</a>", "2780", {v: 3, f: "NE"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,0,25), "BE", "Hasliberg", "<a href=http://map.geo.admin.ch/?Y=662980&X=177600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mägisalp / Läuber</a>", "2200", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2009,0,20), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=621720&X=94300&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schwarzsee / Inneri Wälder</a>", "2250", {v: 3, f: "NE"}, "2", "1 (3, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,11,23), "GR", "Lantsch Lenz", "<a href=http://map.geo.admin.ch/?Y=765450&X=179050&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Parpaner Rothorn</a>", "2840", {v: 9, f: "S"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,11,21), "VS", "Chandolin", "<a href=http://map.geo.admin.ch/?Y=612982&X=123058&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Illhorn</a>", "2447", {v: 13, f: "W"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,11,14), "AI", "Schwende", "<a href=http://map.geo.admin.ch/?Y=752170&X=238140&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Alp Sigel</a>", "1570", {v: 7, f: "SE"}, "1", "1 (2, 0)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,11,14), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=567450&X=98575&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Les Charcotins / Pointe Ronde/ Secteur des Barres Les Charcotins</a>", "2200", {v: 11, f: "SW"}, "1", "1 (3, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,11,8), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591787&X=103949&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Fort / Lac du Grand Désert</a>", "2743", {v: 3, f: "NE"}, "2", "1 (3, 1)", {v: 3, f: "3"}],

  ["2008/09", new Date(2008,10,26), "VD", "Ormont Dessous", "<a href=http://map.geo.admin.ch/?Y=583080&X=131400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Les Diablerets</a>", "2780", {v: 14, f: "WNW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2007/08", new Date(2008,4,6), "UR", "Unterschächen", "<a href=http://map.geo.admin.ch/?Y=703780&X=192135&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Windeggen-Tunnel / Klausenpassstrasse</a>", "1590", {v: 9, f: "S"}, "3", "1 (2, 0)", {v: 1, f: "1"}],

  ["2007/08", new Date(2008,4,3), "AI", "Schwende", "<a href=http://map.geo.admin.ch/?Y=749451&X=239216&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Wildkirchli / Alp Obere Bommern</a>", "1450", {v: 5, f: "E"}, "1", "1 (1, 0)", {v: 2, f: "2"}],

  ["2007/08", new Date(2008,3,19), "VS", "Val dIlliez", "<a href=http://map.geo.admin.ch/?Y=560220&X=112400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Couloir des Doigts / Dents-du-Midi</a>", "2950", {v: 15, f: "NW"}, "1", "1 (3, 0)", {v: 2, f: "2"}],

  ["2007/08", new Date(2008,3,16), "GR", "Poschiavo", "<a href=http://map.geo.admin.ch/?Y=805530&X=144950&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Paradisin</a>", "3060", {v: 11, f: "SW"}, "1", "1 (4, 2)", {v: 2, f: "2"}],

  ["2007/08", new Date(2008,2,18), "GR", "Bergün", "<a href=http://map.geo.admin.ch/?Y=774890&X=160150&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Bleis Marscha</a>", "3110", {v: 4, f: "ENE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2007/08", new Date(2008,0,19), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=628010&X=98440&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tufterchumme / Skigebiet Rothorn paradise</a>", "3100", {v: 11, f: "SW"}, "3", "1 (3, 1)", {v: 3, f: "3"}],

  ["2007/08", new Date(2008,0,15), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=626600&X=94370&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mittelritz / Hohtälli / Ritzengrat </a>", "2520", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2007/08", new Date(2008,0,13), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=794190&X=142870&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Diavolezza - Persgletscher</a>", "2830", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 4, f: "4"}],

  ["2007/08", new Date(2008,0,13), "GR", "Klosters-Serneus", "<a href=http://map.geo.admin.ch/?Y=780920&X=191190&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schwarzhorn / Skigebiet Parsenn</a>", "2480", {v: 14, f: "WNW"}, "2", "1 (3, 2)", {v: 3, f: "3"}],

  ["2007/08", new Date(2008,0,3), "BE", "Lenk", "<a href=http://map.geo.admin.ch/?Y=606375&X=141060&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ammertentäli / Ammerten Schafberg</a>", "2200", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2007/08", new Date(2007,11,4), "FR", "Grandvillard / Bas Intyamon", "<a href=http://map.geo.admin.ch/?Y=577170&X=154560&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tsermon</a>", "1970", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,6,12), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=640275&X=153890&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Jungfrau / Rottalsattel</a>", "4000", {v: 7, f: "SE"}, "1", "6 (14, 0)", {v: 0, f: ""}],

  ["2006/07", new Date(2007,2,25), "OW", "Engelberg", "<a href=http://map.geo.admin.ch/?Y=675645&X=181984&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Galtiberg / Titlis</a>", "2500", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,2,25), "GR", "Susch", "<a href=http://map.geo.admin.ch/?Y=792475&X=176145&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chilbiritzenspitz / Grialetschütte</a>", "2620", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2006/07", new Date(2007,2,24), "VS", "Mollens", "<a href=http://map.geo.admin.ch/?Y=606150&X=135090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Bonvin / Plaine Morte / Skigebiet Montana</a>", "2460", {v: 5, f: "E"}, "2", "1 (4, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,2,12), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=630120&X=94500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Stockhorn / Triftji / verlorenes Tal</a>", "2740", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2006/07", new Date(2007,2,10), "VS", "Savièse", "<a href=http://map.geo.admin.ch/?Y=593500&X=132600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col du Brochet / Geltenlücke</a>", "2800", {v: 16, f: "NNW"}, "1", "1 (3, 2)", {v: 2, f: "2"}],

  ["2006/07", new Date(2007,2,4), "GR", "Klosters Serneus", "<a href=http://map.geo.admin.ch/?Y=781250&X=192370&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gmeinböden / Casanna / Parsenn</a>", "2440", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,2,4), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=628070&X=93100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hohtälli / Gornergrat</a>", "3220", {v: 13, f: "W"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,2,4), "VD", "Chateau dOex", "<a href=http://map.geo.admin.ch/?Y=578070&X=136850&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Pare / La Tournette / La Para</a>", "2400", {v: 3, f: "NE"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,1,16), "VS", "Anniviers", "<a href=http://map.geo.admin.ch/?Y=607830&X=116300&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Roc dOrzival / Grimentz</a>", "2660", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,1,14), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=581310&X=98660&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tête de la Payanne </a>", "2300", {v: 16, f: "NNW"}, "2", "2 (2, 2)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,1,13), "VD", "Leysin", "<a href=http://map.geo.admin.ch/?Y=566494&X=134416&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Berneuse / Joux dAi</a>", "2000", {v: 6, f: "ESE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,0,8), "SG", "Mels", "<a href=http://map.geo.admin.ch/?Y=749130&X=203980&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Wildsee / Pizol</a>", "2570", {v: 13, f: "W"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,0,6), "GR", "S chanf", "<a href=http://map.geo.admin.ch/?Y=796250&X=170725&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Punt Ota</a>", "2090", {v: 4, f: "ENE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2006/07", new Date(2007,0,1), "BE", "Lauenen", "<a href=http://map.geo.admin.ch/?Y=592870&X=136660&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Lauenensee / Feissenberg / Follhore</a>", "2000", {v: 13, f: "W"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,19), "VS", "Bourg Saint Pierre", "<a href=http://map.geo.admin.ch/?Y=581390&X=83020&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gorge de la Menouve (Skigebiet Super Saint-Bernard)</a>", "2010", {v: 16, f: "NNW"}, "2", "1 (2, 1)", {v: 2, f: "2"}],

  ["2005/06", new Date(2006,2,17), "GR", "Susch", "<a href=http://map.geo.admin.ch/?Y=792765&X=175870&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grialetsch</a>", "2635", {v: 2, f: "NNE"}, "1", "1 (4, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,14), "BE", "Hasliberg", "<a href=http://map.geo.admin.ch/?Y=660250&X=178520&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Winterhalde / Käserstatt</a>", "1950", {v: 1, f: "N"}, "2", "1 (3, 3)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,13), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=780870&X=178225&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Leidbach (Skigebiet Rinerhorn)</a>", "2330", {v: 12, f: "WSW"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,10), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=606080&X=144200&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chlusi / Geissbüel</a>", "1980", {v: 14, f: "WNW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,7), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=628180&X=93600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hohtälli / Gornergrat</a>", "3000", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,6), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=630960&X=156220&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schilthorn</a>", "2720", {v: 6, f: "ESE"}, "2", "1 (1, 0)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,2,4), "VD", "Ormont Dessus", "<a href=http://map.geo.admin.ch/?Y=581500&X=135080&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Palette (Skigebiet Isenau)</a>", "2100", {v: 14, f: "WNW"}, "1", "1 (2, 1)", {v: 4, f: "4"}],

  ["2005/06", new Date(2006,1,25), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=626900&X=93020&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hohtälli / Gornergrat</a>", "2960", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,1,23), "GR", "Tujetsch", "<a href=http://map.geo.admin.ch/?Y=703440&X=167260&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Vanatsch / Sedrun</a>", "2400", {v: 13, f: "W"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,1,22), "VS", "Collombey Muraz", "<a href=http://map.geo.admin.ch/?Y=557650&X=123135&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointe de Bellevue - Combe de Dreveneuse</a>", "2000", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2005/06", new Date(2006,1,21), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=574895&X=86650&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Skigebiet La Fouly</a>", "2060", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,1,20), "GR", "Disentis Mustér", "<a href=http://map.geo.admin.ch/?Y=704715&X=174299&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Val Acletta</a>", "2110", {v: 1, f: "N"}, "2", "3 (4, 3)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,1,19), "VS", "Zermatt", "<a href=http://map.geo.admin.ch/?Y=627200&X=93900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mittelritz / Skigebiet Gornergrat</a>", "2820", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,1,19), "GR", "Poschiavo", "<a href=http://map.geo.admin.ch/?Y=798975&X=130000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Caral / Selva</a>", "2140", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,0,30), "GR", "Riom Parsonz", "<a href=http://map.geo.admin.ch/?Y=760770&X=158800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Skigebiet Savognin</a>", "2170", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2005/06", new Date(2006,0,21), "SG", "Quarten", "<a href=http://map.geo.admin.ch/?Y=736289&X=214918&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sächsmoor / Skigebiet Flumserberg</a>", "2000", {v: 16, f: "NNW"}, "2", "1 (4, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,0,21), "BE", "Rüschegg", "<a href=http://map.geo.admin.ch/?Y=597630&X=172375&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ochsen - Stierenberg (Gantrisch)</a>", "1835", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,0,20), "OW/LU", "Giswil / Flühli", "<a href=http://map.geo.admin.ch/?Y=647330&X=182660&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Brienzer Rothorn / Tagweid</a>", "2020", {v: 2, f: "NNE"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2006,0,8), "VD", "Bex", "<a href=http://map.geo.admin.ch/?Y=577720&X=121540&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Pacheu</a>", "2710", {v: 12, f: "WSW"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2005/06", new Date(2006,0,3), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591150&X=104480&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bec des Etagnes </a>", "2850", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2005/06", new Date(2005,11,30), "GR", "Zuoz", "<a href=http://map.geo.admin.ch/?Y=792130&X=166510&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Griatschouls / Val dUrezza</a>", "2680", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2004/05", new Date(2005,3,22), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=583880&X=95375&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Rogneux</a>", "3050", {v: 2, f: "NNE"}, "1", "1 (3, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,3,21), "VS", "Hérémence", "<a href=http://map.geo.admin.ch/?Y=592950&X=108640&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bec de la Montau</a>", "2900", {v: 1, f: "N"}, "1", "2 (4, 3)", {v: 2, f: "2"}],

  ["2004/05", new Date(2005,2,14), "GL", "Obstalden", "<a href=http://map.geo.admin.ch/?Y=731200&X=215420&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Meerenboden / Tugsteinhorn</a>", "1780", {v: 15, f: "NW"}, "1", "3 (3, 3)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,2,13), "SG", "Alt St Johann", "<a href=http://map.geo.admin.ch/?Y=737700&X=229280&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Neuenalp / Alp Unterstofel</a>", "1350", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,2,12), "BE", "Grindelwald", "<a href=http://map.geo.admin.ch/?Y=649430&X=169310&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gemschberg</a>", "2380", {v: 8, f: "SSE"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2004/05", new Date(2005,2,10), "GR", "Siat", "<a href=http://map.geo.admin.ch/?Y=730420&X=189210&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Crap Sais / Val da Siat</a>", "2010", {v: 7, f: "SE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,2,10), "VS", "Saas Fee", "<a href=http://map.geo.admin.ch/?Y=634360&X=102670&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Feegletscher / Längfluh</a>", "3290", {v: 4, f: "ENE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,1,25), "VS", "Saint Gingolph", "<a href=http://map.geo.admin.ch/?Y=550440&X=134450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Rochers de la Croix / Vallon de Novel</a>", "1460", {v: 14, f: "WNW"}, "1", "2 (3, 2)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,1,20), "GR", "Churwalden", "<a href=http://map.geo.admin.ch/?Y=762370&X=186190&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Churer Joch / Tschiertschen</a>", "1930", {v: 14, f: "WNW"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,1,8), "GR", "Vals", "<a href=http://map.geo.admin.ch/?Y=734075&X=161490&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Selva Alp / Inder Rossbodma</a>", "1940", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2004/05", new Date(2005,1,6), "GR", "Madulain", "<a href=http://map.geo.admin.ch/?Y=789320&X=163100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Muntischè</a>", "2470", {v: 4, f: "ENE"}, "1", "2 (2, 2)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,1,5), "GR", "Klosters Serneus", "<a href=http://map.geo.admin.ch/?Y=790070&X=189980&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gatschieferspitz</a>", "2485", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,1,5), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=782170&X=176400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Leidbachfurgga</a>", "2805", {v: 15, f: "NW"}, "1", "1 (2, 2)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,0,23), "VS", "Saas Fee", "<a href=http://map.geo.admin.ch/?Y=637125&X=104335&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ritzi / Maste 4 / Skigebiet Saas Fee</a>", "2325", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2005,0,23), "VS", "Lens / Icogne", "<a href=http://map.geo.admin.ch/?Y=602450&X=131200&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Combe de la Chaux / Vallon dErtentse</a>", "2120", {v: 15, f: "NW"}, "2", "2 (2, 2)", {v: 3, f: "3"}],

  ["2004/05", new Date(2004,11,30), "BE", "St Stephan", "<a href=http://map.geo.admin.ch/?Y=605415&X=150110&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Albristhorn / Färmelberg</a>", "2260", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2004,11,30), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=601800&X=92100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pigne dArolla</a>", "3220", {v: 8, f: "SSE"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2004,11,27), "VS", "Riddes", "<a href=http://map.geo.admin.ch/?Y=587650&X=106025&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de Chassoure / Skigebiet Verbier</a>", "2700", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2004,11,26), "GR", "Sent", "<a href=http://map.geo.admin.ch/?Y=814910&X=196340&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Davos Lais / Fimbertal</a>", "2610", {v: 2, f: "NNE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2004/05", new Date(2004,11,22), "SZ", "Oberiberg", "<a href=http://map.geo.admin.ch/?Y=705460&X=206570&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Forstberg</a>", "2120", {v: 1, f: "N"}, "1", "1 (2, 1)", {v: 3, f: "3"}],

  ["2003/04", new Date(2004,5,5), "TI", "Airolo", "<a href=http://map.geo.admin.ch/?Y=684760&X=157755&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Lago di Lucendro / Gotthardpass</a>", "2160", {v: 8, f: "SSE"}, "1", "1 (2, 0)", {v: 0, f: ""}],

  ["2003/04", new Date(2004,1,21), "VS", "Liddes", "<a href=http://map.geo.admin.ch/?Y=579850&X=90750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Crêta de Vella</a>", "2160", {v: 16, f: "NNW"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["2003/04", new Date(2004,1,15), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=783155&X=178495&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Bäbischluocht / Sertig</a>", "2120", {v: 3, f: "NE"}, "2", "1 (1, 0)", {v: 2, f: "2"}],

  ["2003/04", new Date(2004,0,25), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=589800&X=102760&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de la Chaux</a>", "2950", {v: 11, f: "SW"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2003/04", new Date(2004,0,17), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=586450&X=106000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Rogneux / Skigebiet Verbier</a>", "2650", {v: 12, f: "WSW"}, "2", "1 (4, 4)", {v: 3, f: "3"}],

  ["2003/04", new Date(2004,0,15), "GR", "Tschierv", "<a href=http://map.geo.admin.ch/?Y=815545&X=168400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ofenpass / Munt Buffalora</a>", "2400", {v: 6, f: "ESE"}, "1", "1 (3, 2)", {v: 3, f: "3"}],

  ["2003/04", new Date(2004,0,4), "VS", "Gampel", "<a href=http://map.geo.admin.ch/?Y=621130&X=134450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Einigs Alichji / Niwen / Goppenstein</a>", "2730", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2003/04", new Date(2003,11,30), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=611050&X=143810&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tschingellochtighorn / Engstligenalp</a>", "2300", {v: 11, f: "SW"}, "1", "2 (3, 2)", {v: 3, f: "3"}],

  ["2003/04", new Date(2003,11,29), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=780788&X=178439&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Rinerhorn / Nüllisch Grat</a>", "2260", {v: 15, f: "NW"}, "2", "1 (11, 2)", {v: 3, f: "3"}],

  ["2003/04", new Date(2003,11,19), "GR", "Tschierv", "<a href=http://map.geo.admin.ch/?Y=815580&X=168430&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ofenpass / Munt Buffalora</a>", "2385", {v: 6, f: "ESE"}, "1", "1 (2, 2)", {v: 2, f: "2"}],

  ["2002/03", new Date(2003,3,19), "VS", "Ayer", "<a href=http://map.geo.admin.ch/?Y=611490&X=110325&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de Sorebois / Zinal</a>", "2760", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 1, f: "1"}],

  ["2002/03", new Date(2003,3,15), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=590500&X=93500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grand Tavé / Val de Bagnes</a>", "2990", {v: 3, f: "NE"}, "2", "1 (1, 0)", {v: 2, f: "2"}],

  ["2002/03", new Date(2003,1,24), "GR", "Juf", "<a href=http://map.geo.admin.ch/?Y=763750&X=144700&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Wengahorn</a>", "2730", {v: 4, f: "ENE"}, "1", "1 (2, 1)", {v: 1, f: "1"}],

  ["2002/03", new Date(2003,1,11), "VS", "Grimentz", "<a href=http://map.geo.admin.ch/?Y=611100&X=111060&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Corne de Sorebois / Val de Moiry</a>", "2680", {v: 12, f: "WSW"}, "2", "1 (1, 0)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,1,10), "UR", "Andermatt", "<a href=http://map.geo.admin.ch/?Y=689920&X=164260&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Geissberg / Gemsstock</a>", "1980", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,1,9), "GR", "Samedan", "<a href=http://map.geo.admin.ch/?Y=791475&X=155990&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Utèr / Crasta Burdun / Val Champagna</a>", "2960", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,1,8), "VS", "Simplon", "<a href=http://map.geo.admin.ch/?Y=643480&X=120900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Alter Spittel / Magehorn / Simplonpass</a>", "2100", {v: 7, f: "SE"}, "1", "1 (4, 2)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,1,5), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=573945&X=97175&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Breya / Champex</a>", "1950", {v: 3, f: "NE"}, "2", "4 (5, 4)", {v: 4, f: "4"}],

  ["2002/03", new Date(2003,1,4), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=784010&X=184135&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Brämabüel / Jakobshorn</a>", "2380", {v: 3, f: "NE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,0,10), "GR", "Lantsch Lenz", "<a href=http://map.geo.admin.ch/?Y=765550&X=179000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Parpaner Rothorn</a>", "2810", {v: 8, f: "SSE"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2002/03", new Date(2003,0,6), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=782445&X=189945&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Totalphorn / Skigebiet Parsenn</a>", "2245", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2002/03", new Date(2003,0,6), "VS", "Bourg St Pierre", "<a href=http://map.geo.admin.ch/?Y=584410&X=88215&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pointe de Penne / Combe du Valsorey</a>", "2750", {v: 12, f: "WSW"}, "1", "3 (3, 3)", {v: 3, f: "3"}],

  ["2002/03", new Date(2002,11,29), "GR", "Riom Parsonz", "<a href=http://map.geo.admin.ch/?Y=760610&X=158875&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Skigebiet Savognin</a>", "2220", {v: 2, f: "NNE"}, "2", "2 (5, 2)", {v: 3, f: "3"}],

  ["2002/03", new Date(2002,10,3), "VS", "Fieschertal", "<a href=http://map.geo.admin.ch/?Y=642025&X=155320&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sphinxstollen / Jungfraujoch</a>", "3480", {v: 7, f: "SE"}, "1", "1 (2, 1)", {v: 0, f: ""}],

  ["2001/02", new Date(2002,7,13), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=642300&X=158500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Eiger W-Flanke</a>", "2900", {v: 13, f: "W"}, "1", "1 (2, 0)", {v: 0, f: ""}],

  ["2001/02", new Date(2002,3,28), "VS", "Ulrichen", "<a href=http://map.geo.admin.ch/?Y=668120&X=144620&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ritzhörner</a>", "3020", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,3,28), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=792250&X=174500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Grialetsch</a>", "3050", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,3,27), "VS", "Bourg St Pierre", "<a href=http://map.geo.admin.ch/?Y=584990&X=82500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Velan / Bourg St Bernhard</a>", "3600", {v: 11, f: "SW"}, "1", "2 (2, 0)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,3,21), "BE", "Kandersteg", "<a href=http://map.geo.admin.ch/?Y=622480&X=146620&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Doldenhorn</a>", "3450", {v: 15, f: "NW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,2,6), "VD", "Château dOex", "<a href=http://map.geo.admin.ch/?Y=578060&X=136900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Para / La Pare</a>", "2450", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,2,5), "BE", "Gsteig bei Gstaad", "<a href=http://map.geo.admin.ch/?Y=584920&X=133250&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Oldenegg</a>", "1900", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,2,5), "GR", "Scuol", "<a href=http://map.geo.admin.ch/?Y=820305&X=172570&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Vallatscha</a>", "2750", {v: 6, f: "ESE"}, "1", "3 (5, 4)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,1,28), "VS", "Martisberg", "<a href=http://map.geo.admin.ch/?Y=649990&X=138880&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Deischbach - Volli / Bettmeralp</a>", "2070", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,1,25), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=602150&X=97240&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mt. Dolin</a>", "2480", {v: 7, f: "SE"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,1,24), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=581530&X=98960&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Seudzay / Tête de la Payanne</a>", "2200", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,1,13), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=632420&X=156760&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schilthorn / Birg</a>", "2450", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,1,2), "GR", "Tschiertschen", "<a href=http://map.geo.admin.ch/?Y=764500&X=182530&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Farurtal / Parpaner Schwarzhorn</a>", "2500", {v: 15, f: "NW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,0,30), "UR", "Gurtnellen", "<a href=http://map.geo.admin.ch/?Y=695470&X=172410&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Fellital - Schattig-Wichel / Fuorcla  da Giuv</a>", "2910", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,0,13), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=782410&X=190070&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Amtmanntobel Totalp</a>", "2240", {v: 5, f: "E"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2001/02", new Date(2002,0,13), "BE", "Reichenbach", "<a href=http://map.geo.admin.ch/?Y=629110&X=152420&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Vordere Bütlasse / Kiental</a>", "2975", {v: 14, f: "WNW"}, "1", "2 (3, 1)", {v: 1, f: "1"}],

  ["2001/02", new Date(2002,0,3), "GR", "Klosters Serneus", "<a href=http://map.geo.admin.ch/?Y=781200&X=192100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Parsenn / Casanna / Rude Dudehang</a>", "2400", {v: 13, f: "W"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2002,0,2), "BE", "Diemtigen", "<a href=http://map.geo.admin.ch/?Y=606860&X=155025&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Galmschibe / Oberes Chirgeli / Diemtigtal</a>", "2360", {v: 16, f: "NNW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2001,11,31), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=588100&X=105750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de Chassoure / Mont Gelé / Tortin</a>", "2700", {v: 2, f: "NNE"}, "2", "1 (4, 1)", {v: 3, f: "3"}],

  ["2001/02", new Date(2001,11,28), "SG", "Flums", "<a href=http://map.geo.admin.ch/?Y=737590&X=214575&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Zieger / Flumserberg</a>", "2060", {v: 8, f: "SSE"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,5,23), "BE", "Grindelwald", "<a href=http://map.geo.admin.ch/?Y=644670&X=159240&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mittellegihütte</a>", "3340", {v: 8, f: "SSE"}, "1", "2 (2, 1)", {v: 0, f: ""}],

  ["2000/01", new Date(2001,4,24), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=641150&X=157050&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Guggihütte / Mönch</a>", "2740", {v: 15, f: "NW"}, "1", "1 (2, 1)", {v: 0, f: ""}],

  ["2000/01", new Date(2001,4,19), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=794140&X=139530&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Palü</a>", "3800", {v: 1, f: "N"}, "1", "2 (2, 1)", {v: 0, f: ""}],

  ["2000/01", new Date(2001,2,29), "GR", "Medel Lucmagn", "<a href=http://map.geo.admin.ch/?Y=714960&X=165200&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Valdraus / Glatscher da Lavaz</a>", "2540", {v: 16, f: "NNW"}, "1", "1 (4, 3)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,2,13), "VS", "Simplon", "<a href=http://map.geo.admin.ch/?Y=646720&X=120110&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hübschhorn</a>", "2500", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,2,5), "GR", "Splügen", "<a href=http://map.geo.admin.ch/?Y=747380&X=154290&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Surettalückli</a>", "2660", {v: 1, f: "N"}, "1", "1 (3, 2)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,27), "GR", "Arosa", "<a href=http://map.geo.admin.ch/?Y=767380&X=179800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Erzböden / Erzhorn / Parpaner Rothorn</a>", "2380", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,27), "NW", "Emmetten", "<a href=http://map.geo.admin.ch/?Y=680450&X=196930&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schwalmis</a>", "2140", {v: 1, f: "N"}, "1", "1 (2, 2)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,24), "SZ", "Oberiberg", "<a href=http://map.geo.admin.ch/?Y=700715&X=207810&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Hoch Ybrig / Laucherenstöckli / Mördergruebli</a>", "1660", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 4, f: "4"}],

  ["2000/01", new Date(2001,1,23), "VS", "Mühlebach", "<a href=http://map.geo.admin.ch/?Y=657630&X=139535&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Ernergalen / Lowigraben</a>", "2220", {v: 16, f: "NNW"}, "2", "1 (2, 0)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,22), "GR", "Fuldera", "<a href=http://map.geo.admin.ch/?Y=822680&X=165090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Salinas / Alp Sadra</a>", "2300", {v: 3, f: "NE"}, "1", "2 (7, 3)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,1,11), "TI", "Bedretto", "<a href=http://map.geo.admin.ch/?Y=679225&X=151115&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Alpe Nuova / Pizzo Rotondo</a>", "2540", {v: 8, f: "SSE"}, "1", "3 (3, 3)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,1,6), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=563230&X=98215&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tête de Balme</a>", "2180", {v: 1, f: "N"}, "2", "3 (5, 4)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,4), "GR", "Samnaun", "<a href=http://map.geo.admin.ch/?Y=822530&X=204160&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Clis da Ravaisch</a>", "2060", {v: 8, f: "SSE"}, "3", "1 (1, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,4), "SZ", "Oberiberg", "<a href=http://map.geo.admin.ch/?Y=705430&X=206700&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Forstberg</a>", "1980", {v: 1, f: "N"}, "1", "1 (1, 1)", {v: 4, f: "4"}],

  ["2000/01", new Date(2001,1,4), "VS", "Leukerbad", "<a href=http://map.geo.admin.ch/?Y=615930&X=141350&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Rindersattel / Rinderhorn</a>", "2800", {v: 11, f: "SW"}, "1", "1 (2, 2)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,1,3), "VS", "Ayer", "<a href=http://map.geo.admin.ch/?Y=613920&X=106840&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Eisfälle Plat de la Lé / Zinal</a>", "2500", {v: 3, f: "NE"}, "1", "1 (5, 1)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,1,3), "VS", "Ayer", "<a href=http://map.geo.admin.ch/?Y=613170&X=106750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Plat de la Lé / Zinal</a>", "3000", {v: 5, f: "E"}, "1", "2 (8, 3)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,0,28), "BE", "Gsteig", "<a href=http://map.geo.admin.ch/?Y=587540&X=134950&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Stierenberg</a>", "2000", {v: 1, f: "N"}, "1", "1 (3, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2001,0,16), "VS", "Blitzingen", "<a href=http://map.geo.admin.ch/?Y=655530&X=146940&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Täschehorn / Setzehorn</a>", "2990", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,0,13), "GR", "Celerina", "<a href=http://map.geo.admin.ch/?Y=783650&X=156080&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Padella / Samedan</a>", "2800", {v: 9, f: "S"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["2000/01", new Date(2001,0,13), "VS", "Chandolin", "<a href=http://map.geo.admin.ch/?Y=614100&X=121230&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Arête des Ombrintses / Bella Tola</a>", "2560", {v: 14, f: "WNW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["2000/01", new Date(2000,10,12), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=565265&X=95050&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pte des Grands / Glacier des Berons</a>", "2920", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["2000/01", new Date(2000,10,11), "UR", "Andermatt", "<a href=http://map.geo.admin.ch/?Y=689630&X=162030&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gemsstock </a>", "2840", {v: 14, f: "WNW"}, "2", "1 (3, 1)", {v: 3, f: "3"}],

  ["1999/00", new Date(2000,8,10), "VS", "Naters", "<a href=http://map.geo.admin.ch/?Y=637490&X=140340&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Nesthorn</a>", "3800", {v: 3, f: "NE"}, "1", "2 (2, 0)", {v: 0, f: ""}],

  ["1999/00", new Date(2000,3,24), "VS", "Bourg Staint Pierre", "<a href=http://map.geo.admin.ch/?Y=585250&X=85425&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Cabane du Velan</a>", "2415", {v: 16, f: "NNW"}, "1", "1 (3, 2)", {v: 3, f: "3"}],

  ["1999/00", new Date(2000,3,18), "VS", "Saas Fee", "<a href=http://map.geo.admin.ch/?Y=638360&X=104270&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Plattjen / Mittaghorn</a>", "2580", {v: 16, f: "NNW"}, "3", "1 (6, 1)", {v: 3, f: "3"}],

  ["1999/00", new Date(2000,2,1), "GR", "Klosters Serneus", "<a href=http://map.geo.admin.ch/?Y=791410&X=187800&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pischahorn</a>", "2970", {v: 13, f: "W"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["1999/00", new Date(2000,1,26), "BE", "Frutigen", "<a href=http://map.geo.admin.ch/?Y=615170&X=153500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Elsighorn / Achsetberg</a>", "2190", {v: 15, f: "NW"}, "2", "1 (2, 1)", {v: 2, f: "2"}],

  ["1999/00", new Date(2000,1,21), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=780970&X=189450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mittelgrat / Meierhofertälli / Skigebiet Parsenn</a>", "2615", {v: 3, f: "NE"}, "2", "3 (6, 4)", {v: 3, f: "3"}],

  ["1999/00", new Date(2000,1,13), "SG", "Grabs", "<a href=http://map.geo.admin.ch/?Y=743050&X=225450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Alp Plisen / Chäserrugg</a>", "1800", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["1999/00", new Date(2000,1,5), "VS", "Finhaut", "<a href=http://map.geo.admin.ch/?Y=561650&X=101900&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Six Jeur / Châtelard</a>", "1940", {v: 5, f: "E"}, "1", "2 (3, 2)", {v: 2, f: "2"}],

  ["1999/00", new Date(2000,0,30), "BE", "Adelboden", "<a href=http://map.geo.admin.ch/?Y=606425&X=146940&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gilbachegge / Sillerenbühl</a>", "1930", {v: 6, f: "ESE"}, "2", "1 (3, 1)", {v: 4, f: "4"}],

  ["1999/00", new Date(1999,11,31), "GR", "Ardez", "<a href=http://map.geo.admin.ch/?Y=808675&X=186365&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Murtera dArdez</a>", "2280", {v: 7, f: "SE"}, "1", "1 (2, 2)", {v: 3, f: "3"}],

  ["1999/00", new Date(1999,11,30), "VS", "Bourg St Pierre", "<a href=http://map.geo.admin.ch/?Y=580785&X=81806&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>LHospitalet / Skigebiet Super Saint-Bernard</a>", "2200", {v: 14, f: "WNW"}, "1", "1 (17, 2)", {v: 3, f: "3"}],

  ["1999/00", new Date(1999,11,27), "GR", "Tschiertschen", "<a href=http://map.geo.admin.ch/?Y=763875&X=185365&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Jakobihang / Skigebiet Gürgaletsch</a>", "2300", {v: 3, f: "NE"}, "3", "1 (1, 1)", {v: 3, f: "3"}],

  ["1999/00", new Date(1999,10,7), "TI", "Bedretto", "<a href=http://map.geo.admin.ch/?Y=678750&X=152090&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pizzo Rotondo</a>", "2930", {v: 9, f: "S"}, "1", "2 (2, 2)", {v: 0, f: ""}],

  ["1998/99", new Date(1999,6,3), "BE", "Guttannen", "<a href=http://map.geo.admin.ch/?Y=653080&X=159200&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Lauteraarhorn / Südwand-Couloir</a>", "3880", {v: 9, f: "S"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["1998/99", new Date(1999,5,28), "UR", "Spiringen", "<a href=http://map.geo.admin.ch/?Y=709000&X=189060&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Clariden Nordwand / Urner Boden</a>", "3080", {v: 1, f: "N"}, "1", "2 (2, 2)", {v: 0, f: ""}],

  ["1998/99", new Date(1999,3,20), "GR", "Scuol", "<a href=http://map.geo.admin.ch/?Y=821160&X=175620&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mot dal Gajer / Val Stipa / S-charl</a>", "2750", {v: 15, f: "NW"}, "1", "1 (2, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1999,3,14), "GR", "Susch", "<a href=http://map.geo.admin.ch/?Y=792610&X=177690&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Radönt / Flüelapass</a>", "3020", {v: 4, f: "ENE"}, "1", "1 (3, 0)", {v: 2, f: "2"}],

  ["1998/99", new Date(1999,2,9), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=794200&X=143400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Diavolezza</a>", "2900", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1999,1,23), "UR", "Silenen", "<a href=http://map.geo.admin.ch/?Y=697540&X=183240&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Geisslaui / Widderlaui (Chli Wingällen - Egg - Maderanertal) / Golzern / Bristen</a>", "2750", {v: 9, f: "S"}, "4", "1 (1, 1)", {v: 5, f: "5"}],

  ["1998/99", new Date(1999,1,23), "VS", "Geschinen", "<a href=http://map.geo.admin.ch/?Y=662300&X=152000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Trützilawine / Trützi / Trützital / Geschinerbach</a>", "2600", {v: 5, f: "E"}, "4", "1 (1, 1)", {v: 5, f: "5"}],

  ["1998/99", new Date(1999,1,21), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=608000&X=107400&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Avalanche du Bréquet / Le Bréquet / Pte  du Prélet - La Confraric</a>", "2900", {v: 12, f: "WSW"}, "4", "9 (9, 9)", {v: 4, f: "4"}],

  ["1998/99", new Date(1999,1,21), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=607300&X=108550&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Avalanche des Maures / Torrent des Maures / Col de Torrent - Prés de Villa - Cretta Reinar</a>", "2900", {v: 12, f: "WSW"}, "3", "3 (4, 3)", {v: 4, f: "4"}],

  ["1998/99", new Date(1999,1,13), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=585800&X=103750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Grand Combe / Les Fontanets / Les Ruinettes / Verbier</a>", "2150", {v: 13, f: "W"}, "2", "1 (1, 1)", {v: 3, f: "3"}],

  ["1998/99", new Date(1999,1,11), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=780760&X=178330&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Leidbachmeder / Leidbach / Nüllisch Grat / Rinerhorn / Glaris</a>", "2280", {v: 14, f: "WNW"}, "2", "1 (2, 2)", {v: 4, f: "4"}],

  ["1998/99", new Date(1999,1,8), "BE", "Lauterbrunnen", "<a href=http://map.geo.admin.ch/?Y=638850&X=161300&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Chläbischopflouena / Chläbischopflaui (Tschuggen / Schwarzes Band - In Gassen) / Wengen</a>", "2150", {v: 13, f: "W"}, "4", "2 (2, 2)", {v: 4, f: "4"}],

  ["1998/99", new Date(1999,1,7), "GR", "Lavin", "<a href=http://map.geo.admin.ch/?Y=804650&X=186025&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Laviner da Gonda / Gonda-Lawine / Piz Chapisun - Inn</a>", "2840", {v: 8, f: "SSE"}, "3", "1 (4, 4)", {v: 4, f: "4"}],

  ["1998/99", new Date(1999,1,1), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=588800&X=105580&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Les Lués Rares / Col de la Mouche / Tortin / Skigebiet Mont Fort</a>", "2560", {v: 3, f: "NE"}, "2", "1 (6, 3)", {v: 3, f: "3"}],

  ["1998/99", new Date(1999,0,6), "BE", "Grindelwald", "<a href=http://map.geo.admin.ch/?Y=639620&X=160150&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Inberg / Lauberhorn / Tschuggen / Kleine Scheidegg</a>", "2200", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1999,0,1), "VS", "Bourg St Pierre", "<a href=http://map.geo.admin.ch/?Y=579830&X=80030&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Combe des Morts / Col du Gd St Bernard</a>", "2400", {v: 3, f: "NE"}, "1", "1 (4, 1)", {v: 3, f: "3"}],

  ["1998/99", new Date(1999,0,1), "TI", "Quinto", "<a href=http://map.geo.admin.ch/?Y=700750&X=153050&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pécian / Sulle Coste</a>", "2540", {v: 12, f: "WSW"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["1998/99", new Date(1998,11,27), "VS", "Trient", "<a href=http://map.geo.admin.ch/?Y=563900&X=98225&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>LArolette / Croix de Fer </a>", "2240", {v: 1, f: "N"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1998,11,13), "SZ", "Morschach / Schwyz", "<a href=http://map.geo.admin.ch/?Y=692300&X=203950&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Summerlaui / Jochli / Stooswald</a>", "1380", {v: 1, f: "N"}, "2", "1 (1, 0)", {v: 3, f: "3"}],

  ["1998/99", new Date(1998,11,12), "VS", "Saas Almagell", "<a href=http://map.geo.admin.ch/?Y=639070&X=103500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Meiggergrabe / Meiggertal / Mittaghorn</a>", "2680", {v: 7, f: "SE"}, "1", "1 (2, 0)", {v: 2, f: "2"}],

  ["1998/99", new Date(1998,11,12), "VS", "Val dIlliez", "<a href=http://map.geo.admin.ch/?Y=551770&X=115000&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Sur Gde Conche / Cuboré / Brochaux / Pte de Mossette</a>", "2100", {v: 14, f: "WNW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1998,11,10), "VS", "Evolène", "<a href=http://map.geo.admin.ch/?Y=599540&X=96500&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Col de Riedmatten / Monts Rouges / Arolla</a>", "2980", {v: 6, f: "ESE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["1998/99", new Date(1998,9,4), "BE", "Reichenbach im Kandertal", "<a href=http://map.geo.admin.ch/?Y=627150&X=149420&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Morgenhorn - Gamchigletscher</a>", "3600", {v: 1, f: "N"}, "1", "2 (2, 1)", {v: 0, f: ""}],

  ["1997/98", new Date(1998,3,20), "GR", "Samedan", "<a href=http://map.geo.admin.ch/?Y=783400&X=139750&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Il Chapütschin</a>", "2950", {v: 4, f: "ENE"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["1997/98", new Date(1998,2,30), "SZ", "Unteriberg", "<a href=http://map.geo.admin.ch/?Y=704550&X=210630&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Schwarzstock</a>", "1450", {v: 11, f: "SW"}, "1", "1 (1, 1)", {v: 2, f: "2"}],

  ["1997/98", new Date(1998,2,18), "GR", "Mulegns", "<a href=http://map.geo.admin.ch/?Y=763050&X=150440&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Platta</a>", "3300", {v: 9, f: "S"}, "1", "2 (4, 0)", {v: 2, f: "2"}],

  ["1997/98", new Date(1998,0,26), "GR", "Lantsch Lenz", "<a href=http://map.geo.admin.ch/?Y=766060&X=177480&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Pizza Naira / Parpaner Rothorn</a>", "2800", {v: 14, f: "WNW"}, "2", "1 (1, 1)", {v: 2, f: "2"}],

  ["1997/98", new Date(1998,0,25), "VS", "Hérémence", "<a href=http://map.geo.admin.ch/?Y=600000&X=94380&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Glacier de Tsena Réfien / Pigne dArolla</a>", "3300", {v: 16, f: "NNW"}, "1", "1 (6, 3)", {v: 2, f: "2"}],

  ["1997/98", new Date(1998,0,21), "FR", "Charmey", "<a href=http://map.geo.admin.ch/?Y=583500&X=162100&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Laubspitz - Litefret / Vallée-de-la-Mort / Jaunpass</a>", "1620", {v: 14, f: "WNW"}, "3", "1 (1, 1)", {v: 4, f: "4"}],

  ["1997/98", new Date(1998,0,20), "GR", "Samedan", "<a href=http://map.geo.admin.ch/?Y=784730&X=157670&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Margunin / Alp Muntatsch</a>", "2435", {v: 7, f: "SE"}, "1", "1 (1, 1)", {v: 3, f: "3"}],

  ["1997/98", new Date(1998,0,4), "UR", "Andermatt", "<a href=http://map.geo.admin.ch/?Y=690250&X=163550&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Geissgrat - Gemsplangge / Gemsstock</a>", "2400", {v: 1, f: "N"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["1997/98", new Date(1997,11,29), "VS", "Bagnes", "<a href=http://map.geo.admin.ch/?Y=581500&X=98085&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tête de la Payanne / Bruson</a>", "2435", {v: 3, f: "NE"}, "1", "1 (2, 2)", {v: 3, f: "3"}],

  ["1997/98", new Date(1997,11,21), "UR", "Andermatt", "<a href=http://map.geo.admin.ch/?Y=689950&X=161950&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gemsstock</a>", "2940", {v: 15, f: "NW"}, "3", "1 (2, 1)", {v: 4, f: "4"}],

  ["1997/98", new Date(1997,11,19), "GR", "St Moritz", "<a href=http://map.geo.admin.ch/?Y=779150&X=152850&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Camanna Suvretta / Piz Nair</a>", "2560", {v: 11, f: "SW"}, "2", "1 (2, 1)", {v: 3, f: "3"}],

  ["1997/98", new Date(1997,9,26), "BE", "Kandersteg", "<a href=http://map.geo.admin.ch/?Y=622300&X=146540&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Doldenhornsattel / Doldenhorn</a>", "3420", {v: 1, f: "N"}, "1", "2 (2, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,6,21), "UR", "Realp", "<a href=http://map.geo.admin.ch/?Y=675000&X=162600&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Tiefengletscher / Galenstock</a>", "3540", {v: 5, f: "E"}, "1", "3 (3, 2)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,4,4), "GR", "Pontresina", "<a href=http://map.geo.admin.ch/?Y=789450&X=143440&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Boval</a>", "3220", {v: 5, f: "E"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,28), "BE", "Innertkirchen", "<a href=http://map.geo.admin.ch/?Y=672520&X=180385&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Steintälli / Jochpass / Engstlenalp</a>", "2380", {v: 16, f: "NNW"}, "2", "3 (6, 4)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,23), "NW", "Wolfenschiessen", "<a href=http://map.geo.admin.ch/?Y=676330&X=195310&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Haldigrat / Chäserstad</a>", "1870", {v: 3, f: "NE"}, "1", "1 (1, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,23), "VS", "Hérémence", "<a href=http://map.geo.admin.ch/?Y=595090&X=109960&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Greppon Blanc</a>", "2200", {v: 5, f: "E"}, "1", "1 (1, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,21), "BE", "Lenk", "<a href=http://map.geo.admin.ch/?Y=608760&X=137560&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Wildstrubel / Schneehorn</a>", "3100", {v: 11, f: "SW"}, "1", "2 (2, 2)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,21), "GR", "Klosters Serneus", "<a href=http://map.geo.admin.ch/?Y=784160&X=192220&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Gotschnagrat / Gotschnawang</a>", "2180", {v: 3, f: "NE"}, "2", "1 (2, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "GR", "Tavetsch Tujetsch", "<a href=http://map.geo.admin.ch/?Y=694200&X=167380&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Oberalppass / Pazolastock</a>", "2320", {v: 3, f: "NE"}, "1", "1 (3, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591330&X=106470&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Cleuson</a>", "2240", {v: 13, f: "W"}, "1", "1 (2, 2)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "VD", "Rougemont", "<a href=http://map.geo.admin.ch/?Y=581800&X=144920&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>La Videmanette</a>", "2130", {v: 15, f: "NW"}, "2", "1 (2, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "VS", "Hérémence", "<a href=http://map.geo.admin.ch/?Y=593520&X=110200&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Greppon Blanc</a>", "2680", {v: 5, f: "E"}, "2", "1 (2, 2)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "VS", "Nendaz", "<a href=http://map.geo.admin.ch/?Y=591270&X=108160&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Le Métailler / Plan di Arjes</a>", "2150", {v: 15, f: "NW"}, "1", "1 (1, 0)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,16), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=574110&X=96810&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Champex / La Breya / Couloir de Planzin</a>", "2120", {v: 2, f: "NNE"}, "2", "1 (1, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,1,15), "GR", "Davos", "<a href=http://map.geo.admin.ch/?Y=783080&X=190820&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Parsenn / Stützalp</a>", "2020", {v: 2, f: "NNE"}, "2", "1 (1, 0)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,0,11), "VS", "Hérémence", "<a href=http://map.geo.admin.ch/?Y=598240&X=93380&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Mont Blanc de Cheilon</a>", "3800", {v: 15, f: "NW"}, "1", "2 (2, 0)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,0,4), "GR", "Disentis", "<a href=http://map.geo.admin.ch/?Y=702800&X=174730&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Piz Gendusas</a>", "2650", {v: 6, f: "ESE"}, "2", "1 (5, 5)", {v: 0, f: ""}],

  ["1996/97", new Date(1997,0,2), "VS", "Orsières", "<a href=http://map.geo.admin.ch/?Y=572425&X=95775&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Champex / Piste Rouge de l `Arpette</a>", "2560", {v: 16, f: "NNW"}, "3", "1 (2, 1)", {v: 0, f: ""}],

  ["1996/97", new Date(1996,11,31), "GR", "Zernez", "<a href=http://map.geo.admin.ch/?Y=797300&X=171450&zoom=8&crosshair=circle&bgLayer=ch.swisstopo.pixelkarte-farbe&time_current=latest&lang=de&topic=ech&layers_opacity=0.35&layers=ch.swisstopo.hangneigung-ueber_30 target=_blank>Munt da Brail / Val Paistel / Brail</a>", "2480", {v: 6, f: "ESE"}, "1", "1 (1, 1)", {v: 0, f: ""}],

];

// Create CSV
var csv = [header].concat(data.map(processAvalancheData)).join('\n');

// Save write it in data/avalanches.csv
fs.writeFile("data/avalanches.csv", csv, function(err) {
    if(err) {
        return console.log(err);
    }
});
