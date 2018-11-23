# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json

class TencentPipeline(object):
	def __init__(self):
		self.f = open('tencent.json', 'w')

	def process_item(self, item, spider):
		content = json.dumps(dict(item), ensure_ascii = False, cls=MyEncoder) + ",\n"
		self.f.write(content)
		return item

	def close_spider(self, spider):
		self.f.close()

	# 在 setting.py 中启用该管道


# 自定义一个编码类，主要用于解决当 json.dumps() 中出现了 btyes 类型时
class MyEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, bytes):
			return str(obj, encoding='utf-8')
		return json.JSONEncoder.default(self, obj)

