#testing svm
import joblib
import pandas as pd
import numpy as np

# Loading the model from the pickle file
clf = joblib.load('crop_model.pkl')
fname = [[11,268,2020,1,3,2000]]
#predicting
op = clf.predict(fname)
print(op)