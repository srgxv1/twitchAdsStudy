from pyspark import SparkConf, SparkContext, SQLContext, Row
from pyspark.sql.functions import col
import sys

conf = SparkConf().setMaster('local').setAppName('Twitch')
sc = SparkContext(conf = conf)
sqlContext = SQLContext(sc)

inputRDD = sc.textFile('FullDay18').map(lambda x: x.split(','))

ids = inputRDD.map(lambda p: Row(Game = p[0].lower(), AllViewers = p[1]))

df = ids.toDF()

df.groupBy(col("Game")).agg({"AllViewers":"sum"}).orderBy("sum(AllViewers)", ascending=False).limit(10).coalesce(1).write.format("com.databricks.spark.csv").save('Day18')