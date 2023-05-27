# -*- coding: utf-8 -*-
"""
Created on Sat May 27 09:20:43 2023

@author: Rect
"""


def init_files():
        
    import pandas as pd
    pd.set_option('display.max_colwidth', 500)
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns
    import _pickle as pickle
    from sklearn.feature_extraction.text import CountVectorizer
    from sklearn.cluster import AgglomerativeClustering, KMeans
    from sklearn.metrics import calinski_harabasz_score, silhouette_score, davies_bouldin_score
    from sklearn.preprocessing import MinMaxScaler
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import classification_report
    from tqdm import tqdm_notebook as tqdm
    
    
    with open("refined_profiles.pkl",'rb') as fp:
       df = pickle.load(fp)
   
    def string_convert(x):
        """
        First converts the lists in the DF into strings
        """
        if isinstance(x, list):
            return ' '.join(x)
        else:
            return x
        
    # Looping through the columns and applying the function
    for col in df.columns:
        df[col] = df[col].apply(string_convert)
        
    
    def vectorization(df, columns):
        """
        Using recursion, iterate through the df until all the categories have been vectorized
        """
        column_name = columns[0]
        
        # Checking if the column name has been removed already
        if column_name not in ['Bios', 'Movies','Religion', 'Music', 'Politics', 'Social_Media', 'Sports']:
            return df
        
        if column_name in ['Religion', 'Politics']:
            df[column_name]=df[column_name].astype('category')
            df[column_name.lower()] = df[column_name].cat.codes
            
            df = df.drop(column_name, 1)
            
            return vectorization(df, df.columns)
        
        else:
            # Instantiating the Vectorizer
            vectorizer = CountVectorizer()
            
            # Fitting the vectorizer to the Bios
            x = vectorizer.fit_transform(df[column_name])
    
            # Creating a new DF that contains the vectorized words
            df_wrds = pd.DataFrame(x.toarray(), columns=vectorizer.get_feature_names())
    
            # Concating the words DF with the original DF
            new_df = pd.concat([df, df_wrds], axis=1)
    
            # Dropping the column because it is no longer needed in place of vectorization
            new_df = new_df.drop(column_name, axis=1)
            
            return vectorization(new_df, new_df.columns) 
    
    # Creating the vectorized DF
    vect_df = vectorization(df, df.columns)
    
    
    
    # Scaling
    scaler = MinMaxScaler()
    
    vect_df = pd.DataFrame(scaler.fit_transform(vect_df), index=vect_df.index, columns=vect_df.columns)
    
    
    
    from sklearn.decomposition import PCA
    
    # Instantiating PCA
    pca = PCA()
    
    # Fitting and Transforming the DF
    df_pca = pca.fit_transform(vect_df)
    
    # Finding the exact number of features that explain at least 99% of the variance in the dataset
    total_explained_variance = pca.explained_variance_ratio_.cumsum()
    n_over_9 = len(total_explained_variance[total_explained_variance>=.99])
    n_to_reach_9 = vect_df.shape[1] - n_over_9
    
    print("PCA reduces the # of features from", vect_df.shape[1], 'to', n_to_reach_9)
    
    # Reducing the dataset to the number of features determined before
    pca = PCA(n_components=n_to_reach_9)
    
    # Fitting and transforming the dataset to the stated number of features
    df_pca = pca.fit_transform(vect_df)
    
    # Seeing the variance ratio that still remains after the dataset has been reduced
    pca.explained_variance_ratio_.cumsum()[-1]
    
    
    
    # Setting the amount of clusters to test out
    cluster_cnt = [i for i in range(2, 11, 1)]
    
    # Establishing empty lists to store the scores for the evaluation metrics
    ch_scores = []
    
    s_scores = []
    
    db_scores = []
    
    # The DF for evaluation
    eval_df = df_pca
    
    # Looping through different iterations for the number of clusters
    for i in tqdm(cluster_cnt):
        
        # Clustering with different number of clusters
        clust = AgglomerativeClustering(n_clusters=i, linkage='complete')
        
        clust.fit(eval_df)
        
        cluster_assignments = clust.labels_
        
        # Appending the scores to the empty lists
        ch_scores.append(calinski_harabasz_score(eval_df, cluster_assignments))
        
        s_scores.append(silhouette_score(eval_df, cluster_assignments))
        
        db_scores.append(davies_bouldin_score(eval_df, cluster_assignments))
    
    def cluster_eval(y, x):
        """
        Prints the scores of a set evaluation metric. Prints out the max and min values of the evaluation scores.
        """
        
        # Creating a DataFrame for returning the max and min scores for each cluster
        df = pd.DataFrame(columns=['Cluster Score'], index=[i for i in range(2, len(y)+2)])
        df['Cluster Score'] = y
        
        print('Max Value:\nCluster #', df[df['Cluster Score']==df['Cluster Score'].max()])
        print('\nMin Value:\nCluster #', df[df['Cluster Score']==df['Cluster Score'].min()])
        
        # Plotting out the scores based on cluster count
        plt.figure(figsize=(16,6))
        plt.style.use('bmh')
        plt.plot(x,y)
        plt.xlabel('# of Clusters')
        plt.ylabel('Score')
        plt.show()
    
    print("The Calinski-Harabasz Score (find max score):")
    cluster_eval(ch_scores, cluster_cnt)
    
    print("\nThe Silhouette Coefficient Score (find max score):")
    cluster_eval(s_scores, cluster_cnt)
    
    print("\nThe Davies-Bouldin Score (find minimum score):")
    cluster_eval(db_scores, cluster_cnt)
    
    
    # Instantiating HAC based on the optimum number of clusters found
    hac = AgglomerativeClustering(n_clusters=3, linkage='complete')
    
    # Fitting
    hac.fit(df_pca)
    
    # Getting cluster assignments
    cluster_assignments = hac.labels_
    
    # Assigning the clusters to each profile
    df['Cluster #'] = cluster_assignments
    
    vect_df['Cluster #'] = cluster_assignments
    
    
    with open("refined_cluster.pkl",'wb') as fp:
        pickle.dump(df, fp)
        
    with open("vectorized_refined.pkl", 'wb') as fp:
        pickle.dump(vect_df, fp)
    
    
    # Importing 3 models
    from sklearn.dummy import DummyClassifier
    from sklearn.neighbors import KNeighborsClassifier
    from sklearn.svm import SVC
    from sklearn.naive_bayes import ComplementNB
    from sklearn.linear_model import LogisticRegression
    from sklearn.ensemble import AdaBoostClassifier
    
    # Assigning the split variables
    X = vect_df.drop(["Cluster #"], 1)
    y = vect_df['Cluster #']
    
   
    from sklearn.naive_bayes import ComplementNB
    with open("vectorized_refined.pkl", 'rb') as fp:
          
        new_vect_df = pickle.load(fp)
        # Assigning the split variables
    X = new_vect_df.drop(["Cluster #"], 1)
    y = new_vect_df['Cluster #']
    
   
        
    nb = ComplementNB()
    nb.fit(X, y)
    from joblib import dump

    dump(nb, "refined_model.joblib")
  
