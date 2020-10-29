import pandas as pd
import seaborn as sns
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
from datetime import datetime

data = pd.read_csv(r"crop_production.csv")

data.dropna(subset=["Production"],axis=0,inplace=True)
data.isnull().sum()

x=data.iloc[:,[0,1,2,3,4,5]].values
#x

labelencoder=LabelEncoder()
x[:,0]=labelencoder.fit_transform(x[:,0])
x[:,1]=labelencoder.fit_transform(x[:,1])
x[:,3]=labelencoder.fit_transform(x[:,3])
x[:,4]=labelencoder.fit_transform(x[:,4])
pd.DataFrame(x).to_csv("crop_production_modified.csv")

y=data.iloc[:,[6]].values

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=.20)
#x_train

from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression
import pickle
rfr = RandomForestRegressor()
rfr.fit(x_train,y_train)
y_predicted = rfr.predict([[11,268,2020,1,3,2000]])
print(y_predicted)

pickle_out = open("crop_model.pkl","wb")
pickle.dump(rfr, pickle_out)
pickle_out.close()
#r2_score(y_test,y_predicted)