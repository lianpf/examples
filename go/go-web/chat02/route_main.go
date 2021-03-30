package main

import (
	"net/http"
	"html/template"
)

// index-处理器函数
func index(w http.ResponseWriter, r *http.Request) {
	threads, err := data.Threads()
	if err == nil {
		// err 判断是否登录，选择对应public或private导航
		_, err := session(w, r)
		if err != nil {
			// 负责生成html且将其写入 ResponseWriter 中
			// ParseFiles 函数对html模板进行语法分析
			// Must函数包裹是为了捕获 ParseFiles函数执行结果出现的错误
			generateHTML(writer, threads, "layout", "public.navbar", "index")
		} else {
			generateHTML(writer, threads, "layout", "private.navbar", "index")
		}
		templates.ExecuteTemplate(w, "layout", threads)
	}
}