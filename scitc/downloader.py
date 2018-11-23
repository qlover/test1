from urllib import request
import middlewares
# 下载器


class Downloader(object):
	def __init__(self):
		self.middlewares = middlewares.Middlewares()

	def down(self, url):
		try:

			req = self.middlewares.request(url)

			res = request.urlopen(req)

			code = res.getcode()
			if code != 200:
				# 直接返回错误状态
				return 0
			else:
				# 返回该请求的内容
				return res.read().decode("utf8")
		except Exception as e:
			return 0