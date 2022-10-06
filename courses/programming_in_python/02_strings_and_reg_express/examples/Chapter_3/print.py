rates = " Interest Rate for months of 2022 in %"
Jan = 2.25
Feb = 2.75
Mar = 3.5
Apr = 4.5
May = 5.25
Jun = 6
Jul = 6.5

#METHOD 1
print(rates, "\nJan: {}".format(Jan), "\nFeb: {}".format(Feb), "\nMar: {}".format(Mar), "\nApr: {}".format(Apr),
            "\nMay: {}".format(May), "\nJun: {}".format(Jun), "\nJul: {}".format(Jul))

#METHOD 2
print(rates + '\n' + "Jan: {}\nFeb: {}\nMar: {}\nApr: {}\nMay: {}\nJun: {}\nJul: {}".format(Jan, Feb, Mar, Apr, May, Jun, Jul))

#METHOD 3
print(rates, "Jan: {}\nFeb: {}\nMar: {}\nApr: {}\nMay: {}\nJun: {}\nJul: {}".format(Jan, Feb, Mar, Apr, May, Jun, Jul), sep ='\n')

#METHOD 4
print(rates, f"Jan: {Jan}", f"Feb: {Feb}", f"Mar: {Mar}" ,f"Apr: {Apr}:", f"May: {May}", f"Jun: {Jun}", f"Jul: {Jul}", sep ='\n')

#METHOD 5
print(rates + '\n' + "Jan: %g\nFeb: %g\nMar: %g\nApr: %g\nMay: %g\nJun: %g\nJul: %g" % (Jan, Feb, Mar, Apr, May, Jun, Jul)) 