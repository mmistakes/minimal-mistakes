#####################
#ROUTING SUCCESS
#####################
#XCTP #MATRIX
#BARPLOT
library(Hmisc)

bm = c(0.999380752,
       0.999452214,
       0.999573771,
       0.999623613,
       0.999537757
)#matrix

bx = c(0.987698544,
       0.97921268,
       0.96109906,
       0.999069415,
       0.99969697
)#xctp


bm = bm*100
bx = bx*100



mat = matrix(c(bm[1],bx[1], #scn 1 Matrix, XCTP ---> Sem falhas
               bm[2],bx[2], #scn 2 Matrix, XCTP
               bm[3],bx[3], #scn 3 Matrix, XCTP
               bm[4],bx[4], #scn 4 Matrix, XCTP
               bm[5],bx[5] #scn 5 Matrix, XCTP
), nrow = 2, ncol=5)




flow =  c("MATRIX", "XCTP")
colors = c("#202020","#E0E0E0")
bp = barplot(mat,axes=FALSE,lty=c(3,3),density=c(20,20),col=c("black","black"),
             xlab="Sending interval (ms)",ylab="Top-down success rate (%)", 
             beside=TRUE)#, legend=row)

axis(1, at=bp[2,],labels=c("7","100","200","400","800"))

upper1 = lower1 = c(0.000189208,
                    0.000162217,
                    0.000177626,
                    0.000157981,
                    0.000164475
)

upper2 = lower2 = c(0.015966185,
                    0.012476928,
                    0.024388216,
                    0.001127411,
                    0.000685502
)



upper1 = lower1 = lower1*100
upper2 = lower2 = lower2*100


mat[1,]=mat[1,]-perdas
mat[2,]=mat[2,]-perdas

par(new=TRUE)

barplot(mat,xaxis=flow, ylim=c(0,100),col=colors,  beside=TRUE)#, legend=row)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")

grid(col="black",lty = "dotted", lwd = par("lwd"))
grid(col="black",lty = "dotted", lwd = par("lwd"),ny=20)
legend("right", flow, xpd = TRUE,  inset = c(0,0), pch=c(15, 15), col = c("#202020","#E0E0E0"),cex=0.9)


##############################################################################








#LINEPLOT
library(Hmisc)
bm = c(1.000375464,
       1.000320704,
       1.000337609,
       1.000436153,
       1.000377863,
       1.00041804,
       1.000497564,
       1.000447763,
       1.000406558,
       1.000374712,
       1.00041521)#matrix

bx = c(1,
       1,
       1,
       1,
       1,
       0.720491914,
       0.157092872,
       0.074809321,
       0.064305092,
       0.055949202,
       0.035037285
       )#xctp


bm = bm*100
bx = bx*100

times=c(100,200,225,250,275,300,325,350,375,400,800)

lp = plot(times,bm, xaxt='n', type="o", ylim=c(0,100),xlab="Response interval (ms)",ylab="Response success rate (%)", verticals = TRUE, pch = 15, lty=1, col="#202020",main=NULL,lwd=2,cex=1.5)
lines(times,bx, type="o", verticals = TRUE,pch = 16,lty=3, col="#A0A0A0",lwd=2,cex=1.5)
axis(1,at=times)

legend("bottomleft",c("MATRIX", "XCTP"),pch=c(15,16),lty=c(1,3),lwd=1,col=c("#202020","#A0A0A0"))


upper1 = lower1 = c(0.000121983,
                    0.000148227,
                    0.00011514,
                    0.000155196,
                    0.000202404,
                    0.000162515,
                    0.000132239,
                    0.000113701,
                    0.000135528,
                    0.000173323,
                    0.000164306)

upper2 = lower2 = c(0,
                    0,
                    0,
                    0,
                    0,
                    0.102728914,
                    0.166728432,
                    0.003823939,
                    0.003156113,
                    0.001730108,
                    0.001546059
                    )


upper1 = lower1 = lower1*100
upper2 = lower2 = lower2*100


par(new=TRUE)

errbar(times, bm, bm+upper1, bm-lower1, add=T, xlab="", pch="-")
errbar(times, bx, bx+upper2, bx-lower2, add=T, xlab="", pch="-")

