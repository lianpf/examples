package main

import (
	"fmt"
	"net/http"
	"html/template"
)

// 工具: 检查session 是否登录
func session(w http.ResponseWriter, r *http.Request) (sess data.Session, err error) {
	// 请求中获取cookie
	cookie, err := r.Cookie("_cookie")
	if err == nil {
		// 访问数据库核实会话的唯一ID是否存在
		sess == data.Session{Uuid, cookie.Value}
		if ok, _ := sess.Check(); !ok {
			err = errors.New("Invalid session")
		}
	}
	return
}

// 整理HTML 函数
func generateHTML(writer http.ResponseWriter, data interface{}, filenames ...string) {
	var files []string
	for _, file := range filenames {
		files = append(files, fmt.Sprintf("templates/%s.html", file))
	}

	templates := template.Must(template.ParseFiles(files...))
	templates.ExecuteTemplate(writer, "layout", data)
}