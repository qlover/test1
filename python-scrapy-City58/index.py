import os

if not os.path.isfile('proxies.txt'):
	os.system("py proxies.py")

if not os.path.isfile('type.json'):
	os.system("scrapy crawl cityType -s LOG_FILE=cityType.log")

os.system("scrapy crawl city -s LOG_FILE=city.log")
