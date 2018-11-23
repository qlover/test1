# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json

class Bj58Pipeline(object):
	def __init__(self):
		self.fs = open('bj.json', 'w')
		self.fs.write('{"data":[')

	def process_item(self, item, spider):
		content = json.dumps(dict(item), ensure_ascii = False, cls=MyEncoder) + ",\n"
		self.fs.write(content)
		return item
		
	def close_spider(self, spider):
		self.fs.write('],"status":"200"}')
		self.fs.close()

class MyEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, bytes):
			return str(obj, encoding='utf-8')
		return json.JSONEncoder.default(self, obj)
