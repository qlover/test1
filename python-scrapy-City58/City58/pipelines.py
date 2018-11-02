# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.1y.org/en/latest/topics/item-pipeline.html

import json
import hashlib
import pymysql
from twisted.enterprise import adbapi
from twisted.internet import reactor

# 异步插入到数据库
class City58Pipeline(object):

	sql = '''INSERT INTO city58 (job_id, job_type, job_name, job_zlink, job_salary, job_cate, job_exp, job_company, job_pubtime, job_edu)
	VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''

	def __init__(self, dbpool):
		self.dbpool = dbpool
		
		self.fs = open('city.json', 'w')
		self.fs.write('{"data":[')

	@classmethod
	def from_settings(cls, settings):
		args = dict(
			host=settings['MYSQL_HOST'],
			db=settings['MYSQL_DBNAME'],
			user=settings['MYSQL_USER'],
			passwd=settings['MYSQL_PASSWORD'],
			charset=settings['MYSQL_CHARSET'],
			cursorclass=pymysql.cursors.DictCursor,
		)
		# 参数1：用于连接MySQL数据库的驱动
		# 参数2：数据库的链接信息（host, port, user等）
		dbpool = adbapi.ConnectionPool("pymysql", **args)

		return cls(dbpool)

	def process_item(self, item, spider):
		content = json.dumps(dict(item), ensure_ascii = False, cls=MyEncoder) + ",\n"
		self.fs.write(content)

		query = self.dbpool.runInteraction(self.insert, item)
		query.addErrback(self.handler_error)

	def handler_error(self, failure):
		print('>> [handler_error]',failure)



	def insert(self, cursor, item):
		try:
			cursor.execute(self.sql, (item['jobID'],item['jobType'],item['jobName'],item['jobzLink'],item['jobSalary'],item['jobCate'],item['jobExp'],item['jobCompany'],item['jobPubTime'],item['jobEdu']))
			# print(">> data insert succeflly")
		except Exception as e:
			print('>> [mysql error]', e)


	def close_spider(self, spider):
		self.fs.write('],"status":"200"}')
		self.fs.close()

#       
# 存入 Json
# class City58Pipeline(object):
#   def __init__(self):
#       self.fs = open('city.json', 'w')
#       self.fs.write('{"data":[')

#   def process_item(self, item, spider):
#       print(item)
#       # 存入 json
#       content = json.dumps(dict(item), ensure_ascii = False, cls=MyEncoder) + ",\n"
#       self.fs.write(content)
#       # 将字典变成元组数据
#       return item
		
#   def close_spider(self, spider):
#       self.fs.write('],"status":"200"}')
#       self.fs.close()

#   # 将数据加密成 md5
#   def md5(data):
#       m = hashlib.md5()
#       m.update(data)
#       return m.hexdigest()


class MyEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, bytes):
			return str(obj, encoding='utf-8')
		return json.JSONEncoder.default(self, obj)