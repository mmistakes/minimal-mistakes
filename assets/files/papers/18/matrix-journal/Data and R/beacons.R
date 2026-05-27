#####################
# Beacons
#####################
#RPL #XCTP #MATRIX
library(Hmisc)


bm = c( 2111.9,
        2326.6,
        2391.8,
        2562.8,
        2493.7,
        2798.9,
        3171,
        2921.2,
        3210.6,
        4234.6)#matrix

bc = c(1790.5,
       1869.6,
       1842.8,
       1929.9,
       1951.6,
       2054.1,
       2198.6,
       2090,
       2861.3,
       3272.6)#ctp

bx = c(1790.5,
       1869.6,
       1842.8,
       1929.9,
       1951.6,
       2054.1,
       2198.6,
       2090,
       2861.3,
       3272.6)#xctp

br = c(9356.4,
       9342.7,
       9544,
       9319.8,
       9414.5,
       9415.6,
       9289.8,
       9322.2,
       9406.1,
       9309)#rpl






mat = matrix(c(bm[1],bc[1],bx[1],br[1], #scn 1 Matrix, CTP, XCTP, RPL ---> Sem falhas
               bm[2],bc[2],bx[2],br[2],  #scn 2 Matrix, CTP, XCTP, RPL
               bm[3],bc[3],bx[3],br[3], #scn 3 Matrix, CTP, XCTP, RPL
               bm[4],bc[4],bx[4],br[4], #scn 4 Matrix, CTP, XCTP, RPL
               bm[5],bc[5],bx[5],br[5],  #scn 5 Matrix, CTP, XCTP, RPL
               bm[6],bc[6],bx[6],br[6], #scn 6 Matrix, CTP, XCTP, RPL
               bm[7],bc[7],bx[7],br[7], #scn 7 Matrix, CTP, XCTP, RPL
               bm[8],bc[8],bx[8],br[8],  #scn 8 Matrix, CTP, XCTP, RPL
               bm[9],bc[9],bx[9],br[9], #scn 9 Matrix, CTP, XCTP, RPL
               bm[10],bc[10],bx[10],br[10]  #scn 10 Matrix, CTP, XCTP, RPL
               ), nrow = 4, ncol=10)


flow = c("MATRIX", "CTP","XCTP","RPL")
colors = c("#F7F7F7","#D0D0D0","#909090","black")
bp = barplot(mat,xaxis=flow, xlab="Scenarios",ylab="Number of Beacons", col=colors,
             beside=TRUE, ylim=c(0,12000))#, legend=row)

axis(1, at=bp[2,], labels=c("Sc 1", "Sc 2","Sc 3","Sc 4","Sc 5","Sc 6","Sc 7","Sc 8","Sc 9","Sc 10"))

upper1 = lower1 = c(
  55.55831178,
  174.9395689,
  138.1467603,
  271.6087489,
  103.388832,
  175.526309,
  281.7475148,
  201.2618795,
  247.0200584,
  619.210374)

upper2 = lower2 = c(72.67926809,
                    65.03342292,
                    89.15552683,
                    87.37866535,
                    101.5723961,
                    177.2637316,
                    193.0177342,
                    159.3867699,
                    745.802264,
                    901.0531139)


upper3 = lower3 = c(72.67926809,
                    65.03342292,
                    89.15552683,
                    87.37866535,
                    101.5723961,
                    177.2637316,
                    193.0177342,
                    159.3867699,
                    745.802264,
                    901.0531139)

upper4 = lower4 = c(95.94865523,
           73.80786336,
           192.9384165,
           142.6518053,
           96.92154806,
           148.7025722,
           104.0241437,
           79.3109706,
           91.62431577,
           120.476241)

errbar(bp[1,], mat[1,], mat[1,]+upper1, mat[1,]-lower1, add=T, xlab="", pch="-")
errbar(bp[2,], mat[2,], mat[2,]+upper2, mat[2,]-lower2, add=T, xlab="", pch="-")
errbar(bp[3,], mat[3,], mat[3,]+upper3, mat[3,]-lower3, add=T, xlab="", pch="-")
errbar(bp[4,], mat[4,], mat[4,]+upper4, mat[4,]-lower4, add=T, xlab="", pch="-")
grid(col="black",lty = "dotted", lwd = par("lwd"))

legend("top",flow, xpd = TRUE, horiz =TRUE, inset = c(0,0), pch=c(15, 15, 15,15), col = colors)