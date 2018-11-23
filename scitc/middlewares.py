from urllib import request, parse
# 中间件

class Middlewares(object):
	"""中间件"""
	def __init__(self):
		super(Middlewares, self).__init__()
		self.headers = {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36',
		}

	def request(self, url, method='GET'):
		req = request.Request(url=url, headers=self.headers, method=method)
		return req
