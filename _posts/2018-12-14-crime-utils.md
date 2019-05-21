---
title: "Crime Utilities Script"
date: 2018-12-14
excerpt: "A large number of features can cause for regression models, so we will use PLS Regression on the Florida crime )2017) dataset"
tags: [clean transformation regression plsr]
header:
  overlay_image: /images/fresh-figs.jpeg
  overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

# crime_utils.py

``` python
import math
import warnings

from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
from sklearn.linear_model import LinearRegression
from sklearn import linear_model
from sklearn.cross_decomposition import PLSRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import cross_val_score, cross_val_predict
from scipy.stats import boxcox
from scipy.special import inv_boxcox
import random

random.seed(131)


''' Global Variables '''

model_vars = ['population_log', "population_group",  "burglary_cube_root", "larceny_theft_cube_root"]


def read_data(only_florida=False):
    florida = pd.read_excel('./florida_2017.xls')
    headers = ['city', 'population', 'violent_crime', 'murder', 'rape', 'robbery',
               'assault', 'property_crime', 'burglary', 'larceny_theft',
               'motor_vehicle_theft', 'arson']
    florida.columns = headers
    florida.set_index('city', inplace=True)
    florida = florida[florida.population < florida.population.quantile(0.9)]
    if only_florida:
        return florida


    # read in other states for validation purposes
    ohio = pd.read_excel('./ohio_2017.xls')
    ohio.columns = headers
    ohio.set_index('city', inplace=True)

    michigan = pd.read_excel('./michigan_2017.xls')
    michigan.columns = headers
    michigan.set_index('city', inplace=True)

    north_carolina = pd.read_excel('./north-carolina_2017.xls')
    north_carolina.columns = headers
    north_carolina.set_index('city', inplace=True)

    crime_cols = ['violent_crime', 'murder', 'rape', 'robbery',
                  'assault', 'property_crime', 'burglary', 'larceny_theft',
                  'motor_vehicle_theft', 'arson']
    # so we will want to remove some outliers

    michigan = michigan[michigan.population < michigan.population.quantile(0.9)]
    north_carolina = north_carolina[north_carolina.population < north_carolina.population.quantile(0.9)]
    ohio = ohio[ohio.population < ohio.population.quantile(0.9)]

    return  florida, michigan, north_carolina, ohio



def transform_data(df):
    # add a log odds variable (do not include property crimes though)
    cols = ['violent_crime', 'murder', 'rape', 'robbery',
            'assault', 'burglary', 'larceny_theft',
            'motor_vehicle_theft', 'arson']
    df["log_odds"] = np.log1p(df.population / df[cols].sum(axis=1))

    # log population
    df["population_log"] = np.log(df.population)

    # log1p first adds 1 to x then logs the result
    df["property_crime_log"] = np.log1p(df.property_crime)


    # create a population_medium indicator variable
    # these are going to be relative to the population in each state
    # the medium group is the interquartile range on population (between 1st and 3rd quantiles)
    # population thresholds. simply uses the first 3 quantiles

    population_low = df.population.quantile(0.25)
    popullation_high = df.population.quantile(0.75)


    df["population_medium"] = (df.population.between(population_low, popullation_high)).astype("int")


    # create n population groups
    df["population_group"] = pd.cut(df.population, 5, labels=list(range(1, 6)))


    # create robbery dummy var
    df["has_robbery"] = np.where(df.robbery > 0, 1, 0)


    # because box-cox transforms require x>0, when property_crime is 0 we add 1, else we leave it alone
    df["property_crime_2"] = df["property_crime"].apply(lambda x: x + 1 if x == 0 else x)


    # burglary_cube_root
    df["burglary_cube_root"] = df.burglary ** (1 / 3)


    # assault_log
    df["assault_log"] = np.log1p(df.assault)


    # larceny_theft_cube_root
    df["larceny_theft_cube_root"] = df.larceny_theft ** (1 / 3)


    # robbery_log
    df["robbery_log"] = np.log1p(df.robbery)


    # motor_vehicle_theft_log
    df["motor_vehicle_theft_log"] = np.log1p(df.motor_vehicle_theft)

    return df



def boxcox_transform(df):
    bc = boxcox(df["property_crime_2"])
    df["property_crime_bc"] = bc[0]

    return df, bc[1]




def split(df):
    df_train = df.sample(frac=0.7, random_state=41)
    df_test_cities = list(set(df.index).difference(set(df_train.index)))
    df_test = df.loc[df_test_cities, :]
    return df_train, df_test



def build_model(train, test, bc_lambda):
    # Now lets see how well we can predict the boxcox transform of property_crime

    formula = "property_crime_bc ~ " + ' + '.join(model_vars)

    lm1 = smf.ols(formula=formula, data=train).fit()
    print(lm1.summary())

    pred_train = inv_boxcox(lm1.fittedvalues, bc_lambda)
    pred_test = inv_boxcox(lm1.predict(test), bc_lambda)

    resids_train = train["property_crime"] - pred_train
    resids_test = test["property_crime"] - pred_test
    #print("RMSE: {:.4f}".format(resids_train.std()))

    #print("------\nTrain\n------")


    r2_test_bc = r2_score(test["property_crime_bc"], lm1.predict(test))
    r2_test = r2_score(test["property_crime"], pred_test)
    print("R-squared (Property Crime Box-Cox): {}".format(r2_test_bc))
    print("R-squared (Property Crime): {}".format(r2_test))
    #print("------\nTest\n------")

    build_evaluate_model(train, test, bc_lambda, model_vars)




    return lm1, pred_train, pred_test, resids_train, resids_test


def build_evaluate_model(train, test, bc_lambda, model_vars):
    regr = linear_model.LinearRegression()
    regr.fit(train[model_vars], train["property_crime_bc"])

    y_pred = inv_boxcox(cross_val_predict(regr, test[model_vars], test["property_crime_bc"]), bc_lambda)
    print("R-squared (after reverse property crime Box-Cox): {:.4f}".format(r2_score(test["property_crime"], y_pred)))

    resids_train = evaluate_model(regr, train, bc_lambda, "Train", model_vars)
    resids_test = evaluate_model(regr, test, bc_lambda, "Test", model_vars)

    return regr, resids_train, resids_test



''' Call this function once for the train set and once for the test set '''

def evaluate_model(model, df, bc_lambda, name, model_vars):
    y_pred_bc = cross_val_predict(model, df[model_vars], df["property_crime_bc"])
    cv = cross_val_score(model, df[model_vars], df["property_crime_bc"], cv=5)
    print("{}\n-------------------------------------------------------------\n".format(name))
    print(cv)
    print("cv average is = {:.2f}%".format(cv.mean() * 100))
    ''' return residuals '''

    print("\nBEFORE reversing predicted Box-Cox transform of property crime")
    residuals_bc = df["property_crime_bc"] - y_pred_bc.reshape(y_pred_bc.shape[0],)
    print("Mean Residual: {:.5f}".format(residuals_bc.mean()))
    print("RMSE: {:.2f}".format(residuals_bc.std()))

    print("\nAFTER reversing predicted Box-Cox transform of property crime")
    y_pred = inv_boxcox(y_pred_bc, bc_lambda).reshape(y_pred_bc.shape[0],)

    residuals = df["property_crime"] - y_pred
    print("Mean Residual: {}\nRMSE: {}".format(residuals.mean(), residuals.std()))
    print("Average Error: {}\n".format(np.abs(residuals).sum() / residuals.shape[0]))

    return residuals


def build_evaluate_pls_model(train, test, n_components, bc_lambda, model_vars):
    # Fit a linear model using Partial Least Squares Regression.
    # Reduce feature space to 3 dimensions.
    pls1 = PLSRegression(n_components=n_components)

    # Reduce X to R(X) and regress on y.
    pls1.fit(train[model_vars], train["property_crime_bc"])

    # Save predicted values.
    print('R-squared PLSR (Train):', pls1.score(train[model_vars], train["property_crime_bc"]))
    resids_train = evaluate_model(pls1, train, bc_lambda, "Train", model_vars)

    print('R-squared PLSR (Test):', pls1.score(test[model_vars], test["property_crime_bc"]))
    resids_test = evaluate_model(pls1, test, bc_lambda, "Test", model_vars)

    return pls1, resids_train, resids_test
```