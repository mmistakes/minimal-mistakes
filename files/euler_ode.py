import numpy as np
import matplotlib.pyplot as plt


def dvdt(V, t):
    a = g - rho*A*cd*V**2/2/m
    return a


def analyticalsol(t):
    v = (21.0262*np.exp(0.933124*t)-21.0262)/(np.exp(0.933124*t)+1)
    return v


v_0 = 0  # m/s    initial velocity
t_0 = 0  # s      initial time
t_end = 10  # s      end time
m = 100  # kg     mass
A = 3.14  # m^2    area
cd = 1.15  # drag coefficent
rho = 1.229  # kg/m^3 air density
g = 9.81    # m/s^2 gravitational acceleration
dt = 1  # s      timestep

num_result = []  # empty of numerical results
num_time = []  # empy list of numerical time series

for dt in [1, 0.5, 0.25, 0.01]:
    result = []  # empty of numerical results
    time = []  # empy list of numerical time series
    v = v_0  # Initialize Velocity
    t = t_0  # Initialize Time
    while (t < t_end):
        time.append(t)  # Store Current Time
        result.append(v)  # Store Current Velocity
        acceleration = dvdt(v, t)  # Get Acceleration
        v += acceleration * dt  # Advance velocity
        t += dt  # Advance time
    num_time.append(time)
    num_result.append(result)


# Sample 50 Point betwen t_0 and t_end
a_time = np.linspace(t_0, t_end, num=50)
a_result = analyticalsol(a_time)  # Get the solution


plt.plot(a_time, a_result, label="Analytical Solution")
plt.plot(num_time[0], num_result[0], label="Numerical Solution dt = 1")
plt.plot(num_time[1], num_result[1], label="Numerical Solution dt = 0.5")
plt.plot(num_time[2], num_result[2], label="Numerical Solution dt = 0.25")
plt.plot(num_time[3], num_result[3], label="Numerical Solution dt = 0.01")
plt.legend()
plt.xlabel('Time [s]')
plt.ylabel('Velocity [m/s]')
plt.xlim([0, 10])
plt.ylim([0, 22])
plt.grid()
plt.savefig("ode_euler.png")
plt.show()
