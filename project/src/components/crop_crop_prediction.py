import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression
import pickle

data = pd.read_csv(r"crop_production.csv")

data.dropna(subset=["Production"],axis=0,inplace=True)
data.isnull().sum()

x=data.iloc[:,[0,1,2,3,5,6]].values

labelencoder=LabelEncoder()
x[:,0]=labelencoder.fit_transform(x[:,0])
x[:,1]=labelencoder.fit_transform(x[:,1])
x[:,3]=labelencoder.fit_transform(x[:,3])

y=data.iloc[:,[4]].values
y[:,0]=labelencoder.fit_transform(y[:,0])

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=.20)

rfr = RandomForestRegressor()
rfr.fit(x_train,y_train)
y_predicted = rfr.predict([[27,583,2020,1,10,11]])
print(y_predicted)

pickle_out = open("crop2_model.pkl","wb")
pickle.dump(rfr, pickle_out)
pickle_out.close()
#r2_score(y_test,y_predicted)