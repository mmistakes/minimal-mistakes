function drawCharts(e, t) {
  var r = e.values;
  if (t > mobileBreak) var a = 90,
    n = 45;
  else var a = 105,
    n = 35;
  if (t > mobileBreak) var l = {
      top: 30,
      right: 160,
      bottom: 0,
      left: 280
    },
    i = {
      declared: "officially declared"
    };
  else var l = {
      top: 30,
      right: 25,
      bottom: 0,
      left: 15
    },
    i = {
      declared: "declared"
    };
  var o = t - l.left - l.right,
    c = r.length * a - l.bottom,
    d = d3.scale.linear().rangeRound([0, o]),
    u = d3.scale.ordinal().rangeRoundBands([0, c], .5),
    s = d3.select("#chart-" + e.key + "-svg").attr("width", o + l.left + l.right).attr("height", c + l.top + l.bottom).select("g").attr("transform", "translate(" + l.left + "," + l.top + ")");
  r.forEach(function(e) {
    var t = 0,
      r = e.Declared,
      a = e.Limit - e.Declared,
      n = e.Declared + e.Undeclared - e.Limit;
    e.over = n, e.headroom = a, e.over > 0 ? e.spends = [{
      name: "declared",
      y0: t,
      y1: t += +r
    }, {
      name: "undeclared",
      y0: t,
      y1: t += +a
    }, {
      name: "over",
      y0: t,
      y1: t += +n
    }] : e.spends = [{
      name: "declared",
      y0: t,
      y1: t += +r
    }, {
      name: "undeclared",
      y0: t,
      y1: t += +e.Undeclared
    }, {
      name: "over",
      y0: t,
      y1: t += 0
    }], e.total = r + a + n
  }), r.sort(function(e, t) {
    return t.over - e.over
  }), d.domain([0, d3.max(r, function(e) {
    return e.total
  })]), u.domain(r.map(function(e) {
    return e.Constituency
  })), r.forEach(function(e) {
    if ("FARAGE" == e.Group || "BY" == e.Group) var t = o / (d(e.Declared) + d(e.headroom) + d(d3.max(r, function(e) {
      return e.over
    })));
    else if (e.over > 0) var t = (o - d(r[0].over)) / (d(e.Declared) + d(e.headroom));
    else var t = (o - d(r[0].over)) / (d(e.Declared) + d(e.Undeclared)),
      t = (o - d(r[0].over)) / d(e.Limit);
    e.scale = t, e.spends.forEach(function(e) {
      e.scale = t
    })
  });
  var y = s.selectAll(".constit").data(r),
    m = y.enter().append("g").attr("class", "constit");
  if (t > mobileBreak) var p = 0;
  else var p = 0;
  s.append("line").attr("class", "legal-line"), s.append("text").attr("class", "legal-line-label"), m.append("rect").attr("class", "zebra-legal"), m.append("rect").attr("class", "zebra-illegal"), m.selectAll(".bar").data(function(e) {
    return e.spends
  }).enter().append("rect").attr("class", function(e) {
    return "bar " + e.name
  }), m.append("text").attr("class", "label-declared"), m.append("text").attr("class", "label-undeclared"), m.append("text").attr("class", "label-over"), m.append("text").attr("class", "label-limit"), m.append("text").attr("class", "MP"), m.append("text").attr("class", "constituency"), m.append("svg:image").attr("class", "profile-photo"), y.attr("transform", function(e, t) {
    return "translate(0," + t * a + ")"
  }), y.selectAll(".bar").attr("x", function(e) {
    return Math.floor(d(e.y0) * e.scale)
  }).attr("height", function(e) {
    return n
  }).attr("y", function(e) {
    return Math.ceil(a / 2 - n / 2 + p)
  }).attr("width", function(e) {
    return Math.ceil((d(e.y1) - d(e.y0)) * e.scale)
  }), y.select(".label-declared").text(function(e) {
    return gbp(e.Declared) + " " + i.declared
  }).attr("x", function(e) {
    return t > mobileBreak ? Math.ceil(d(e.Declared) * e.scale / 2) : Math.ceil(n + 10)
  }).attr("y", function(e) {
    return a / 2 + 4 + p
  }).style("text-anchor", function(e) {
    return t > mobileBreak ? "middle" : "start"
  }), y.select(".label-undeclared").text(function(e) {
    return "+" + gbp(e.Undeclared)
  }).attr("x", function(e) {
    return t > mobileBreak && d(e.headroom) + d(e.over) > 45 ? Math.ceil(d(e.Declared) * e.scale + d(e.Undeclared) * e.scale / 2) : Math.ceil(d(e.Declared) * e.scale + (d(e.Undeclared) * e.scale - 7))
  }).attr("y", function(e) {
    return a / 2 + 4 + p
  }).style("text-anchor", function(e) {
    return t > mobileBreak && d(e.headroom) + d(e.over) > 45 ? "middle" : "end"
  }), y.select(".label-over").text(function(e) {
    return e.over > 0 ? gbp(e.Declared + e.Undeclared - e.Limit) + " over" : ""
  }).attr("id", function(e, t) {
    return "label-over-" + t
  }).attr("x", function(e) {
    return t > mobileBreak ? o + l.right - 15 : 0
  }).attr("y", function(e) {
    return t > mobileBreak ? a / 2 - 5 : a - 15
  }).style("text-anchor", function(e) {
    return t > mobileBreak ? "end" : "start"
  }), y.select(".label-limit").text(function(e) {
    return e.over > 0 ? gbp(e.Limit) + " cap" : gbp(e.Limit) + " cap"
  }).attr("x", function(e, r) {
    if (t > mobileBreak) return o + l.right - 15;
    var a = y.select("#label-over-" + r).node().getBBox(),
      a = a.width + 4;
    return a
  }).attr("y", function(e) {
    return t > mobileBreak ? a / 2 + 15 : a - 15
  }).style("text-anchor", function(e) {
    return t > mobileBreak ? "end" : "start"
  }), s.select(".legal-line").attr("x1", function(e) {
    return o - d(d3.max(r, function(e) {
      return e.over
    }))
  }).attr("x2", function(e) {
    return o - d(d3.max(r, function(e) {
      return e.over
    }))
  }).attr("y1", -50).attr("y2", c + 50), s.select(".legal-line-label").attr("x", function(e) {
    return o - 10 - d(d3.max(r, function(e) {
      return e.over
    }))
  }).attr("y", -10).text("Legal spending cap"), y.select(".zebra-legal").attr("x", -l.left).attr("y", 0).attr("height", a).attr("width", o + l.left + l.right).attr("class", function(e, t) {
    return t % 2 == 0 ? "zebra-legal zebra-legal-odd" : "zebra-legal zebra-legal-even"
  }), y.select(".zebra-illegal").attr("x", function(e) {
    return o - d(d3.max(r, function(e) {
      return e.over
    }))
  }).attr("y", 0).attr("height", a).attr("width", o).attr("class", function(e, t) {
    return t % 2 == 0 ? "zebra-illegal zebra-illegal-odd" : "zebra-illegal zebra-illegal-even"
  }), y.select(".profile-photo").attr("x", function(e) {
    return t > mobileBreak ? -280 : 0
  }).attr("y", function(e) {
    return t > mobileBreak ? 0 : 35
  }).attr("width", function(e) {
    return t > mobileBreak ? 90 : n
  }).attr("height", function(e) {
    return t > mobileBreak ? 90 : n
  }).attr("xlink:href", function(e) {
    return "images/people/" + e.MP.replace(" MP", "").replace(/\s+/g, "").toLowerCase() + ".jpg"
  }), y.select(".MP").text(function(e) {
    return e.MP
  }).attr("id", function(e) {
    return e.MP.replace(/\s+/g, "").toLowerCase()
  }).attr("x", function(e) {
    return t > mobileBreak ? -175 : 0
  }).attr("y", function(e) {
    return t > mobileBreak ? 40 : 27.5
  }), y.select(".constituency").text(function(e) {
    return e.Constituency
  }).attr("x", function(e, r) {
    if (t > mobileBreak) return -175;
    var a = y.select("#" + e.MP.replace(/\s+/g, "").toLowerCase()).node().getBBox(),
      a = a.width + 4;
    return a
  }).attr("y", function(e) {
    return t > mobileBreak ? 60 : 27.5
  })
}

function resize() {
  charts.forEach(function(e) {
    var t = Math.min(960, parseInt(window.innerWidth));
    drawCharts(e, t)
  })
}
var GB = d3.locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["£", ""],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }),
  gbp = GB.numberFormat("$,.0f"),
  data = [{
    Group: "BY",
    Constituency: "Rochester and Strood",
    MP: "Kelly Tolhurst MP",
    Limit: 1e5,
    Declared: 96793.08,
    Undeclared: 56866.75,
    "Over by": 53659.830000000016
  }, {
    Group: "FARAGE",
    Constituency: "South Thanet",
    MP: "Craig Mackinlay MP",
    Limit: 15016,
    Declared: 14838,
    Undeclared: 19151,
    "Over by": 18973
  }, {
    Group: "BY",
    Constituency: "Clacton",
    MP: "Giles Watling",
    Limit: 1e5,
    Declared: 84049.22,
    Undeclared: 26786.14,
    "Over by": 10835.36
  }, {
    Group: "BY",
    Constituency: "Newark",
    MP: "Robert Jenrick MP",
    Limit: 1e5,
    Declared: 96190.98,
    Undeclared: 10459.3,
    "Over by": 6650.279999999999
  }, {
    Group: "SW",
    Constituency: "North Cornwall",
    MP: "Scott Mann MP",
    Limit: 14732.43,
    Declared: 14476.55,
    Undeclared: 2459.85,
    "Over by": 2203.9699999999975
  }, {
    Group: "NW",
    Constituency: "Rossendale and Darwen",
    MP: "Jake Berry MP",
    Limit: 13084.8,
    Declared: 12978.28,
    Undeclared: 2154.03,
    "Over by": 2047.510000000002
  }, {
    Group: "SW",
    Constituency: "Stroud",
    MP: "Neil Carmichael MP",
    Limit: 15964.62,
    Declared: 15412.81,
    Undeclared: 2459.85,
    "Over by": 1908.039999999999
  }, {
    Group: "SW",
    Constituency: "Cheltenham",
    MP: "Alex Chalk MP",
    Limit: 13229.34,
    Declared: 12576.45,
    Undeclared: 2459.85,
    "Over by": 1806.960000000001
  }, {
    Group: "NW",
    Constituency: "Halifax",
    MP: "Philip Allott",
    Limit: 12856.5,
    Declared: 12407.72,
    Undeclared: 2154.03,
    "Over by": 1705.25
  }, {
    Group: "NW",
    Constituency: "Morecambe & Lunesdale",
    MP: "David Morris MP",
    Limit: 14626.23,
    Declared: 14118.09,
    Undeclared: 2154.03,
    "Over by": 1645.8900000000012
  }, {
    Group: "NW",
    Constituency: "Pudsey",
    MP: "Stuart Andrew MP",
    Limit: 12823.38,
    Declared: 12314.6,
    Undeclared: 2154.03,
    "Over by": 1645.2500000000018
  }, {
    Group: "MID",
    Constituency: "Lincoln",
    MP: "Karl McCartney MP",
    Limit: 13136.28,
    Declared: 12628.68,
    Undeclared: 2044.84,
    "Over by": 1537.2399999999998
  }, {
    Group: "SW",
    Constituency: "Torbay",
    MP: "Kevin Foster MP",
    Limit: 13217.88,
    Declared: 12193.42,
    Undeclared: 2459.85,
    "Over by": 1435.3900000000012
  }, {
    Group: "NW",
    Constituency: "City of Chester",
    MP: "Stephen Mosley",
    Limit: 15403.56,
    Declared: 14668.55,
    Undeclared: 2154.03,
    "Over by": 1419.0199999999986
  }, {
    Group: "NW",
    Constituency: "Hazel Grove",
    MP: "William Wragg MP",
    Limit: 14361.27,
    Declared: 13539.74,
    Undeclared: 2154.03,
    "Over by": 1332.5
  }, {
    Group: "NW",
    Constituency: "Carlisle",
    MP: "John Stevenson MP",
    Limit: 12649.62,
    Declared: 11782.57,
    Undeclared: 2154.03,
    "Over by": 1286.9799999999996
  }, {
    Group: "NW",
    Constituency: "Cheadle",
    MP: "Mary Robinson MP",
    Limit: 13032.96,
    Declared: 12104.01,
    Undeclared: 2154.03,
    "Over by": 1225.0800000000017
  }, {
    Group: "MID",
    Constituency: "Northampton North",
    MP: "Michael Ellis MP",
    Limit: 12248.64,
    Declared: 11418.7,
    Undeclared: 2044.84,
    "Over by": 1214.9000000000015
  }, {
    Group: "MID",
    Constituency: "Dudley South",
    MP: "Mike Wood MP",
    Limit: 12295.68,
    Declared: 11452.6,
    Undeclared: 2044.84,
    "Over by": 1201.7600000000002
  }, {
    Group: "MID",
    Constituency: "Cannock Chase",
    MP: "Amanda Milling MP",
    Limit: 15355.23,
    Declared: 14465.95,
    Undeclared: 2044.84,
    "Over by": 1155.5600000000013
  }, {
    Group: "MID",
    Constituency: "Broxtowe",
    MP: "Anna Soubry MP",
    Limit: 15000.09,
    Declared: 14106.96,
    Undeclared: 2044.84,
    "Over by": 1151.7099999999991
  }, {
    Group: "SW",
    Constituency: "Yeovil",
    MP: "Marcus Fysh MP",
    Limit: 16242.54,
    Declared: 14870.73,
    Undeclared: 2459.85,
    "Over by": 1088.0399999999972
  }, {
    Group: "NW",
    Constituency: "Weaver Vale",
    MP: "Graham Evans MP",
    Limit: 14856.63,
    Declared: 13720.32,
    Undeclared: 2154.03,
    "Over by": 1017.7200000000012
  }, {
    Group: "MID",
    Constituency: "Amber Valley",
    MP: "Nigel Mills MP",
    Limit: 14955.09,
    Declared: 13881.62,
    Undeclared: 2044.84,
    "Over by": 971.3700000000008
  }, {
    Group: "SW",
    Constituency: "Wells",
    MP: "James Heappey MP",
    Limit: 16092.51,
    Declared: 14575.64,
    Undeclared: 2459.85,
    "Over by": 942.9799999999977
  }, {
    Group: "SW",
    Constituency: "Thornbury and Yate",
    MP: "Luke Hall MP",
    Limit: 14709.21,
    Declared: 13128.08,
    Undeclared: 2459.85,
    "Over by": 878.7200000000012
  }, {
    Group: "MID",
    Constituency: "Nuneaton",
    MP: "Marcus Jones MP",
    Limit: 14768.88,
    Declared: 13435.51,
    Undeclared: 2044.84,
    "Over by": 711.4700000000012
  }, {
    Group: "SW",
    Constituency: "Camborne & Redruth",
    MP: "George Eustice MP",
    Limit: 14710.29,
    Declared: 12798.21,
    Undeclared: 2459.85,
    "Over by": 547.7699999999986
  }, {
    Group: "MID",
    Constituency: "Sherwood",
    MP: "Mark Spencer MP",
    Limit: 15187.2,
    Declared: 12760,
    Undeclared: 2044.84,
    "Over by": -382.3600000000006
  }, {
    Group: "MID",
    Constituency: "Erewash",
    MP: "Maggie Throup MP",
    Limit: 15265.32,
    Declared: 12234.25,
    Undeclared: 2044.84,
    "Over by": -986.2299999999996
  }, {
    Group: "SW",
    Constituency: "Plymouth Sutton and Devonport",
    MP: "Oliver Colvile MP",
    Limit: 12846.18,
    Declared: 8769,
    Undeclared: 2459.85,
    "Over by": -1617.33
  }, {
    Group: "MID",
    Constituency: "Wolverhampton South West",
    MP: "Paul Uppal",
    Limit: 12276.12,
    Declared: 8134.73,
    Undeclared: 2044.84,
    "Over by": -2096.550000000001
  }, {
    Group: "NW",
    Constituency: "Bury North",
    MP: "David Nuttall MP",
    Limit: 12755.4,
    Declared: 7151.3,
    Undeclared: 2154.03,
    "Over by": -3450.0699999999997
  }],
  charts = d3.nest().key(function(e) {
    return e.Group
  }).entries(data),
  rowHeight = 90,
  maxWidth = 960,
  mobileBreak = 750;
charts.forEach(function(e) {
  d3.select("#chart-" + e.key).append("svg").attr("id", "chart-" + e.key + "-svg").append("g");
  var t = Math.min(960, parseInt(window.innerWidth));
  drawCharts(e, t)
}), d3.select(window).on("resize", resize);
