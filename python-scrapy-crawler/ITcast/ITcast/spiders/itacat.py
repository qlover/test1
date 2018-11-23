# -*- coding: utf-8 -*-
import scrapy


class ItacatSpider(scrapy.Spider):
    name = 'itacat'
    allowed_domains = ['http://www.itcast.cn']
    start_urls = ['http://http://www.itcast.cn/']

    def parse(self, response):
        pass
