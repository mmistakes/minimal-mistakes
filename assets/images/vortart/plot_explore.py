import xarray as xr
from matplotlib import pyplot as plt
from cmocean import cm
import colorcet as cc

cmaps = ["RdBu_r", "bwr", "seismic", cm.balance, cc.cm.coolwarm]
cmaps = ["RdBu_r", cm.balance, cc.cm.coolwarm]

#+++++
lim = 1e-2
ω = xr.open_dataarray("vortx_Gamma10.nc")
opts = dict(vmin=-lim, vmax=lim, add_colorbar=False)
chunk = dict(yC=slice(0, 200))
#-----


#+++++
ncols=1
nrows=len(cmaps)
size = 4
fig, axes = plt.subplots(ncols=1, nrows=nrows, figsize=(ncols*size, nrows*size),
                         squeeze=False)
axesf = axes.flatten()
#-----


for i, cmap in enumerate(cmaps):
    ω.sel(**chunk).isel(time=-1).plot.imshow(ax=axesf[i], cmap=cmap, **opts)


for ax in axesf:
    ax.set_title("")
    ax.set_aspect(1)
    ax.set_xlabel("")
    ax.set_ylabel("")

fig.tight_layout()
fig.savefig("vort_explore.pdf", bbox_inches="tight", pad_inches=0.05)
