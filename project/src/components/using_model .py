#testing svm
import joblib
import pandas as pd
import numpy as np

data = pd.read_csv(r"crop_production.csv")
data1 = pd.read_csv(r"crop_production_modified.csv")
# Loading the model from the pickle file
clf = joblib.load('crop2_model.pkl')
fname = [[27,583,2013,1,9,21]]
#predicting
op = clf.predict(fname)
print(op)

i=0;
for rows in data1["Crop"]:
	if(rows==int(op)):
		mean_prod=data["Crop"][i]
		break
	i=i+1
print(mean_prod)