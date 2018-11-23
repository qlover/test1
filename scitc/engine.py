import scheduler
import spider
import downloader
import log
import pipeline
import middlewares
import sys

# 引擎
class Engine(object):
	
	root_url = "http://www.scitc.com.cn/"
	sub_url = "index/"
	urls = ['yw', 'jx', 'jjcx', 'tzgg', 'zztlxx']
	# 初始化开始第几个 urls 类型
	init_url_index = 0
	last_name = '.htm'
	next_url = ""


	def __init__(self, key):
		# 标识当前的子级目录是那一个
		self.key = key
		self.__initURL(self.init_url_index)
		self.scheduler = scheduler.Scheduler(self.next_url)
		self.spider = spider.Spider(key)
		self.downloader = downloader.Downloader()
		# self.pipeline = pipeline.Pipeline()
		self.middlewares = middlewares.Middlewares()	

	def __initURL(self, num):
		self.now_sub = self.urls[num]
		self.next_url = ("%s" * 4) % (self.root_url, self.sub_url, self.now_sub, self.last_name)

	def exec(self):

		while self.scheduler.hasReadyURL():
			
			try:
				url = self.scheduler.getReadyURL()
				response = self.downloader.down(url)
				if response == 0:
					continue
				item = self.spider.parse(response, url)

				# 首先判断是否该页结束
				if self.spider.isPageOver:
					print('>> [page over]')
					self.init_url_index += 1

					if self.init_url_index > len(self.urls) - 1 :
						print(">> [crawl over!!!]")
						return 
					else:
						self.spider.isPageOver = False

					# 改变
					self.__initURL(self.init_url_index)
					self.scheduler.addReadyURL(self.next_url)
					continue


				# 重组下一页地址
				next_page = self.spider.get_next_url()
				if next_page.find('/') == -1:
					self.next_url = ("%s%s%s/%s") % (self.root_url, self.sub_url, self.now_sub, next_page)
				else:
					self.next_url = ("%s%s%s") % (self.root_url, self.sub_url, next_page)

				# print(">> [next_url]", self.next_url)
				self.scheduler.addReadyURL(self.next_url)

				# self.pipeline.handle(item)
			except KeyboardInterrupt as e:
				input('是否要终止? y/n')

	def run(self):
		if len(self.scheduler.get_ready_urls()):
			self.exec()


if __name__ == '__main__':
	keyword = ''
	# 过滤用户输入
	try:
		arg = sys.argv[1:]
		keyword= arg[0]
	except IndexError as ie:
		keyword = input('请输入关键字: ')
	except ValueError as ve:
		log.info('参数次数不能是非整数')
		sys.exit(0)
	if keyword == '': keyword = ''

	# print('keyword is ', keyword)
	# 从引擎传输一个关键字
	e = Engine(keyword)
	e.run()
