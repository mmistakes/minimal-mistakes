
#####################
#TABLE ENTRIES
#####################
#RPL #XCTP #MATRIX
library(Hmisc)
mat = matrix(
c(2.85*5, 42.857142857142854, 100,
  2.253193509*5, 55.142857142857146, 100,
  2.257610824*5, 72.57142857142857, 100,
  2.242858554*5, 71.14285714285714, 100,
  2.1730179028133*5, 77.42857142857143, 100), nrow = 3, ncol=5)


row = c("MATRIX", "XCTP", "RPL")
colors = c("white","grey", "black")
bp = barplot(mat,xaxis=c(100,200,300,400,500),
  xlab="Number of Nodes",ylab="Usage of table entries (%)", col=colors,
  beside=TRUE)#, legend=row)
#legend("topright",row)
axis(1, at=bp[2,], labels=c(100,200,300,400,500))

lower3 = c(0,0,0,0,0)
upper3 = c(0,0,0,0,0)

lower2 = c(6.885714285714287,8.628571428571428, 13.228571428571428, 12.4, 13.599999999999998)
upper2 = c(6.857142857142858, 8.6, 13.200000000000001, 12.371428571428572, 13.571428571428571)

lower1 = c(0.147996535, 0.09617181, 0.067695534, 0.176246943, 0.004082727)
upper1 = c(0.147996535, 0.09617181, 0.067695534, 0.176246943, 0.004082727)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")
errbar(bp[3,], mat[3,], mat[3,]+upper3, mat[3,]-lower3, add=T, xlab="", pch="-")

grid(col="black",lty = "dotted", lwd = par("lwd"))

legend("topleft", row, pch=c(22,15,15), col = c("black","grey","black"),cex=0.75)






#####################
#TABLE ENTRIES
#####################
#RPL #XCTP #MATRIX
library(Hmisc)
mat = matrix(
  c(0.8, 1.2, 1.3, 1.8, 2.2,
    2.85, 2.85, 2.85, 2.85, 2.85,
    15.1, 16.4, 17.2, 18.4, 18.6,
    20,20,20,20,20), nrow = 5, ncol=4)

mat=mat*5
flow = c("1 flow", "2 flows", "3 flows", "4 flows", "5 flows")
colors = c("white","#D0D0D0","#606060","#202020","black")
bp = barplot(mat,xaxis=c(100,200,300,400,500),
             xlab="Number of Nodes",ylab="Usage of table entries (%)", col=colors,
             beside=TRUE)#, legend=row)

axis(1, at=bp[3,], labels=c("XCTP", "MATRIX", "AODV", "RPL"))

lower1 = c(0,0.147996535,13,0)
upper1 = c(1,0.147996535,18,0)

lower2 = c(1, 0.147996535, 13, 0)
upper2 = c(2, 0.147996535, 19, 0)

lower3 = c(1, 0.147996535, 14, 0)
upper3 = c(3, 0.147996535, 20, 0)

lower4 = c(1,0.147996535,16,0)
upper4 = c(2,0.147996535,20,0)

lower5 = c(1,0.147996535,15,0)
upper5 = c(3,0.147996535,20,0)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")
errbar(bp[3,], mat[3,], mat[3,]+upper3, mat[3,]-lower3, add=T, xlab="", pch="-")
errbar(bp[4,], mat[4,], mat[4,]+upper4, mat[4,]-lower4, add=T, xlab="", pch="-")
errbar(bp[5,], mat[5,], mat[5,]+upper5, mat[5,]-lower5, add=T, xlab="", pch="-")

grid(col="black",lty = "dotted", lwd = par("lwd"))

legend("topleft",flow, pch=c(22, 15, 15, 15, 15, 15), col = c("black","#D0D0D0","#606060","#202020", "black"))






#####################
# NUMBER OF BEACONS
#####################
library(Hmisc)
rpl = c(0, 75.535, 124.727, 170.04, 219.288, 264.292)
xctp = c(0, 24.586, 31.596, 38.747, 46.152, 53.574)
matrix = c(0,29.9459,37.0139,44.2782,51.6739,55.7456)

x = c(0,60,120,180,240,300)

plot(x, rpl,xlab="Time (mins)",ylab="Number of Beacons / node",xaxt = 'n', type="b",pch=21, bg="black",lty=2)
lines(x, xctp, type="b",pch=22, bg="grey",lty=3)
lines(x, matrix, type="b",pch=24, bg="white",lty=1)
grid(col="gray",lty = "dotted",
     lwd = par("lwd"))
axis(1, at=x, labels=x)


lower1 = c(0,2.2,2.5,2.8,3.1,3.3)
upper1 = c(0,2.1164500000000004,2.4875199999999893,2.770370000000014,3.116749999999996,3.32107000000002)

lower2 = c(0,1.4714,1.4714,1.46777,1.48362,1.47871)
upper2 = c(0,1.4714,1.4714,1.46777,1.48362,1.47871)

lower3 = c(0,0.736493158, 0.740901229, 0.749144562,0.747732161,0.934195816)
upper3 = c(0,0.736493158,0.740901229,0.749144562,0.747732161,0.934195816)

errbar(x, rpl, rpl+upper1, rpl-lower1, add=T, xlab="",pch="-")
errbar(x, xctp, xctp+upper2, xctp-lower2, add=T, xlab="",pch="-")
errbar(x, matrix, matrix+upper3, matrix-lower3, add=T, xlab="",pch="-" )



legend("topleft",c("RPL", "XCTP", "MATRIX"),pch=c(21,22,24),lty=c(2,3,1))






#####################
# RAM e ROM
#####################
#RPL #XCTP #MATRIX
mat = matrix(
  c(1505, 1812,2859,2119, 6516,
    16204, 17942,24550,13868, 46454), nrow = 5, ncol=2)
mat = mat/1000

y = c(1505, 6516, 1812, 1894)

row = c("CTP", "XCTP", "MATRIX", "AODV", "RPL")
colors = c("white","#D0D0D0","#909090","#606060","black")
bp = barplot(mat,xaxis=c("RAM", "ROM"),
             xlab="" ,ylab="Code and memory footprint (Kb)", col=colors,
             beside=TRUE,ylim=c(0,55),)#, legend=row)
legend("topleft", row, pch=c(22, 15, 15, 15, 15), col = c("#909090","#D0D0D0","#909090","#606060","black"))
text(x = bp, y = mat, label = mat, pos = 3, cex = 0.8, col = "black")
axis(1, at=bp[2,], labels=c("RAM", "ROM"))



#####################
# Routing success
#####################



#####################
#TABLE ENTRIES
#####################
#RPL #XCTP #MATRIX
library(Hmisc)
mat = matrix(
  c(101.4936448,101.4936448, #scn 1 DynMat, NonDynMat, XCTP ---> Sem falhas
    101.962125,99.54951699, #scn 2 DynMat, NonDynMat, XCTP
    101.2833652,99.16038984, #scn 3 DynMat, NonDynMat, XCTP
    101.1542032,99.21455875, #scn 4 DynMat, NonDynMat, XCTP
    105.4772541,94.90040475, #scn 5 DynMat, NonDynMat, XCTP
    105.3620748,94.70753581, #scn 6 DynMat, NonDynMat, XCTP
    103.1045298,94.69122669, #scn 7 DynMat, NonDynMat, XCTP
    108.6077839,89.10553443, #scn 8 DynMat, NonDynMat, XCTP
    108.8314822,88.7241204, #scn 9 DynMat, NonDynMat, XCTP
    105.7422359,88.76409066 #scn 10 DynMat, NonDynMat, XCTP
    ), nrow = 2, ncol=10)

flow = c("D. MATRIX", "Nd. MATRIX")
colors = c("#D0D0D0","#606060")
bp = barplot(mat,xaxis=flow,
             xlab="Scenarios",ylab="Downward success rate (%)", col=colors,
             beside=TRUE)#, legend=row)

axis(1, at=bp[2,], labels=c("Scn 1", "Scn 2","Scn 3","Scn 4","Scn 5","Scn 6","Scn 7","Scn 8","Scn 9","Scn 10"))

lower1 = c(0.273506747,
           0.52873502,
           0.484011056,
           1.514385671,
           1.395976124,
           1.914507651,
           2.412537738,
           1.931896098,
           2.74305039)
upper1 = c(0.273506747,
           0.52873502,
           0.484011056,
           1.514385671,
           1.395976124,
           1.914507651,
           2.412537738,
           1.931896098,
           2.74305039)

lower2 = c(0.339071845,
           0.383356114,
           0.568954725,
           0.885873632,
           0.643087575,
           0.484692767,
           1.173563126,
           1.170546816,
           1.614433379)

upper2 = c(0.339071845,
           0.383356114,
           0.568954725,
           0.885873632,
           0.643087575,
           0.484692767,
           1.173563126,
           1.170546816,
           1.614433379)

#lower3 = c(0,0,0,0,0,0,0,0,0,0)
#upper3 = c(0,0,0,0,0,0,0,0,0,0)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")
#errbar(bp[3,], mat[3,], mat[3,]+upper3, mat[3,]-lower3, add=T, xlab="", pch="-")

grid(col="black",lty = "dotted", lwd = par("lwd"))

legend("bottom", flow, xpd = TRUE, horiz = TRUE, inset = c(0,0), pch=c(15, 15), col = c("#D0D0D0", "#606060"), cex=0.7)






#####################
#TABLE ENTRIES
#####################
setwd("C:/Users/Bruna/Dropbox/UFMG/Submiss?o de Artigos/MSWim 2016/Simulações")
rpl1 = read.csv("rpl.csv")
matrix1 = read.csv("matrix.csv")
xctp1 = read.csv("xctp.csv")
mhcl1 = read.csv("mhcl.csv")


rpl = data.frame(usage=rpl1$tableusage)
matrix = data.frame(usage=matrix1$tableusage)
#xctp = data.frame(usage=xctp1$tableusage)
#mhcl = data.frame(usage=mhcl1$tableusage)


rpl1 = rpl1/20
matrix1 = matrix1/20
#xctp = xctp/20
#mhcl = mhcl/20

rpl$Protocol <- 'RPL'
matrix$Protocol <- 'MATRIX'
#xctp$prot <- 'XCTP'
#mhcl$prot <- 'MHCL'

#and combine into your new data frame protLengths
#protLengths <- rbind(matrix,rpl,xctp, mhcl)
protLengths <- rbind(matrix,rpl)

#now make your lovely plot
x1 = rpl1$tableusage
y1 = ecdf(x1)
plot(y1, xlab="Table Usage",ylab="CDF", verticals = TRUE, pch = 21, lty=1, col="grey",main="Routing Table Usage")

x2 = matrix1$tableusage
y2 = ecdf(x2)
lines(y2, verticals = TRUE,pch = 22,lty=3)

legend("topleft",c("RPL", "MATRIX"),pch=c(21,22),col=c("grey","black"), lty=c(1,3))