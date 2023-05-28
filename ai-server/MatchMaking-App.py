# Library Imports
from joblib import load
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import MinMaxScaler
import _pickle as pickle
from hate_speech import detect_hate_speech
from refined_files import init_files
from cluster import run_clusters
from flask import Flask, request
import json 

"""
def create_refined_profiles(data):
    
    df = pd.DataFrame(data['passionsWithAge'])
    with open("refined_profiles.pkl",'wb') as fp:
        pickle.dump(df, fp)
    
    init_files()
"""

def load_data():
    # Loading the Profiles
    with open("refined_profiles.pkl",'rb') as fp:
        df = pickle.load(fp)
        
    with open("refined_cluster.pkl", 'rb') as fp:
        cluster_df = pickle.load(fp)
        
    with open("vectorized_refined.pkl", 'rb') as fp:
        vect_df = pickle.load(fp)

    
    # Loading the Classification Model
    model = load("refined_model.joblib")
    
    return df, cluster_df, vect_df,model


## Helper Functions

def string_convert(x):
    """
    First converts the lists in the DF into strings
    """
    if isinstance(x, list):
        return ' '.join(x)
    else:
        return x
 
    
def vectorization(df, columns, input_df):
    """
    Using recursion, iterate through the df until all the categories have been vectorized
    """

    column_name = columns[0]
        
    # Checking if the column name has been removed already
    if column_name not in ['Bios', 'Movies','Religion', 'Music', 'Politics', 'Social_Media', 'Sports']:
                
        return df, input_df
    
    # Encoding columns with respective values
    if column_name in ['Religion', 'Politics']:
        
        # Getting labels for the original df
        df[column_name]=df[column_name].astype('category')
        df[column_name.lower()] = df[column_name].cat.codes
        
        # Dictionary for the codes
        d = dict(enumerate(df[column_name].cat.categories))
        
        d = {v: k for k, v in d.items()}
                
        # Getting labels for the input_df
        input_df[column_name.lower()] = d[input_df[column_name].iloc[0]]
                
        # Dropping the column names
        input_df = input_df.drop(column_name, 1)
        
        df = df.drop(column_name, 1)
        
        return vectorization(df, df.columns, input_df)
    
    # Vectorizing the other columns
    else:
        # Instantiating the Vectorizer
        vectorizer = CountVectorizer()
        
        # Fitting the vectorizer to the columns
        x = vectorizer.fit_transform(df[column_name].values.astype('U'))
        
        y = vectorizer.transform(input_df[column_name].values.astype('U'))

        # Creating a new DF that contains the vectorized words
        df_wrds = pd.DataFrame(x.toarray(), columns=vectorizer.get_feature_names())
        
        y_wrds = pd.DataFrame(y.toarray(), columns=vectorizer.get_feature_names(), index=input_df.index)

        # Concating the words DF with the original DF
        new_df = pd.concat([df, df_wrds], axis=1)
        
        y_df = pd.concat([input_df, y_wrds], 1)

        # Dropping the column because it is no longer needed in place of vectorization
        new_df = new_df.drop(column_name, axis=1)
        
        y_df = y_df.drop(column_name, 1)
        
        return vectorization(new_df, new_df.columns, y_df) 

    
def scaling(df, input_df):
    """
    Scales the new data with the scaler fitted from the previous data
    """
    scaler = MinMaxScaler()
    
    scaler.fit(df)
    
    input_vect = pd.DataFrame(scaler.transform(input_df), index=input_df.index, columns=input_df.columns)
        
    return input_vect
    


def top_ten(cluster, vect_df, input_vect,df):
    """
    Returns the DataFrame containing the top 10 similar profiles to the new data
    """
    # Filtering out the clustered DF
    des_cluster = vect_df[vect_df['Cluster #']==cluster[0]].drop('Cluster #', 1)
    
    # Appending the new profile data
    des_cluster = des_cluster.append(input_vect, sort=False)
        
    # Finding the Top 10 similar or correlated users to the new user
    user_n = input_vect.index[0]
    
    # Trasnposing the DF so that we are correlating with the index(users) and finding the correlation
    corr = des_cluster.T.corrwith(des_cluster.loc[user_n])

    # Creating a DF with the Top 50 most similar profiles
    top_10_sim = corr.sort_values(ascending=False)[1:51]
        
    # The Top Profiles
    top_10 = df.loc[top_10_sim.index]
        
    # Converting the floats to ints
    top_10[top_10.columns[1:]] = top_10[top_10.columns[1:]]
    
    return top_10.astype('object')


def json_convert(d_frame):
    df_json =  d_frame.reset_index().to_json(orient = 'records')
    return df_json



def generate_suggestions(newUser,isSaved):
    
    df,cluster_df,vect_df,model = load_data()
    df_temp=df.copy()
    # Instantiating a new DF row to classify later
    new_profile = pd.DataFrame(columns=df.columns, index=[df.index[-1]+1])
    new_profile['Bios']=newUser['Bios']
    new_profile['Religion']=newUser['Religion']
    new_profile['Politics']=newUser['Politics']
    new_profile.at[new_profile.index[0],'Movies']=newUser['Movies']
    new_profile.at[new_profile.index[0],'Music']=newUser['Music']
    new_profile.at[new_profile.index[0],'Social_Media']=newUser['Social_Media']
    new_profile.at[new_profile.index[0],'Sports']=newUser['Sports']
    new_profile['Age']=newUser['Age']
    new_profile_temp=new_profile.copy()
   
    # Looping through the columns and applying the string_convert() function (for vectorization purposes)
    for col in df.columns:
        df[col] = df[col].apply(string_convert)
        new_profile[col] = new_profile[col].apply(string_convert)
    
   
    # Vectorizing the New Data
    df_v, input_df = vectorization(df, df.columns, new_profile)
  
    # Scaling the New Data
    new_df = scaling(df_v, input_df)
    
    
    
    # Predicting/Classifying the new data
    #print(new_df)
    cluster = model.predict(new_df)
    # Finding the top 10 related profiles
    top_10_df = top_ten(cluster, vect_df, new_df,df)
    
    if isSaved==False:
        #vetorized_refined.pkl
      
        new_profiles=pd.concat([df_temp,new_profile_temp])

        with open("./refined_profiles.pkl", "wb") as fp:
            pickle.dump(new_profiles, fp)
        
        init_files()
 
     
    return json_convert(top_10_df)
    #return top_10_df
    
"""
newUser = {'Bios':'Pop culture junkie. Tv buff. Reader. Friendly travel expert. Incurable twitteraholic. Social media ninja. Coffee enthusiast. Internet specialist.',
           'Religion':'Christian','Movies':['Action', 'Comedy', 'Documentary'],'Music':['Pop', 'Rock'],'Politics':'Conservative',
           'Social Media':['Facebook', 'Reddit', 'Youtube'],'Sports':['Basketball', 'Soccer', 'Hockey'],'Age':'20'}
"""




"""
df_json =  top_10_df.to_json(orient = 'records')

print(df_json)
with open("suggestions.json", "w") as outfile:
    outfile.write(df_json)
    """



# Setup flask server
app = Flask(__name__) 

"""
@app.route('/api/v1/users/init-generate-suggestions', methods = ['POST']) 
def init_suggestions_handler():
    try:
        data = request.get_json()
        create_refined_profiles(data)
        return json.dumps({"code":200,"status":"success","message":"user profiles clustered successfully"})
    except:
        return json.dumps({"code":500,"status":"error","message":"something went wrong"})   
"""

@app.route('/api/v1/users/generate-suggestions', methods = ['POST']) 
def suggestions_handler(): 
    data = request.get_json()
    isSaved = data.pop('isClustered', 'No Key found')
    # Data variable contains the 
    # data from the node server
  
    """ls = data['array'] 
    result = sum(ls) # calculate the sum
    """
    res = generate_suggestions(data, isSaved)
    # Return data in json format 
    return res


@app.route('/api/v1/users/get-lastest-index',methods=['GET'])
def index_handler():
    with open("refined_profiles.pkl",'rb') as fp:
        df = pickle.load(fp)
    latest_index=len(df.index)
    return json.dumps(latest_index)
    
@app.route('/api/v1/users/detect-hate-speech',methods=['POST'])
def hate_speech_handler():
    data = request.get_json()
    validated_data = detect_hate_speech(data)
    return json.dumps(validated_data)

@app.route('/api/v1/users/cluster',methods=['GET'])
def cluster_handler():
    try:
        run_clusters() 
        return json.dumps({"code":200,"status":"success","message":"user profiles clustered successfully"})
    except:
        return json.dumps({"code":500,"status":"error","message":"something went wrong"})
        
if __name__ == "__main__": 
    app.run(port=9000)
    

"""   

###TEMP

df_names = pd.read_csv('random_names_fossbytes.csv')


# saving the dataframe
#df_names.to_csv('names.csv')
# Convert Pandas DataFrame To JSON Using orient = 'records' 
df_json = df_names.to_json(orient = 'records')
print(df_json)
with open("names.json", "w") as outfile:
    outfile.write(df_json)


df_json = df.to_json(orient = 'records')
print(df_json)

# Writing to users.json
with open("users.json", "w") as outfile:
    outfile.write(df_json) """






















