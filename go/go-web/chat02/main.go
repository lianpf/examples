package main

import (
	"fmt"
	"net/http"
	"time"
)

func main()  {
	// 多路复用器
	mux := http.NewServeMux()
	files := http.fileServer(http.Dir(config.Static))

	// HandleFunc-将发送到根URL的请求重定向到处理器
	mux.HandleFunc("/", index)
	fmt.Println("ChitChat server start!")
}