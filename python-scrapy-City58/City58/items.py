# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class City58Item(scrapy.Item):
	jobID = scrapy.Field()
	jobType = scrapy.Field()
	jobName = scrapy.Field()
	jobzLink = scrapy.Field()
	# jobLocation = scrapy.Field()
	jobSalary = scrapy.Field()
	jobCate = scrapy.Field()
	jobEdu = scrapy.Field()
	jobExp = scrapy.Field()
	jobCompany = scrapy.Field()
	jobPubTime = scrapy.Field()