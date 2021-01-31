import xarray as xr
from matplotlib import pyplot as plt
from cmocean import cm
import colorcet as cc


#+++++
lim = 1.2e-2
ω = xr.open_dataarray("vortx_Gamma10.nc")
Lz = (ω.zC.max() - ω.zC.min())/2
ar = 2700/235
opts = dict(vmin=-lim, vmax=lim, add_colorbar=False, cmap="RdBu_r")
chunk = dict(zC=slice(-Lz/2, +Lz/2), yC=slice(0, Lz*ar))
#-----


#+++++
ncols=1
nrows=1
size = 4
fig, axes = plt.subplots(ncols=1, nrows=nrows, figsize=(ncols*size*ar, nrows*size),
                         squeeze=False)
axesf = axes.flatten()
#-----


i=0
ω.sel(**chunk).isel(time=-1).plot.imshow(ax=axesf[i], **opts)


for ax in axesf:
    ax.set_title("")
    ax.set_aspect(1)
    ax.set_xlabel("")
    ax.set_ylabel("")
    ax.set_xticks([])
    ax.set_yticks([])
    ax.axis("off")

fig.tight_layout()
fig.savefig("banner_vorticity.pdf", bbox_inches="tight", pad_inches=0)
