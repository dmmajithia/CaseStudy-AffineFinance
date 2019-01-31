## This Python script will be used to populate the MongoDB using the given dataset.
## the format of inserted data is - 
## Collection name is "physicians"
## Document format is {name, address} (both are strings)

from pymongo import MongoClient
import csv

client = MongoClient("mongodb://dhawal:vd1vd2vd3@localhost:27017")
db = client['case_study']
physicians = db.physicians

with open('data.csv') as data_file:
	print("hi")
	csv_reader = csv.reader(data_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		##print("hello")
		if line_count != 0:
			print("hello")
			firstN = row[2]
			middleN = ' ' if row[3] == '' else ' ' + row[3] + ' '
			lastN = row[4]
			name = firstN + middleN + lastN
			name = name.upper()
			address = row[6] + (' ' if row[7] == '' else ' ' + row[7] + ' ') + row[8] + ' ' + row[9] + ' ' + row[10] + ' ' + row[11]
			article = {"name" : name, "address" : address}
			print(physicians.insert_one(article))
		line_count += 1