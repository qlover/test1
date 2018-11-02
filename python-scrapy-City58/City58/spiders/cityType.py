import scrapy
import re
import json

from City58.TypeItem import FilterItems

# 该爬虫主要得到所有的职业类型
class CitytypeSpider(scrapy.Spider):
	name = 'cityType'
	allowed_domains = ['bj.58.com']
	start_urls = []


	# 正则匹配钩子
	reHook = {
		# group(4)
		'pnLink' : r'(http|https)://(.+)/(pn(\d+?))/.*',
		# group(3)
		'subLink' : r'(http|https)://(.+)/(.+/).*',
	}

	def __init__(self):
		print(">> cityType.spider")
		self.filterItems = FilterItems

		self.rootURL = "http://bj.58.com/"
		self.subURL = self.filterItems[0]['subLink']

		self._next_url = self.rootURL + self.subURL
		self.start_urls = [ self._next_url ]
		
	def parse(self, response):
		old = self.filterItems
		old.extend(self.getFilterItem(response))
		print(newItems)

		# 测试
		fs = open('type.json', 'w')
		fs.write('{"data":')
		fs.write(json.dumps(newItems))
		fs.write('}')
		fs.close()


	def getFilterItem(self, response):
		filters = response.xpath("//div[@class='filter_item'][1]/ul/li[not(@class='select')]")
		fItems = []
		for f in filters:
			dic = {}
			link = f.xpath("./a/@href").extract()[0]
			dic['type'] = f.xpath("./a/text()").extract()[0]
			dic['subLink'] = re.search(self.reHook['subLink'], link).group(3)
			fItems.append(dic)

		return fItems