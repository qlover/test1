# -*- coding: utf-8 -*-
import scrapy
# 将 tencent 中的 item 导入
from Tencent.items import TencentItem

class TencentSpider(scrapy.Spider):
	name = 'tencent'
	allowed_domains = ['tencent.com']
	# start_urls = ['http://tencent.com/']

	# 根地址
	rootURL = "https://hr.tencent.com/"
	# 基本的初始页面地址
	baseURL = rootURL + "position.php?&start="
	# 每页偏移量
	offset = 0
	start_urls = [ baseURL + str(offset) ]


	def parse(self, response):
		node_list = response.xpath("//tr[@class='even'] | //tr[@class='odd']")
		for node in node_list:
			item = TencentItem()
			# 将提取出来的 Unicode 编码转换成 uft-8
			item['positionName'] = node.xpath("./td[1]/a/text()").extract()[0].encode("utf-8")
			item['positionLink'] = node.xpath("./td[1]/a/@href").extract()[0].encode("utf-8")
			
			if len(node.xpath("./td[2]/text()")):
				item['positionType'] = node.xpath("./td[2]/text()").extract()[0].encode("utf-8")
			else:
				item['positionType'] = ""

			item['peopleNumber'] = node.xpath("./td[3]/text()").extract()[0].encode("utf-8")
			item['workLocation'] = node.xpath("./td[4]/text()").extract()[0].encode("utf-8")
			item['publishTime'] = node.xpath("./td[5]/text()").extract()[0].encode("utf-8")

			# 返回给管道
			yield item

		# 固定写总长度返回下一个请求
		# if self.offset < 2190:
		# 	self.offset += 10
		# 	url = self.baseURL + str(self.offset)
		# 	# 构建请求，利用 yield 发送请求
		# 	yield scrapy.Request(url, callback = self.parse)
			
		# 点击下一页按钮来返回下一个请求
		if len(response.xpath("//a[@class='noactive' and @id='next']")) == 0:
			url = response.xpath("//a[@id='next']/@href").extract()[0]
			yield scrapy.Request(self.rootURL + url, callback = self.parse)