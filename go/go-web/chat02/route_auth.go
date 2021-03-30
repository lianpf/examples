package main

import (
	"net/http"
)

// auth-处理器函数:
func authenticate(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	// UserByEmail() 通过给定的 email 获取与之对应的User结构
	// Encrypt() 加密字符串
	user, _ := data.UserByEmail(r.PostFormValue("email"))
	if user.Password == data.Encrypt(r.PostFormValue("password")) {
		session := user.CreateSession()
		// 创建 cookie 结构
		cookie := http.Cookie{
			Name: "_cookie",
			Value: session.Uuid,
			HttpOnly: true,
		}
		http.SetCookie(w, &cookie)
		http.Redirect(w, r, "/", 302)
	} else {
		http.Redirect(w, r, "login", 302)
	}
}
