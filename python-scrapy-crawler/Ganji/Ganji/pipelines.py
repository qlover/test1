# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json

class GanjiPipeline(object):
	def __init__(self):
		self.f = open('ganji.json', 'w')
		self.f.write('{"data":[')

	def process_item(self, item, spider):
		content = json.dumps(dict(item), ensure_ascii = False, cls=MyEncoder) + ",\n"
		self.f.write(content)
		return item

	def close_spider(self, spider):
		self.f.write('], "status":"200"}')
		self.f.close() 

# 自定义一个编码类，主要用于解决当 json.dumps() 中出现了 btyes 类型时
# 1. 如果爬虫文件的数据被 encode() 统一了编码，则需要该类
# 2. 如果爬虫文件的数据没有被 encode() 统一编码，则不需要该类
# 因为 json.dumps() 中如果出现了被编码了的数据，则需要参数三 cls, 用于指定编码类
class MyEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, bytes):
			return str(obj, encoding='utf-8')
		return json.JSONEncoder.default(self, obj)



