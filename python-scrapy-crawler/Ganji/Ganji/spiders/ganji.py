# -*- coding: utf-8 -*-
import scrapy
import re
from Ganji.items import GanjiItem

class GanjiSpider(scrapy.Spider):
	# *爬虫名
	name = 'ganji'
	# *
	allowed_domains = ['ganji.com']

	# 根 url
	rootURL = 'http://www.ganji.com'
	# 子 url 
	subRootURL = '/zpbiaoqian/p6o'
	# 页面偏移数
	pageOffset = 1
	# 全局id
	globalJobID = 1
	# 地点连接符
	seq = '-'
	# *
	start_urls = ['http://www.ganji.com'+ subRootURL + str(pageOffset) ]


	def parse(self, response):
		nodeLists = response.xpath("//dl[@class='con-list-zcon new-dl']")
		for node in nodeLists:
			item = GanjiItem()
			# 提取各各内容
			
			item['jobID'] = str(self.globalJobID)
			item['jobName'] = node.xpath('./dt/a/text()').extract()[0].encode('utf-8')
			links = node.xpath('./dt/a/@href').extract()[0]
			# 匹配成功
			if re.search(r'(htm|html)$',links):
				item['jobLink'] = (self.rootURL + links).encode('utf-8')
			# 匹配失败
			else:
				item['jobLink'] = links.encode('utf-8')

			# 拼接地点
			# 取出所有的地点列表
			adds = node.xpath("./dd[@class='pay']/a/text()").extract()
			# 然后直接用 join 用连接符连接
			item['jobLocation'] = self.seq.join(adds)

			item['jobSalary'] = node.xpath("./dd[@class='company']/div[1]/text()").extract()[0].encode('utf-8')
			item['jobCompany'] = node.xpath('./dt/div[2]/a/text()').extract()[0].encode('utf-8')
			item['jobPublishTime'] = node.xpath("./dd[@class='pub-time']/span/text()").extract()[0].encode('utf-8')

			self.globalJobID += 1
			yield item


		# 下一页
	
		# 按钮判断
		if(len(response.xpath("//a[@class='next'][1]"))):
			# get('data') 类似 extract() 
			url = response.xpath("//a[@class='next'][1]/@href").get('data')
			
			# 提取出下一页中的 offset 
			# pageOffset = url[-5:-1]
			self.pageOffset = re.search(r'(\d).(\d+)',url).group(2)
			# 拼接 scrapy.Request 的参数一
			srURL = self.rootURL + self.subRootURL + self.pageOffset

			print('>>', srURL)
			yield scrapy.Request(srURL, callback = self.parse)
		else:
			print('>> all over, last page!!!')
