# -*- coding: utf-8 -*-
"""
Created on Thu Feb  2 20:43:09 2023

@author: Rect
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

import re
import nltk
from nltk.util import pr
stemmer = nltk.SnowballStemmer('english')
from nltk.corpus import stopwords
import string
stopword = set(stopwords.words('english'))


import pandas as pd
import numpy as np
import re
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, ConfusionMatrixDisplay



df = pd.read_csv('hate_speech.csv')


df['label'] = df['label'].map({1:"Hate Speech Detected",0:"No hate or offensive speech detected"})
df = df[['tweet','label']]
"""
def clean(text):
    text = str(text).lower()
    text = re.sub('\[.*?\]','',text)
    text = re.sub('https?://\S+|www\.\S+','',text)
    text = re.sub('<.*?>+','',text)
    text = re.sub('[%s]' % re.escape(string.punctuation),'',text)
    text = re.sub('\n','',text)
    text = re.sub('\w*d\w*','',text)
    text = [word for word in text.split(' ') if word not in stopword]
    text = " ".join(text)
    text=[stemmer.stem(word) for word in text.split(' ')]
    text=" ".join(text) 
    return text
"""
#creating a function to process the data
def data_processing(tweet):
    tweet = tweet.lower()
    tweet = re.sub(r"https\S+|www\S+http\S+", '', tweet, flags = re.MULTILINE)
    tweet = re.sub(r'\@w+|\#','', tweet)
    tweet = re.sub(r'[^\w\s]','',tweet)
    tweet = re.sub(r'ð','',tweet)
    tweet_tokens = word_tokenize(tweet)
    filtered_tweets = [w for w in tweet_tokens if not w in stop_words]
    return " ".join(filtered_tweets)


df['tweet'] = df['tweet'].apply(data_processing)

#df['tweet'] = df['tweet'].apply(clean)
#df['labels'] = df['labels']. fillna(0)
#df=df.fillna('0')
#df=df.dropna()
x = np.array(df['tweet'])
y = np.array(df['label'])

cv = CountVectorizer()
x = cv.fit_transform(x)
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=42)
clf=DecisionTreeClassifier()
clf.fit(x_train,y_train)

clf_predict = clf.predict(x_test)
clf_acc = accuracy_score(clf_predict, y_test)
print("Test accuarcy: {:.2f}%".format(clf_acc*100))

#test_data = "you are funny"
#test_data = "you are awesome"
#test_data = "hello there"
test_data = "i will kill you"
df = cv.transform([test_data]).toarray()
print(clf.predict(df))