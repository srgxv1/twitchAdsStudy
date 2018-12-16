from pyspark import SparkConf, SparkContext, SQLContext, Row
from pyspark.sql.functions import col
import sys

conf = SparkConf().setMaster('local').setAppName('Twitch')
sc = SparkContext(conf = conf)
sqlContext = SQLContext(sc)

inputRDD = sc.textFile('15').map(lambda x: x.split('\t'))

ids = inputRDD.map(lambda p: Row(Game = p[3].lower(), CurrentViewer = p[1], Followers = float(p[7]), Partner = p[8], Language = p[9]))

df = ids.toDF()

df = df.filter(df['Language'] == "es").filter(df['Partner'] != "-1").filter(df['Game'] != "-1").filter(df['Followers'] >= 1000) 	

df.groupBy(col("Game")).agg({"CurrentViewer":"sum"}).orderBy("sum(CurrentViewer)", ascending=False).limit(10).coalesce(1).write.format("com.databricks.spark.csv").save('out15')