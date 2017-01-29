Plotting pow laws in linear/semilog/loglog scales with examples and what it means

Use numpy, plot exp, also with manual computation of logs


> TODO explain difference between these plots
 

```
x = np.linspace(0, 10, num=110)
xlog = np.log(x)
y = np.exp(x)
y2 = np.log(y)

x, y, y2

plt.plot(x, y)
plt.show()

plt.plot(x, y2)
plt.show()

plt.semilogy(x, y)
plt.show()
```

> same here for loglog

```
rcParams['figure.figsize'] = (5, 3)

plt.plot(x, y2)
plt.show()

plt.plot(xlog, y2log)
plt.show()

plt.loglog(x, y2)
plt.show()
```

