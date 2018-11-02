import os

os.system("scrapy crawl cityType -s LOG_FILE=cityType.log")
os.system("scrapy crawl city -s LOG_FILE=city.log")
