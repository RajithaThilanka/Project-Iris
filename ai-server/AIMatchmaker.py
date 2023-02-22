# -*- coding: utf-8 -*-
"""
Created on Thu Feb  2 00:40:48 2023

@author: Rect
"""

# Library Imports
from joblib import load
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import MinMaxScaler
import _pickle as pickle

class AIMatchmaker:
    def __init__(self):
        
        with open("refined_profiles.pkl",'rb') as fp:
            self.df = pickle.load(fp)
            
        with open("refined_cluster.pkl", 'rb') as fp:
            self.cluster_df = pickle.load(fp)
            
        with open("vectorized_refined.pkl", 'rb') as fp:
            self.vect_df = pickle.load(fp)

        # Loading the Classification Model
        self.model = load("refined_model.joblib")
    
    def string_convert(x):
        """
        First converts the lists in the DF into strings
        """
        if isinstance(x, list):
            return ' '.join(x)
        else:
            return x
    def vectorization(self,input_df):
        
        
        """
        Using recursion, iterate through the df until all the categories have been vectorized
        """
        column_name = self.df.columns[0]
            
        # Checking if the column name has been removed already
        if column_name not in ['Bios', 'Movies','Religion', 'Music', 'Politics', 'Social Media', 'Sports']:
                    
            return self.df, input_df
        
        # Encoding columns with respective values
        if column_name in ['Religion', 'Politics']:
            
            # Getting labels for the original df
            self.df[column_name]=self.df[column_name].astype('category')
            self.df[column_name.lower()] = self.df[column_name].cat.codes
            
            # Dictionary for the codes
            d = dict(enumerate(self.df[column_name].cat.categories))
            
            d = {v: k for k, v in d.items()}
                    
            # Getting labels for the input_df
            input_df[column_name.lower()] = d[input_df[column_name].iloc[0]]
                    
            # Dropping the column names
            input_df = input_df.drop(column_name, 1)
            
            self.df = self.df.drop(column_name, 1)
            
            return self.vectorization(self.df, self.df.columns, input_df)
        
        # Vectorizing the other columns
        else:
            # Instantiating the Vectorizer
            vectorizer = CountVectorizer()
            
            # Fitting the vectorizer to the columns
            x = vectorizer.fit_transform(self.df[column_name].values.astype('U'))
            
            y = vectorizer.transform(input_df[column_name].values.astype('U'))

            # Creating a new DF that contains the vectorized words
            df_wrds = pd.DataFrame(x.toarray(), columns=vectorizer.get_feature_names())
            
            y_wrds = pd.DataFrame(y.toarray(), columns=vectorizer.get_feature_names(), index=input_df.index)

            # Concating the words DF with the original DF
            new_df = pd.concat([self.df, df_wrds], axis=1)
            
            y_df = pd.concat([input_df, y_wrds], 1)

            # Dropping the column because it is no longer needed in place of vectorization
            new_df = new_df.drop(column_name, axis=1)
            
            y_df = y_df.drop(column_name, 1)
            
            return self.vectorization(new_df, new_df.columns, y_df)
    
    def scaling(self,input_df):
        """
        Scales the new data with the scaler fitted from the previous data
        """
        scaler = MinMaxScaler()
        
        scaler.fit(self.df)
        
        input_vect = pd.DataFrame(scaler.transform(input_df), index=input_df.index, columns=input_df.columns)
            
        return input_vect
        


    def top_ten(self,cluster, input_vect):
        """
        Returns the DataFrame containing the top 10 similar profiles to the new data
        """
        # Filtering out the clustered DF
        des_cluster = self.vect_df[self.vect_df['Cluster #']==cluster[0]].drop('Cluster #', 1)
        
        # Appending the new profile data
        des_cluster = des_cluster.append(input_vect, sort=False)
            
        # Finding the Top 10 similar or correlated users to the new user
        user_n = input_vect.index[0]
        
        # Trasnposing the DF so that we are correlating with the index(users) and finding the correlation
        corr = des_cluster.T.corrwith(des_cluster.loc[user_n])

        # Creating a DF with the Top 10 most similar profiles
        top_10_sim = corr.sort_values(ascending=False)[1:11]
            
        # The Top Profiles
        top_10 = self.df.loc[top_10_sim.index]
            
        # Converting the floats to ints
        top_10[top_10.columns[1:]] = top_10[top_10.columns[1:]]
        
        return top_10.astype('object')


    def json_convert(d_frame):
        df_json =  d_frame.reset_index().to_json(orient = 'records')
        return df_json
    
    def generate_suggestions(self,newUser,isSaved):
        
        df_temp=self.df.copy()
        # Instantiating a new DF row to classify later
        new_profile = pd.DataFrame(columns=self.df.columns, index=[self.df.index[-1]+1])
        new_profile['Bios']=newUser['Bios']
        new_profile['Religion']=newUser['Religion']
        new_profile['Politics']=newUser['Politics']
        new_profile.at[new_profile.index[0],'Movies']=newUser['Movies']
        new_profile.at[new_profile.index[0],'Music']=newUser['Music']
        new_profile.at[new_profile.index[0],'Social Media']=newUser['Social_Media']
        new_profile.at[new_profile.index[0],'Sports']=newUser['Sports']
        new_profile['Age']=newUser['Age']
        new_profile_temp=new_profile.copy()
        # Looping through the columns and applying the string_convert() function (for vectorization purposes)
        for col in self.df.columns:
            self.df[col] = self.df[col].apply(self.string_convert)
            new_profile[col] = new_profile[col].apply(self.string_convert)
            
        # Vectorizing the New Data
        df_v, input_df = self.vectorization(self.df, self.df.columns, new_profile)
                
        # Scaling the New Data
        new_df = self.scaling(df_v, input_df)
                
        # Predicting/Classifying the new data
        cluster = self.model.predict(new_df)

        # Finding the top 10 related profiles
        top_10_df = self.top_ten(cluster, self.vect_df, new_df,self.df)
        
        if(isSaved==False):
            
            #vetorized_refined.pkl

            new_cluster_df = pd.DataFrame(cluster,columns=['Cluster #'])
            new_cluster_df.index=new_df.index
            new_vectorized = pd.concat([self.vect_df,pd.concat([new_df, new_cluster_df],axis=1)])
            
            with open("./vectorized_refined.pkl", "wb") as fp:
                pickle.dump(new_vectorized, fp)


            #clustered_profiles.pkl

            new_clusters=pd.concat([self.cluster_df,pd.concat([new_profile,new_cluster_df],axis=1)])

            with open("./refined_cluster.pkl", "wb") as fp:
                pickle.dump(new_clusters, fp)


            #profiles_refined

            new_profiles=pd.concat([df_temp,new_profile_temp])

            with open("./refined_profiles.pkl", "wb") as fp:
                pickle.dump(new_profiles, fp)
                
        return self.json_convert(top_10_df)
        #return top_10_df
    
        