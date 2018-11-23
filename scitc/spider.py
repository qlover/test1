# 利用 xpath 解析
from lxml import etree
import pipeline

# 爬虫

# 最主要作用就是解析数据
class Spider(object):

	def __init__(self, key):
		self.key = key
		self.start_url = []
		self.next_url = ""
		self.isPageOver = False
		self.pipeline = pipeline.Pipeline()

		# 是否匹配关键字
		self.isMatch = False if self.key == '' or self.key == None else True

	# 解析
	# 最后以 JSON 格式返回
	# 返回 文字，链接和时间
	def parse(self, response, url):

		result = self.for_xpath(response)
		
		return result

	# time = "//ul[@class='ulNewsList']/li/span/text()"
	# linkText = "//ul[@class='ulNewsList']/li/a/text()"
	# link = "//ul[@class='ulNewsList']/li/a/@href"
	def for_xpath(self, res):
		eh = etree.HTML(res)
		html_nodes = eh.xpath("//ul[@class='ulNewsList']/li")
		
		items = []
		for node in html_nodes:
			item = {}
			linkText = node.xpath("./a/text()")[0]

			# 是否匹配关键字
			if self.isMatch:
				# find -1 表示没有匹配到关键字
				ind = linkText.find(self.key)
				# 匹配成功
				if ind != -1:
					# print('[keyword match]', linkText, self.key)
					item['linkText'] = linkText
					item['link'] = node.xpath("./a/@href")[0]
					item['time'] = node.xpath("./span/text()")[0]
					items.append(item)
					# 将数据返回给管道
					self.pipeline.handle(item)

			# 不匹配关键字
			else:
				# print('[keyword not match]', linkText, self.key)
				item['linkText'] = linkText
				item['link'] = node.xpath("./a/@href")[0]
				item['time'] = node.xpath("./span/text()")[0]
				items.append(item)
				# 将数据返回给管道
				self.pipeline.handle(item)				

		# 取下一页地址
		if eh.xpath("//div/span[@class='NextDisabled'][1]"):
			self.isPageOver = True
			return ''
		else:
			self.next_url = eh.xpath("//div/a[@class='Next'][1]/@href")[0]
			
		return items

	# 获取下一页
	# //div/a[@class='Next'][1]
	def get_next_url(self):
		return self.next_url
