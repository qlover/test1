# -*- coding: utf-8 -*-
import scrapy


class GetreqipSpider(scrapy.Spider):
	name = 'getReqIp'

	allowed_domains = ['']
	start_urls = ['http://ip.filefab.com/index.php']


	def parse(self, response):
		fs.open('test.html', 'w', encoding='utf-8')
		fs.write(response.text)
		fs.close()
		ip_text = response.xpath("//div[@class='notediv']/h1/span/text()")
		print('Your ip is: ', ip_text)

