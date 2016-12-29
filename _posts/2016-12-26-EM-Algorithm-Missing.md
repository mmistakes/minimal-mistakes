---
published: true
status: publish
excerpt: "EM Algorithm is basically expectation maximization, although you need to find the complete data first"
---
 
If we are ever asked to fill data for missing values in a continuous variable setting, well there are numerous ways. Many will just impute the mean of the variable for the missing value and some will just remove the observation. 

But we are first inetersted in keeping as much information as we can (not the second option) and also we don't want to mess with the covariance structure of our data (the first option). 

EM algorithm uses likelihood function for maximization of conditional distribution of missing values given observed values. Missing values does not only include the missing data, also it incorporates the missing mean vectors and covariance matrix! This is our complete data structure in the EM algorithm lingo!

Here we are only looking to fill in multivariate normal data, since it's asymptotically more useful and well, it is more convenient. Also, we should be aware of randomness of our missing values. It should be missing at completely random. (This is not the place for differentiating between different randomness structures, but just as a hint, think of a variable "income" where people may based on multiple reasons avoid answering it. It would be wise to closely look at our data to be certain that the randomness is completely at random, believe me!)

To solve this problem we need to first partition our data. Each variable should be sorted such that missing values are at the top of the observed vector. 

$$x=\left[\begin{array}{c}x_{m} \\ \hline x_{o}\end{array}\right]$$

where "m" stands for missing values and "o" stands for observed. In a multivariate sense, this would reslut in patterns like [ m m o] and [o m o] and so.
 
Now we are ready to start our EM algorithm. First we assume we have all the data.Therefore, our likelihood becomes

$$L_c(\mu,\Sigma|x)=\prod_{i=1}^{n}(2\pi)^{-\frac{p}{2}}|\Sigma|^{-\frac{1}{2}}exp\{-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)\}$$

Where "c" stands for complete data (a notation of most importance in EM algorithm. I will discuss other applications, like EM algortihm classification based on normal mixture models. Choosing the **Complete data** is so harder than the obvious choice here). 
 
Taking the log we have 

$$l_c(\mu,\Sigma|x)\propto \sum_{i=1}^{n}{-\frac{1}{2}}log(|\Sigma|)+\{-\frac{1}{2}(x_i-\mu)^T\Sigma^{-1}(x_i-\mu)\}$$

$$={-\frac{1}{2}}log(|\Sigma|)-\frac{1}{2}\sum_{i=1}^{n}tr\{\Sigma^{-1}(x_i-\mu)(x_i-\mu)^T\}$$
 
$tr$, here means the trace of the matrix. Since the $(x_i-\mu)^T\Sigma^{-1}(x_i-\mu)$ is a scalar, well its trace is equivalent to its value. And we know we can change the order of matrix multiplications in a trace. Although you should always take notice of the dimensions of the matrices and the only possible way of doing it, is in a cycle.  

$$l_c(\mu,\Sigma|x)\propto \frac{-n}{2}log(|\Sigma|)-\frac{1}{2}tr\{\Sigma^{-1}\sum_{i=1}^{n}(x_ix_i^T-x_i\mu^T-\mu x_i^T+\mu\mu^T)\}$$
 
With this likelihood, now we can make our Q function. The Q function in the EM algorithm is basically, the expectation of loglikelihood of missing data, given the current estimates. Taking derivatives of this function would build our estimates for missing values. 
 
$$Q(x^m,\theta'|\theta,x^o)=E(l_c(x^m,\theta')|\theta,x^o)$$
 
where $\theta$ vector, is our initial values for our parameters (you can input any set of values, it will hopefully converge eventually). The parameters in a normal distribution are the mean and the covariance matrix.  
 
$$Q(x^m,\mu',\Sigma'|\mu,\Sigma,x^o)\propto \frac{-n}{2}log(|\Sigma'|)-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}(E(x_{i}{x_{i}}^T|\mu,\Sigma,x_{i}^o) \ldots$$

$$ \ldots-E(x_{i}|\mu,\Sigma,x_{i}^o)\mu'^T-\mu' E({x_{i}}^T|\mu,\Sigma,x_{i}^o)+\mu\mu^T)\}$$
 
Now we need to calculate the expectations ins our Q function. (Note that the parameters are initial values for the iteration in the Q function.) Let's first go through the simple ones. From conditional distributions described above we know that with different patterns of missing values,
 
$$x_i^*=E(x_{i}|\mu,\Sigma,x_{i}^o)=\left[\begin{array}{c}E^{m} \\ \hline E^{o} \end{array}\right]$$
 
where,
 
$$E^o=E(x_{i}^o|\mu,\Sigma,x_{i}^o)=x_i^o$$

$$E^m=E(x_{i}^m|\mu,\Sigma,x_{i}^o)=\mu_{i}^m+\Sigma_{i}^{mo}{\Sigma_{i}^{oo}}^{-1}(x_{i}^o-\mu_{i}^o)$$

The last equation is from the fact that since the data is normal:

$$f(x_{m}|x_{o})\sim N_{dim(x_m)}(\mu_{m}+\Sigma_{mo}\Sigma_{oo}^{-1}(x_{o}-\mu_o),\Sigma_{mm}-\Sigma_{mo}\Sigma_{oo}^{-1}\Sigma_{om})$$
 
In order to understand this better, you need to look at text books which cover partitioning and conditional distribution of multivariate normal distribution. A good reference could be Johnson's ["Applied multivariate statistical analysis"](https://www.amazon.com/Applied-Multivariate-Statistical-Analysis-6th/dp/0131877151).  
 
The harder expectation is really more involved! 

$${x_ix_i^T}^*=E(x_{i} {x_{i}}^T|\mu,\Sigma,x_{i}^o)=\left[\begin{array}{c|c}E^{mm} & E^{mo}\\ \hline E^{om} & E^{oo}\end{array}\right]$$
 
We need to find each part of this matrix separately. First we need a building block. Going back to the conditional distribution and some simple statistical concepts, we can find:

$$Cov(x_i^mx_i^m)=E[x_i^m-E(x_i^m)][x_i^m-E(x_i^m)]^T$$

$$=E(x_i^m{x_i^m}^T)-2E(x_i^m){E^m}^T+E^m{E^m}^T=E(x_i^m{x_i^m}^T)-E^m{E^m}^T$$
 
$$\Rightarrow E({x_i^m}{x_i^m}^T|\mu,\Sigma,x_{i}^o)=Cov(x_i^mx_i^m)+E^m{E^m}^T$$

Remember from the conditional distribution $Cov(x_i^mx_i^m)=\Sigma_{i}^{mm}-\Sigma_{i}^{mo}{\Sigma_{i}^{oo}}^{-1}\Sigma_{i}^{om}$. 

So we get:

$$E^{mm}=E(x_{i}^m {x_{i}^m}^T)=\Sigma_{i}^{mm}-\Sigma_{i}^{mo}{\Sigma_{i}^{oo}}^{-1}\Sigma_{i}^{om}+E^m{E^m}^T$$
 
Other parts are easy...

$$E^{mo}=E(x_{i}^m {x_{i}^o}^T|\mu,\Sigma,x_{i}^o)=E^m{x_i^o}^T$$
 
$$E^{oo}=E(x_{i}^o {x_{i}^o}^T|\mu,\Sigma,x_{i}^o)=x_i^o{x_i^o}^T$$
 
So by our abbreviations we have:
 
$$Q(x_i^m,\mu',\Sigma'|\mu,\Sigma,x_o)\propto \frac{-n}{2}log(|\Sigma'|)-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)\}$$
 
Taking the differential wrt elements of $\mu'$ and $\Sigma'$  we have:
 
$$dQ=\frac{-n}{2}tr(\Sigma'^{-1}d\Sigma')-\frac{1}{2}tr\{-\Sigma'^{-1}d\Sigma'\Sigma'^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)\}\ldots$$

$$\ldots-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}(-2x_i^*d\mu'^T+2\mu' d\mu'^T)\}$$ 

Note:  $\frac{d log( \| \Sigma' \| ) }{d\Sigma'}=tr(\Sigma'^{-1}d\Sigma')$ ,$\frac{d\Sigma'^{-1}}{d\Sigma'}=-\Sigma'^{-1}d\Sigma'\Sigma'^{-1}$. 

And $d\mu'\mu'^T=d\mu'^T\mu'$, $d\mu'{x_i^{\*}}^T=x_i^{\*}d\mu'^T$, all scalars.
 
$$dQ=\frac{-n}{2}tr(\Sigma'^{-1}d\Sigma')-\frac{1}{2}tr\{-\Sigma'^{-1}\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)\Sigma^{-1}d\Sigma'\} \ldots$$

$$\ldots-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu')d\mu'^T\}$$

$$dQ=\frac{-1}{2}tr\Big\{\Sigma'^{-1}(nI-\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)\Sigma'^{-1})d\Sigma'\Big\}\ldots$$

$$\ldots-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu')d\mu'^T\}$$
 
 
Now we can take partials wrt elements of $\mu$ and $\Sigma$.
  
$$\frac{\partial Q}{ \partial \mu'_i}=-\frac{1}{2}tr\{\Sigma'^{-1}\sum_{i=1}^{n}-2(x_i^*-\mu')\frac{\partial \mu'^T}{\partial \mu'_i}\}\overset{set}=0$$

$$\Rightarrow \sum_{i=1}^{n}\hat \mu'=\sum_{i=1}^{n}x_i^*\Rightarrow\hat \mu'=\frac{\sum_{i=1}^{n}x_i^*}{n}$$
 
(the same as $T_1$ in Johnson book notation.)
 
$$\frac{\partial Q}{ \partial \sigma'_{ij}}=\frac{-1}{2}tr\Big\{\Sigma'^{-1}(nI-\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)\Sigma'^{-1})\frac{\partial \Sigma'}{\partial \sigma'_{ij}}\Big\}\overset{set}=0$$
 
For simplicity of notations let's assume:

$$B_{p\times p}=\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*\mu'^T-\mu' {x_i^T}^*+\mu'\mu'^T)$$
 
So our maximization is, 

$$tr\Big\{
{\Sigma'^{-1}}(nI-B{\Sigma'^{-1})}\frac{\partial \Sigma'}{\partial \sigma'_{ij}}\Big\}\overset{set}=0$$

$$\Rightarrow nI=\hat B\hat{\Sigma'^{-1}}\Rightarrow\hat{\Sigma'}=\hat B/n$$
 
$$ \hat{\Sigma'}=\frac{\sum_{i=1}^{n}({x_ix_i^T}^*-x_i^*{\hat{\mu'}}^T-\hat{\mu'} {x_i^T}^*+\hat \mu'{\hat{\mu'}}^T)}{n}$$

$$=\frac{\sum_{i=1}^{n}{x_ix_i^T}^*}{n}-\hat \mu' {\hat{\mu'}}^T-\hat{\mu'} {\hat \mu'}^T+\hat \mu'{\hat {\mu'}}^T$$

$$\Rightarrow \hat{\Sigma'}=\frac{\sum_{i=1}^{n}{x_ix_i^T}^*}{n}-\hat \mu' {\hat{\mu'}}^T$$
 
where we have replaced $\sum_{i=1}^{n}x_i^{\*}=n\hat{\mu'}$. 


So the pseudo algorithm  will be:
 
Initiation:
0. Remove observations with no observed values (none of the variables are filled).
1. Assume some initial values for $\mu$ and $\Sigma$, which can be $\mu=\bar X$ without the missing values and $\Sigma=Cov(X)$ with values of $\mu$ replacing the corresponding missing spots.

Iteration:
2. Calculate $x_i^{\*}$ and ${x_ix_i^T}^{\*}$ for each observation as calculated in the body of the text above. 
3. Calculate $\hat \mu'=\frac{\sum_{i=1}^{n}x_i^{\*}}{n}$ and $\hat{\Sigma'}=\frac{\sum_{i=1}^{n}({x_ix_i^T}^{\*})}{n}-\hat \mu'\hat {\mu'}^T$. 
4. Check the condition that $mre=\frac{\theta'-\theta}{max(1,\theta)}$ is bigger than some error tolerance, like 1e-5
5. Replace  initial values with $\theta'$ if the condition is not met and do steps 2-5

Let's show the code below!
 
```
EM_missing_normal<-function(data,maxit=300,tolerr=1e-5){
  
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
  xbar_init<-apply(data,MARGIN = 2,FUN = mean,na.rm = TRUE)
  pred<-data
  
  for (i in 1:p){
        pred[is.na(data[,i]),i]<-xbar_init[i]
  }
  
  #changing to biased version
  sig_init<- (n-1)/n*cov(pred)
  
  while (mre>tolerr & it<=maxit){
    #initializing the covariance structure
    temp<-temp_s<-0
    
    #initializing theta
    par<-c(xbar_init,sig_init)

    for (i in 1:n){
      #going into row structures
      x_st<-data[i,]
      x_st<-matrix(as.numeric(x_st),ncol=1)
      
      if (sum(is.na(x_st))!=0){
        pos<-which(is.na(x_st))
        x_st[pos,]<-xbar_init[pos]+sig_init[pos,-pos]%*%solve(sig_init[-pos,-pos])%*%
          matrix(x_st[-pos,]-xbar_init[-pos],ncol=1)
        pred[i,]<-t(x_st)
      }
      temp<-temp+x_st
    }
    xbar_new<-temp/n
    
    for( i in 1:n){
      x_st<-data[i,]
      x_st<-matrix(as.numeric(x_st),ncol=1)
      s_st<-x_st%*%t(x_st)
      pred_i<-pred[i,]
      
      if (sum(is.na(x_st))!=0){
        
        pos<-which(is.na(x_st))
        s_st[pos,pos]<-sig_init[pos,pos]-sig_init[pos,-pos]%*%solve(sig_init[-pos,-pos])%*%
          sig_init[-pos,pos]+pred_i[pos]%*%matrix(pred_i[pos],nrow=1)
        s_st[-pos,pos]<-x_st[-pos,] %*% matrix(pred_i[pos],nrow=1)
        s_st[pos,-pos]<-t(s_st[-pos,pos])
      }
      
      temp_s<-temp_s+s_st
    }
    
    sig_new<-temp_s/n-xbar_new%*%t(xbar_new)
    par_new<-c(xbar_new,sig_new)
    mre<-norm(matrix(par_new-par),type='f')/max(1,norm(matrix(par)))
    
    it<-it+1
    sig_init<-sig_new
    xbar_init<-xbar_new
  }
    
  return(list(mu_hat=xbar_new,sigma_hat=sig_new,imputed_data=pred,iteration=it-1))
}


mu<-c(3,-2,1)
Sigma<-matrix(c(10,5,4,5,18,7,4,7,9),nrow=3)
X <- matrix(c(NA,4.605047,5.8303953,7.595643,1.754275,1.8826819,
              4.047683,-1.791576,NA,-1.672295,-3.434457,2.1768536,
              2.904052,-3.906055,-4.6161726),byrow=TRUE,ncol=3,nrow=5)

X

          [,1]      [,2]      [,3]
[1,]        NA  4.605047  5.830395
[2,]  7.595643  1.754275  1.882682
[3,]  4.047683 -1.791576        NA
[4,] -1.672295 -3.434457  2.176854
[5,]  2.904052 -3.906055 -4.616173

EM_missing_normal(data = X)

$mu_hat
           [,1]
[1,]  4.4593624
[2,] -0.5545532
[3,]  0.7703236

$sigma_hat
          [,1]     [,2]      [,3]
[1,] 14.929406 11.24509  5.850901
[2,] 11.245085 10.60176  9.078100
[3,]  5.850901  9.07810 12.528246

$imputed_data
          [,1]      [,2]      [,3]
[1,]  9.421729  4.605047  5.830395
[2,]  7.595643  1.754275  1.882682
[3,]  4.047683 -1.791576 -1.422140
[4,] -1.672295 -3.434457  2.176854
[5,]  2.904052 -3.906055 -4.616173

$iteration
[1] 27

```

This one was just a test run! let's try to input a bigger dataset with more NAs.

```
require(mvtnorm)
X<-rmvnorm(500,mu,Sigma)
X<-matrix(sample(c(1,NA),replace = TRUE,size = 1500,prob = c(.8,.2)),ncol=3)*X
res_EM<-EM_missing_normal(data = X)

mu
[1]  3 -2  1

res_EM$mu_hat
           [,1]
[1,]  3.0607628
[2,] -2.0160209
[3,]  0.9529273

Sigma
     [,1] [,2] [,3]
[1,]   10    5    4
[2,]    5   18    7
[3,]    4    7    9

res_EM$sigma_hat

          [,1]      [,2]     [,3]
[1,] 10.758784  5.648521 4.539657
[2,]  5.648521 17.776601 7.085454
[3,]  4.539657  7.085454 8.952918


head(X)

         [,1]       [,2]      [,3]
[1,] 4.418652  5.0735260 -1.466755
[2,]       NA -3.1240911  3.619677
[3,] 2.514385         NA -1.794425
[4,]       NA  5.6331904  8.978965
[5,]       NA -4.4166678  2.878070

head(res_EM$imputed_data)
         [,1]       [,2]      [,3]
[1,] 4.418652  5.0735260 -1.466755
[2,] 3.869075 -3.1240911  3.619677
[3,] 2.514385 -3.9844869 -1.794425
[4,] 7.349378  5.6331904  8.978965
[5,] 3.373832 -4.4166678  2.878070
[6,] 4.791034  0.9120221  3.853654

res_EM$iteration
[1] 8

```

With only 8 iterations we have got to the best possible solution. That's impressive. and Also very better than just imputing averages since we are considering the covariance structure of the data. 

Let's check what would have happened if we only used the means. 

```

xbar_init<-apply(X,MARGIN = 2,FUN = mean,na.rm = TRUE)
pred<-X

for (i in 1:3){
      pred[is.na(X[,i]),i]<-xbar_init[i]
}
head(pred)
         [,1]       [,2]      [,3]
[1,] 4.418652  5.0735260 -1.466755
[2,] 3.023887 -3.1240911  3.619677
[3,] 2.514385 -2.0317233 -1.794425
[4,] 3.023887  5.6331904  8.978965
[5,] 3.023887 -4.4166678  2.878070
[6,] 4.791034  0.9120221  3.853654

sig_init<- cov(pred)
sig_init

         [,1]      [,2]     [,3]
[1,] 8.616418  3.518584 2.652180
[2,] 3.518584 14.777407 4.990744
[3,] 2.652180  4.990744 7.245354
```

I would say that's pretty off from the population variables we provided for producing our data, contrary to the EM algorithm outputs.




