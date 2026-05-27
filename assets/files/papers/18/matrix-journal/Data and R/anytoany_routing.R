#####################
#RUOTING SUCCESS
#####################
#RPL #XCTP #MATRIX
library(Hmisc)

bm = c(0.999630581,
       0.991963778,
       0.984590137,
       0.967749497,
       0.981640368,
       0.960180611,
       0.91496248,
       0.974797472,
       0.942644733,
       0.845918336)#matrix

bmh = c(0.999630581,
        0.990738118,
        0.981332971,
        0.964295758,
        0.976896743,
        0.955067784,
        0.90095625,
        0.96118565,
        0.920253069,
        0.837694279)#mhcl

br = c(0.088213534,
       0.081474025,
       0.047798191,
       0.022848938,
       0.078302055,
       0.044676208,
       0.020434732,
       0.074032589,
       0.047273612,
       0.018767175)#rpl


bm = bm*100
bmh = bmh*100
br=br*100

perdas = c (0, 1/1000,6/1000,13/1000,8/1000,15/1000,33/1000,15/1000,33/1000,66/1000)
perdas= perdas*100


mat = matrix(c(bm[1],bmh[1],br[1], #scn 1 Matrix, CTP, XCTP, RPL ---> Sem falhas
               bm[2],bmh[2],br[2],  #scn 2 Matrix, CTP, XCTP, RPL
               bm[3],bmh[3],br[3], #scn 3 Matrix, CTP, XCTP, RPL
               bm[4],bmh[4],br[4], #scn 4 Matrix, CTP, XCTP, RPL
               bm[5],bmh[5],br[5],  #scn 5 Matrix, CTP, XCTP, RPL
               bm[6],bmh[6],br[6], #scn 6 Matrix, CTP, XCTP, RPL
               bm[7],bmh[7],br[7], #scn 7 Matrix, CTP, XCTP, RPL
               bm[8],bmh[8],br[8],  #scn 8 Matrix, CTP, XCTP, RPL
               bm[9],bmh[9],br[9], #scn 9 Matrix, CTP, XCTP, RPL
               bm[10],bmh[10],br[10]  #scn 10 Matrix, CTP, XCTP, RPL
), nrow = 3, ncol=10)


mat[1,]=mat[1,]+perdas
mat[2,]=mat[2,]+perdas
mat[3,]=mat[3,]+perdas


flow =  c("MATRIX", "MHCL","RPL")
colors = c("#000000", "#808080", "#e0e0e0")
bp = barplot(mat,axes=FALSE,lty=c(3,3,3),density=c(20,20,20),col=c("black","black","black"),
             xlab="Scenarios",ylab="Any-to-any success rate (%)", 
             beside=TRUE)#, legend=row)

axis(1, at=bp[2,],labels=c("Sc 1", "Sc 2","Sc 3","Sc 4","Sc 5","Sc 6","Sc 7","Sc 8","Sc 9","Sc 10"))

upper1 = lower1 = c(0.000367394,
                    0.000659315,
                    0.001408355,
                    0.003120185,
                    0.001227437,
                    0.009546664,
                    0.009912929,
                    0.001501164,
                    0.003383471,
                    0.012660281)

upper2 = lower2 = c(0.000367394,
                    0.001062918,
                    0.002580375,
                    0.003586635,
                    0.001850344,
                    0.005303379,
                    0.00535808,
                    0.002091736,
                    0.006241631,
                    0.011971187)

upper3 = lower3 = c(0.006328908,
                    0.007402807,
                    0.00758413,
                    0.004736741,
                    0.008332481,
                    0.006077513,
                    0.003314181,
                    0.006391023,
                    0.006519384,
                    0.003339589)

upper1 = lower1 = lower1*100
upper2 = lower2 = lower2*100
upper3 = lower3 = lower3*100


mat[1,]=mat[1,]-perdas
mat[2,]=mat[2,]-perdas
mat[3,]=mat[3,]-perdas

par(new=TRUE)

barplot(mat,xaxis=flow, ylim=c(0,100),col=colors,  beside=TRUE)#, legend=row)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")
errbar(bp[3,], mat[3,], mat[3,]+upper3, mat[3,]-lower3, add=T, xlab="", pch="-")

grid(col="black",lty = "dotted", lwd = par("lwd"))
grid(col="black",lty = "dotted", lwd = par("lwd"),ny=20)
legend("right", c(flow,"Inevitable losses"), xpd = TRUE,  inset = c(0,0), pch=c(15, 15, 15,12), col = c("#000000", "#808080", "#e0e0e0","black"),cex=0.9)