# -*- coding: utf-8 -*-
"""
Created on Thu Feb  2 01:09:57 2023

@author: Rect
"""
# Library Imports
import _pickle as pickle
from joblib import load
from flask import Flask, request
import json 
import pandas as pd

from AIMatchmaker import AIMatchmaker
# Setup flask server
app = Flask(__name__) 


@app.route('/api/v1/users/generate-suggestions', methods = ['POST']) 
def suggestions_handler(): 
    data = request.get_json()
    isSaved = data.pop('isClustered', 'No Key found')
    # Data variable contains the 
    # data from the node server
  
    AIMatchmakerInstance = AIMatchmaker()
    res = AIMatchmakerInstance.generate_suggestions(data, isSaved)
    # Return data in json format 
    return res


@app.route('/api/v1/users/get-lastest-index',methods=['GET'])
def index_handler():
    with open("refined_profiles.pkl",'rb') as fp:
        df = pickle.load(fp)
    latest_index=len(df.index)
    return json.dumps(latest_index)
    
    
if __name__ == "__main__": 
    app.run(port=9000)