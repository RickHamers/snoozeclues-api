from sklearn.tree import DecisionTreeClassifier
import joblib
import sys

value = [[
    sys.argv[1],
    sys.argv[2], 
    sys.argv[3], 
    sys.argv[4]]]

dt = joblib.load('dt.joblib')
prediction = dt.predict(value)

print(prediction[0])
