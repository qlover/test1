# -*- coding: utf-8 -*-
import scrapy
import re
import os
import json
import hashlib
from City58.items import City58Item

class CitySpider(scrapy.Spider):
	name = 'city' #*
	allowed_domains = ['bj.58.com'] #*
	
	# 设置下载延迟下载
	# 防止 ban 方法一
	download_delay = 3
	# 起始职业类型
	_start_num = 0


	# 正则匹配钩子
	_reHook = {
		# group(4)
		'pnLink' : r'(http|https)://(.+)/(pn(\d+?))/.*',
		# group(3)
		'subLink' : r'(http|https)://(.+)/(.+/).*',
	}

	# 根地址
	_rootURL = "http://bj.58.com/"

	_GlobalSeq = "-"
	_GlobalJobId = 1

	def __init__(self):
		# 确定职业类型
		self._jobTypeItems = self.getJobTypeItem(self._start_num)

		# 二级地址
		self._subURL = self._jobTypeItems[0]['subLink']	

		# 记录下一个地址
		self._next_url = self._rootURL + self._subURL

		self._prve_type = ''
		# * 起始地址
		self.start_urls = [ self._next_url ]  #*

	def parse(self, response):
		# print(">>[_jobTypeItems.length]", len(self._jobTypeItems))
		
		# 如果不是第一次则直接爬
		nodeLits = response.xpath("//ul[@id='list_con']/li")
		for node in nodeLits:
			try:
				item = City58Item()
				item['jobID'] = self._GlobalJobId
				item['jobType'] = self._jobTypeItems[0]['type']

				item['jobName'] = node.xpath("./div[1]/div[1]/a/span/text()").extract()
				item['jobName'] = self._GlobalSeq.join(item['jobName']).strip()
				link = node.xpath("./div[1]/div[1]/a/@href").extract()[0]
				item['jobzLink'] = self.getMd5ByURL(link.encode('utf-8'))
				item['jobCompany'] = node.xpath("./div[2]/div[@class='comp_name']/a/text()").extract()[0]
				item['jobSalary'] = node.xpath("./div[1]/p/text()").extract()[0]
				item['jobPubTime'] = (node.xpath("./a[@class='sign']/text()") 
					or node.xpath("./span[@class='sign']/text()")).extract()[0]

				jobRequire = node.xpath("./div[2]/p/span/text()").extract()
				item['jobCate'] = jobRequire[0]
				item['jobEdu'] 	= jobRequire[1]
				item['jobExp'] 	= jobRequire[2]

				self._GlobalJobId += 1
			except Exception as e:
				print('>> [解析错误]', e)
				continue
			
			yield item
		# {
		# 每一页数据结束
		# print(">>", self._next_url, "over!")
		# }
		
		# 整理出下一个爬虫的地址
		nextPn = self.getNextPnLink(response)
		# print(">> [nextPn]", nextPn)

		# 全部结束
		if nextPn == 'over':
			print(">> all over!")
			print(">> total ", self._GlobalJobId)
			return 
		# 如果 subLink 在该返回对象中
		# 则表示为下一个职业
		if 'subLink' in nextPn:
			# 更改当前的 _subURL
			self._subURL = nextPn['subLink']
			nextPn = ""

		self._next_url = self._rootURL + self._subURL + nextPn
		print(">>",self._next_url)
		yield scrapy.Request(self._next_url, callback = self.parse)



	# 获取下一页的 pnlink
	def getNextPnLink(self, response):
		if len(self._jobTypeItems):
			# 有下一页的情况
			if len(response.xpath("//a[@class='next']")):
				offset = response.xpath("//a[@class='next']/@href").get('data')
				# 对应网址的下一页 offset 取值
				offset = re.search(self._reHook['pnLink'], offset).group(3)
				return offset
			# 没有下一页的情况
			else:
				# 如果职业类型还有其它职业
				# 则更换爬虫 _subURL 地址
				if len(self._jobTypeItems):
					# 将该职业队列第一个去掉
					self._prve_type = self._jobTypeItems.pop(0)
					return self.getNext_SubURL()
		else:
			# 全部结束
			return 'over'

	def getNext_SubURL(self):
		return self._jobTypeItems[0]

	# 获取当前页面后面的所有职业类型
	# start 从第几个元素开始返回
	def getJobTypeItem(self, start=0):
		fItems = []
		with open('type.json', 'r') as f:
			fItems = json.load(f)['data']
		return fItems[start:]

	# 将数据 md5 加密
	def getMd5ByURL(self, data):
		m = hashlib.md5()
		m.update(data)
		return m.hexdigest()

	# 格式化 xpath 解析字符串
	# @parme str_ 格式化字符串
	# @parme format_obj 格式化对象
	# @*vartuple 格式化占位符
	def formatXpathString(self, str_, format_obj, *vartuple ):
		s = str_
		if vartuple:
			s = s % vartuple
		return s.format(**format_obj)