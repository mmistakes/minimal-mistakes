---
published: true
status: publish
excerpt: "EM Algorithm is basically expectation maximization, although you need to find the complete data first"
---
 
To solve this problem we need to partition our data. Each observation should be sorted such that missing values are at the top of the observation vector. 

$$X=\left[\begin{array}{c}X_{m} \\ \hline X_{o}\end{array}\right]$$, where"o" stands as observed and "m" stands as missing.
 
Since the data is normal we know that 

$$f(X_{m}|X_{o})\sim N_{dim(X_m)}(\mu_{m}+\Sigma_{mo}\Sigma_{oo}^{-1}(x_{o}-\mu_o),\Sigma_{mm}-\Sigma_{mo}\Sigma_{oo}^{-1}\Sigma_{om})$$
 
Now we are ready to start our EM algorithm. First we assume we have all the data.Therefore, our likelihood becomes
 $$L_c(\mu,\Sigma|X)=\prod_{i=1}^{n}(2\pi)^{-p/2}|\Sigma|^{-1/2}exp\{-1/2(x-\mu)^T\Sigma^{-1}(x-\mu)\}$$.Where "c" stands for complete data. 
 
Taking the log we have $$l_c(\mu,\Sigma)\propto \sum_{i=1}^{n}{-1/2}log(|\Sigma|)+\{-1/2(x_i-\mu)^T\Sigma^{-1}(x_i-\mu)\}={-n/2}log(|\Sigma|)-1/2\sum_{i=1}^{n}tr\{\Sigma^{-1}(x_i-\mu)(x_i-\mu)^T\}$$
 
$$l_c(\mu,\Sigma)\propto \frac{-n}{2}log(|\Sigma|)-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}(x_ix_i^T-x_i\mu^T-\mu x_i^T+\mu\mu^T)\}$$
 
With this likelihood, now we can make our Q function.
 
$$Q(x,\theta'|\theta,x^o)=E^*(l_c(\theta'))$$
 
where $$\theta$$ are our initial values and the missing values.  
 
$$Q(x,\mu',\Sigma'|\mu,\Sigma,x^o)\propto \frac{-n}{2}log(|\Sigma|)-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}(E(x_{i}{x_{i}}^T|\mu,\Sigma,x_{i}^o)-E(x_{i}|\mu,\Sigma,x_{i}^o)\mu^T-\mu E({x_{i}}^T|\mu,\Sigma,x_{i}^o)+\mu\mu^T)\}$$
 
From conditional distributions described above we know that with different patterns of missing values,
 
$$X_i^*=E(x_{i}|\mu,\Sigma,x_{i}^o)=\left[\begin{array}{c}E^{m} \\ \hline E^{o} \end{array}\right]$$
 
where,
 
$$E^m=E(x_{i}^m|\mu,\Sigma,x_{i}^o)=\mu_{i}^m+\Sigma_{i}^{mo}{\Sigma_{i}^{oo}}^{-1}(x_{i}^o-\mu_{i}^o)$$
 
$$E^o=E(x_{i}^o|\mu,\Sigma,x_{i}^o)=x_i^o$$
 
And 
 
$${X_iX_i^T}^*=E(x_{i} {x_{i}}^T|\mu,\Sigma,x_{i}^o)=\left[\begin{array}{c|c}E^{mm} & E^{mo}\\ \hline E^{om} & E^{oo}\end{array}\right]$$
 
where
 
$$Cov(x_i^mx_i^m)=E[x_i^m-E(x_i^m)][x_i^m-E(x_i^m)]'=E(x_i^m{x_i^m}')-2E(x_i^m){x_i^*}'+x_i^*{x_i^*}'=E({x_i^m}'x_i^m)-x_i^*{x_i^*}'$$
 
$$\Rightarrow E({x_i^m}'x_i^m)=Cov(x_i^mx_i^m)+x_i^*{x_i^*}'$$
 
and from the conditional distributions above we can write:
 
$$E^{mm}=E(x_{i}^m {x_{i}^m}^T|\mu,\Sigma,x_{i}^o)=\Sigma_{i}^{mm}-\Sigma_{i}^{mo}{\Sigma_{i}^{oo}}^{-1}\Sigma_{i}^{om}+X_i^*{X_i^*}^T$$
 
$$E^{mo}=E(x_{i}^m {x_{i}^o}^T|\mu,\Sigma,x_{i}^o)=x_i^*{x_i^o}^T$$
 
$$E^{oo}=E(x_{i}^o {x_{i}^o}^T|\mu,\Sigma,x_{i}^o)=x_i^o{x_i^o}^T$$
 
So in simpler terms, 
 
$$Q(\mu',\Sigma'|\mu,\Sigma,X_o)\propto \frac{-n}{2}log(|\Sigma|)-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)\}$$
 
Taking the differential wrt elements of $$\mu,\Sigma$$ we have:
 
$$dQ=\frac{-n}{2}tr(\Sigma^{-1}d\Sigma)-\frac{1}{2}tr\{-\Sigma^{-1}d\Sigma\Sigma^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)\}-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}(-2x_i^*d\mu^T+2\mu d\mu^T)\}$$
 
where $$\frac{dlog(|\Sigma|)}{d\Sigma}=tr(\Sigma^{-1}d\Sigma)$$
 
and $$\frac{d\Sigma^{-1}}{d\Sigma}=-\Sigma^{-1}d\Sigma\Sigma^{-1}$$ and $$d\mu\mu^T=d\mu^T\mu$$ and $$d\mu{x_i^*}^T=x_i^*d\mu^T$$, scalars.
 
 
$$dQ=\frac{-n}{2}tr(\Sigma^{-1}d\Sigma)-\frac{1}{2}tr\{-\Sigma^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)\Sigma^{-1}d\Sigma\}-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu)d\mu^T\}$$
 
$$dQ=\frac{-1}{2}tr\Big\{\Sigma^{-1}(nI-\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)\Sigma^{-1})d\Sigma\Big\}-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu)d\mu^T\}$$
 
 
Now we can take partials wrt elements of $$\mu,\Sigma$$.
  
$$\frac{\partial Q}{ \partial \mu_i}=-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu)\frac{\partial \mu^T}{\partial \mu_i}\}\overset{set}=0\Rightarrow \sum_{i=1}^{n}\hat \mu=\sum_{i=1}^{n}x_i^*\Rightarrow\hat \mu=\frac{\sum_{i=1}^{n}x_i^*}{n}$$
 
Which is the same as $$T_1$$ in book notation.
 
$$\frac{\partial Q}{ \partial \sigma_{ij}}=\frac{-1}{2}tr\Big\{\Sigma^{-1}(nI-\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)\Sigma^{-1})\frac{\partial \Sigma}{\partial \sigma_{ij}}\Big\}\overset{set}=0$$
 
$$B_{pxp}=\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu^T-\mu {x_i^T}^*+\mu\mu^T)$$
 
$$tr\Big\{
{\Sigma^{-1}}(nI-B{\Sigma^{-1})}\frac{\partial \Sigma}{\partial \sigma_{ij}}\Big\}\overset{set}=0 \Rightarrow nI=\hat B\hat{\Sigma^{-1}}\Rightarrow\hat{\Sigma}=\hat B/n$$
 
$$ \hat{\Sigma}=\frac{\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*{\hat{\mu}}^T-\hat{\mu} {x_i^T}^*+\hat \mu{\hat{\mu}}^T)}{n}=\frac{\sum_{i=1}^{n}{x_ix_i^T}^*}{n}-\hat \mu {\hat{\mu}}^T-\hat{\mu} {\hat \mu}^T+\hat \mu{\hat {\mu}}^T=\frac{\sum_{i=1}^{n}{x_ix_i^T}^*}{n}-\hat \mu {\hat{\mu}}^T$$
 
where $$\frac{\sum_{i=1}^{n}x_i^*}{n}=\hat{\mu}$$ in this step. 
So the procedure will be:
 
0. Remove observations with no observed values.
1. Assume some initial values for $$\mu$$ and $$\Sigma$$, which can be $$\mu=\bar X$$ without the missing values and $$\Sigma=Cov(X)$$ with values of $$\mu$$replacing the corresponding missing spots.
2. calculate $$x_i^*$$ and $${x_ix_i^T}^*$$ for each observation, wrt the conditional distribution of $$f(X_{m}|X_{o})$$. 
3. Calculate $$\hat \mu=\frac{\sum_{i=1}^{n}x_i^*}{n}$$ and $$\hat{\Sigma}=\frac{\sum_{i=1}^{n}({x_ix_i^T}^*)}{n}-\hat \mu\hat {\mu}^T$$.   
4. Check the condition that $$mre=\frac{\theta'-\theta}{max(1,\theta)}$$ is bigger than some error tolerance, like 1e-5
5. Replace with initial values if the condition is not met and do steps 2-5
 
 

    mu<-c(3,-2,1)
    Sigma<-matrix(c(10,5,4,5,18,7,4,7,9),nrow=3)
    X <- matrix(c(NA,4.605047,5.8303953,7.595643,1.754275,1.8826819,
                  4.047683,-1.791576,NA,-1.672295,-3.434457,2.1768536,
                  2.904052,-3.906055,-4.6161726),byrow=TRUE,ncol=3,nrow=5)
 

    EM_missing_normal<-function(data,maxit=300,tolerr=1e-8,method){
      
      p<-ncol(data)
      #removing the rows with no values
      cr<-is.na(data)
      cr<-rowSums(cr)
      cr<-which(cr==p)
      if (length(cr)>0){data<-data[-cr,]}
     
      #important initial values for the algorithm
      n<-nrow(data)
      mre<-it<-1
      
      #initial values for mu and sigma
      xbar.init<-apply(data,MARGIN = 2,FUN = mean,na.rm = TRUE)
      pred<-data
      for (i in 1:p){
        pred[is.na(pred[,i]),i]<-xbar.init[i]
      }
      #changing to biased version
      sig.init<- (n-1)/n*cov(pred)
      
      while (mre>tolerr & it<=maxit){
        
        par<-c(xbar.init,sig.init)
        
        #initializing the covariance structure
        temp<-temp.s<-0
        
        for (i in 1:n){
          #going into row structures
          x.st<-data[i,]
          x.st<-matrix(as.numeric(x.st),ncol=1)
          
          if (sum(is.na(x.st))!=0){
            pos<-which(is.na(x.st))
            x.st[pos,]<-xbar.init[pos]+sig.init[pos,-pos]%*%solve(sig.init[-pos,-pos])%*%
              matrix(x.st[-pos,]-xbar.init[-pos],ncol=1)
            pred[i,]<-t(x.st)
          }
          temp<-temp+x.st
        }
        xbar.new<-temp/n
        if(method=="wrong"){
          sig.new<-(n-1)/n*cov(pred)
        }else{
          
        for( i in 1:n){
          x.st<-data[i,]
          x.st<-matrix(as.numeric(x.st),ncol=1)
          s.st<-x.st%*%t(x.st)
          pred_i<-pred[i,]
          
          if (sum(is.na(x.st))!=0){
            
            pos<-which(is.na(x.st))
            s.st[pos,pos]<-sig.init[pos,pos]-sig.init[pos,-pos]%*%solve(sig.init[-pos,-pos])%*%
              sig.init[-pos,pos]+pred_i[pos]%*%matrix(pred_i[pos],nrow=1)
            s.st[-pos,pos]<-x.st[-pos,] %*% matrix(pred_i[pos],nrow=1)
            s.st[pos,-pos]<-t(s.st[-pos,pos])
          }
          
          temp.s<-temp.s+s.st
        }
        
          sig.new<-temp.s/n-xbar.new%*%t(xbar.new)
          
        }
        par.new<-c(xbar.new,sig.new)
        mre<-norm(matrix(par.new-par),type='f')/max(1,norm(matrix(par)))
        it<-it+1
        sig.init<-sig.new
        xbar.init<-xbar.new
      }
      
      for (i in 1:p){
        pred[is.na(data[,i]),i]<-xbar.new[i]
      }
      return(list(mu_hat=xbar.new,sigma_hat=sig.new,data=pred,iteration=it-1))
    }
     
    mu

    ## [1]  3 -2  1

    EM_missing_normal(X,method="book")$mu_hat

    ##            [,1]
    ## [1,]  4.4595142
    ## [2,] -0.5545532
    ## [3,]  0.7703448

    EM_missing_normal(X,method="wrong")$mu_hat

    ##            [,1]
    ## [1,]  4.4595142
    ## [2,] -0.5545532
    ## [3,]  0.7703448

    Sigma

    ##      [,1] [,2] [,3]
    ## [1,]   10    5    4
    ## [2,]    5   18    7
    ## [3,]    4    7    9

    EM_missing_normal(X,method="book")$sigma_hat

    ##          [,1]      [,2]      [,3]
    ## [1,] 14.93091 11.245868  5.851660
    ## [2,] 11.24587 10.601760  9.078074
    ## [3,]  5.85166  9.078074 12.528154

    EM_missing_normal(X,method="wrong")$sigma_hat

    ##          [,1]      [,2]      [,3]
    ## [1,] 14.93091 11.245868  5.851660
    ## [2,] 11.24587 10.601760  9.078074
    ## [3,]  5.85166  9.078074 12.528154

    EM_missing_normal(X,method="book")$it

    ## [1] 48

    EM_missing_normal(X,method="wrong")$it

    ## [1] 49
 
Both methods used above seem to produce identical values.  
 
Although these values are not that close to the results we intended, if we expand our sample size we'll have a pretty good approximation of the underlying normal distribution and the missing values.
 

    X<-rmvnorm(500,mu,Sigma)

    ## Error in eval(expr, envir, enclos): could not find function "rmvnorm"

    X<-matrix(sample(c(1,NA),replace = TRUE,size = 1500,prob = c(.8,.2)),ncol=3)*X

    ## Error in matrix(sample(c(1, NA), replace = TRUE, size = 1500, prob = c(0.8, : non-conformable arrays

    mu

    ## [1]  3 -2  1

    EM_missing_normal(X,method="book")$mu_hat

    ##            [,1]
    ## [1,]  4.4595142
    ## [2,] -0.5545532
    ## [3,]  0.7703448

    EM_missing_normal(X,method="wrong")$mu_hat

    ##            [,1]
    ## [1,]  4.4595142
    ## [2,] -0.5545532
    ## [3,]  0.7703448

    Sigma

    ##      [,1] [,2] [,3]
    ## [1,]   10    5    4
    ## [2,]    5   18    7
    ## [3,]    4    7    9

    EM_missing_normal(X,method="book")$sigma_hat

    ##          [,1]      [,2]      [,3]
    ## [1,] 14.93091 11.245868  5.851660
    ## [2,] 11.24587 10.601760  9.078074
    ## [3,]  5.85166  9.078074 12.528154

    EM_missing_normal(X,method="wrong")$sigma_hat

    ##          [,1]      [,2]      [,3]
    ## [1,] 14.93091 11.245868  5.851660
    ## [2,] 11.24587 10.601760  9.078074
    ## [3,]  5.85166  9.078074 12.528154

    EM_missing_normal(X,method="book")$it

    ## [1] 48

    EM_missing_normal(X,method="wrong")$it

    ## [1] 49
 
Although both methods produced the same results in the fewer sampled data, in a bigger dataset, with missing values occuring more than once in an observation, (if the missing values in an observation are occuring more than once the estimated covariance structure would be very different than what we calculate by this wrong method) the method described by the book and produced above is far superior.
 
It is far more consistant and the estimated covariance structure is more reliable. (Based on multiple runs)
 
 
 
