package go_web_build

import (
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// dbAction
func dbAction() {
	db, err := sql.Open("mysql", "root:12345678@/localTestDB?charset=utf8")
	checkErr(err)

	//插入数据
	// stmt, err := db.Prepare("INSERT INTO userinfo SET username=?,department=?,created=?")
	// checkErr(err)

	// res, err := stmt.Exec("astaxie", "研发部门", "2012-12-09")
	// checkErr(err)

	// id, err := res.LastInsertId()
	// checkErr(err)

	// fmt.Println(id)
	// //更新数据
	// stmt, err = db.Prepare("update userinfo set username=? where uid=?")
	// checkErr(err)

	// res, err = stmt.Exec("astaxieupdate", id)
	// checkErr(err)

	// affect, err := res.RowsAffected()
	// checkErr(err)

	// fmt.Println(affect)

	//查询数据
	rows, err := db.Query("SELECT * FROM custom_code")
	checkErr(err)

	fmt.Println(rows)

	for rows.Next() {
		var id int
		var code string
		var page_id string
		err = rows.Scan(&id, &code, &page_id)
		checkErr(err)
		fmt.Println(id)
		fmt.Println(code)
		fmt.Println(page_id)
	}

	//删除数据
	// stmt, err = db.Prepare("delete from userinfo where uid=?")
	// checkErr(err)

	// res, err = stmt.Exec(id)
	// checkErr(err)

	// affect, err = res.RowsAffected()
	// checkErr(err)

	// fmt.Println(affect)

	db.Close()
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
}