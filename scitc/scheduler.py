
# 调度器
# 主要负责 URL 的管理


class Scheduler(object):


	ready_urls = set()
	already_urls = set()

	""" URL 管理"""
	def __init__(self, url):
		super(Scheduler, self).__init__()
		self.ready_urls.add(url)

	# 得到准备爬取的集合中的最后一个地址
	def getReadyURL(self):
		# 用 pop() 方法得到集合中的最后一个地址
		url = self.ready_urls.pop()
		# 将将这个地址添加到已经爬取的地址集合中
		self.already_urls.add(url)
		return url

	# 添加一个准备爬取的地址
	def addReadyURL(self, url):
		if url not in self.ready_urls and url not in self.already_urls:
			self.ready_urls.add(url)

	# 将已经爬取的地址添加到已经爬取的地址集合中
	def addReadyURLs(self, urls):
		for url in urls:
			self.ready_urls.add(url)

	# 判断是否还有需要爬取的地址
	def hasReadyURL(self):
		# 如果这个集合的长度不等于 0 则说明还有
		return len(self.ready_urls) != 0


	def get_ready_urls(self):
		return self.ready_urls
	def get_already_urls(self):
		return self.already_urls