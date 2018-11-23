import downloader
import time
import log
from lxml import etree
# 管道

# 1970 时间戳
file = ('scitc-%s.txt') % (time.time())
class Pipeline(object):
	"""数据处理"""
	def __init__(self):
		super(Pipeline, self).__init__()
		self.downloader = downloader.Downloader()
		self.root_url = "http://www.scitc.com.cn/"
		

	def handle(self, item):
		# 重构下载页面地址
		link = item['link'].replace("../","")
		# 为短地址加上根路径
		link = link if not link.find('http') else self.root_url + link
		response = self.downloader.down(link)
		# 如果请求失败，则直接返回
		if response == 0:
			return
		# res[0] 标题,但要注意没有标题的时候
		# res[1] 页面内容列表
		res = self.parse_text(response)

		log.info(link, '>> writing...')
		title = (res[0][0] if res[0] else item["linkText"]).replace(' ', '').replace('\n','').encode('utf-8')
		fs = open(file, 'a+', encoding='utf-8')
		str_ =  ("标题: %s%s") % (title.decode('utf-8'), '\n')
		str_ += ("链接: %s%s") % (link, '\n')
		str_ += ("内容: %s%s") % (res[1].decode('utf-8'), '\n\n')
		fs.write(str_)
		fs.close()

	# 解析每个页面的文字内容
	# 返回列表
	# 元素1 页面标题
	# 元素2 页面内容
	def parse_text(self, res):
		eh = etree.HTML(res)
		# 页面标题
		title = eh.xpath("//div[@class='news_detail']/h1/text()")
		title = title if title != [] else []
		# 页面内容
		# 要去掉那些不可见的元素
		news_detail = eh.xpath("//div[@class='news_detail']/div[@class='nd_con']/*[not(@style='display: none')]")
		detail = ('NULL' if news_detail == [] else news_detail[0].xpath('string(.)')).replace(" ","").replace("\n","").encode('utf-8')
		return [title, detail]
