from urllib import request
url = "https://www.lagou.com/zhaopin/"
res = request.urlopen(url)

if res.getcode() == 200:
	fs = open('test.html','w')
	fs.write(res.read().decode('utf-8'))
	fs.close()
else:
	print('***************')