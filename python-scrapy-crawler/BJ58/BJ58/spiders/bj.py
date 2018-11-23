# -*- coding: utf-8 -*-
import scrapy

from BJ58.items import Bj58Item

class BjSpider(scrapy.Spider):
	name = 'bj'
	allowed_domains = ['bj.58.com']

	rootURL = 'http://bj.58.com'
	# 对应的各类职位的类型子地址
	subURL = '/job/pn'
	offset = 1
	GlobalJobId = 1
	globalSeq = '-'

	start_urls = [ rootURL + subURL + str(offset) ]

	def parse(self, response):
		nodeLits = response.xpath("//ul[@id='list_con']/li")
		for node in nodeLits:
			item = Bj58Item()
			item['jobID'] = self.GlobalJobId
			item['jobName'] = node.xpath("./div[1]/div[1]/a/span/text()").extract()
			item['jobName'] = self.globalSeq.join(item['jobName']).strip()
			item['jobzLink'] = node.xpath("./div[1]/div[1]/a/@href").extract()[0]
			item['jobCompany'] = node.xpath("./div[2]/div[@class='comp_name']/a/text()").extract()[0]
			item['jobSalary'] = node.xpath("./div[1]/p/text()").extract()[0]
			item['jobPubTime'] = (node.xpath("./a[@class='sign']/text()") 
				or node.xpath("./span[@class='sign']/text()")).extract()[0]


			jobRequire = node.xpath("./div[2]/p/span/text()").extract()
			item['jobCate'] = jobRequire[0]
			item['jobEdu'] 	= jobRequire[1]
			item['jobExp'] 	= jobRequire[2]


			self.GlobalJobId += 1
			yield item

		# 下一页
		if len(response.xpath("//a[@class='next']")):
			offset = response.xpath("//a[@class='next']/@href").get('data')
			# 对应网址的下一页 offset 取值
			self.offset = offset[:-1][23:]
			srURL = self.rootURL + self.subURL + self.offset
			print(">>", srURL)

			yield scrapy.Request(srURL, callback = self.parse)
		else:
			print(">> Total %s datas" % self.GlobalJobId)
			print(">> Last page, all the over!!")
