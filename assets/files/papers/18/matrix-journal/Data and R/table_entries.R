#####################
#TABLE ENTRIES CDF
#####################
#setwd("C:/Users/Bruna/Dropbox/UFMG/Submissão de Artigos/MSWim 2016/Simulações/Data and R")
rpl1 = read.csv("rpl.csv")
matrix1 = read.csv("matrix.csv")
mhcl1 = read.csv("mhcl.csv")
xctp1 = read.csv("xctp.csv")


rpl1 = rpl1*5
matrix1 = matrix1*5
mhcl1 = mhcl1*5
xctp1 = xctp1*5



#now make your lovely plot
x4 = rpl1$tableusage
y4 = ecdf(x4)
plot(y4, xlab="% Routing table usage",ylab="CDF nodes", verticals = TRUE, pch = 15, lty=1, col="#000000",main=NULL,lwd=2,cex=1.5)


x3 = xctp1$tableusage
y3 = ecdf(x3)
lines(y3, verticals = TRUE,pch = 18,lty=4, col="#606060",lwd=2,cex=1.5)


x2 = mhcl1$tableusage
y2 = ecdf(x2)
lines(y2, verticals = TRUE,pch = 16,lty=3, col="#a0a0a0",lwd=2,cex=1.5)


x1 = matrix1$tableusage
y1 = ecdf(x1)
lines(y1, verticals = TRUE,pch = 17,lty=2, col="#d0d0d0",lwd=2, cex=1.5)


legend("bottomright",c("MATRIX", "MHCL","XCTP", "RPL"),pch=c(17,16,18,15),lty=c(1,3,4,2),lwd=1,col=c("#d0d0d0","#a0a0a0","#606060","#000000"))







#####################
#TABLE ENTRIES Frequency
#####################
setwd("C:/Users/Bruna/Dropbox/UFMG/Submiss?o de Artigos/MSWim 2016/Simula??es/Data and R")
library(ggplot2) 
library(foreign)
library(wesanderson)
rpl1 = read.csv("rpl.csv")
matrix1 = read.csv("matrix.csv")
xctp1 = read.csv("xctp.csv")
mhcl1 = read.csv("mhcl.csv")


rpl = data.frame(usage=rpl1$tableusage)
matrix = data.frame(usage=matrix1$tableusage)
xctp = data.frame(usage=xctp1$tableusage)
mhcl = data.frame(usage=mhcl1$tableusage)


rpl = rpl/20
matrix = matrix/20
xctp = xctp/20
mhcl = mhcl/20

rpl$Protocol <- 'RPL'
matrix$Protocol <- 'MATRIX'
xctp$prot <- 'XCTP'
mhcl$prot <- 'MHCL'

#and combine into your new data frame protLengths
#protLengths <- rbind(matrix,rpl,xctp, mhcl)
protLengths <- rbind(matrix,rpl)

#now make your lovely plot
plot = ggplot(protLengths, aes(usage,y=..count../1000, fill = Protocol)) + geom_histogram(alpha = 0.5, position = 'identity', color = ("black")) + theme_bw() #+ scale_fill_brewer(palette="Greys")
plot + ylab("Frequency") + xlab("Routing Table Usage (%)")
