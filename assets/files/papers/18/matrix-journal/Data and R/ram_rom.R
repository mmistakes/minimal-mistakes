#####################
# RAM e ROM
#####################
#RPL #XCTP #MATRIX
mat = matrix(
  c(1505, 1812, 1832, 6508,
    16204,17942, 23450, 42869), nrow = 4, ncol=2)
mat = mat/1000

row =  c("CTP", "XCTP" ,"MATRIX","RPL")
colors = c("#F7F7F7","#D0D0D0","#909090","black")
bp = barplot(mat,xaxis=c("RAM", "ROM"),
             xlab="" ,ylab="Code and memory footprint (Kb)", col=colors,
             beside=TRUE,ylim=c(0,55))#, legend=row)
legend("topleft", row, pch=c(15, 15,15, 15), col = colors)
text(x = bp, y = mat, label = mat, pos = 3, col = "black")
axis(1, at=bp[2,], labels=c("RAM", "ROM"))
