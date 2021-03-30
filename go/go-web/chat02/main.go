package main

import (
	"fmt"
	"net/http"
)

func main()  {
	// 多路复用器
	mux := http.NewServeMux()
	// 静态文件 serve
	files := http.FileServer(http.Dir(config.Static))
	mux.Handle("/static/", http.StripPrefix("/static/", files))

	// HandleFunc-将发送到根URL的请求重定向到处理器
	mux.HandleFunc("/", index)
	server := &http.Server{
		Addr: "0.0.0.0:8080",
		Handler: mux,
	}
	server.ListenAndServe()
	fmt.Println("ChitChat server start!")
}
