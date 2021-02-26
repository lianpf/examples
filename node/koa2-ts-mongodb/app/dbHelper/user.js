const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// mongoDB
var dbUrl = "mongodb://localhost:27017/testLocal";
const client = new MongoClient(dbUrl, {useNewUrlParser: true});
const dbName = 'testLocal'
const tableName = 'user'

// 参考格式
// module.exports = {
//   /**
//    * @param option
//    * {
//    *    tableName <String> 集合名
//    *    obj <object> 查询数据
//    * }
//    */
//   find:function (option={}) {
//       return new Promise(function (resolve,reject) {
//           MongoClient.connect(url, function(err, db) {
//               if (err) throw err;
//               var dbase = db.db("blog"); //数据库名
//               dbase.collection(option.tableName).find(option.obj).toArray(function(err, result) { // 返回集合中所有数据
//                   if (err) throw err;
//                   db.close();
//                   resolve(result);
//               });
//           });
//       })
//   }
// }


/**
 * @desc: 查询所有用户
 */
exports.queryUsers = async function() {
  let res = {}
  res = await new Promise(function (resolve, reject) {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const collection = db.collection(tableName);
      collection.find({}).toArray(function(err, result) {
        assert.equal(err, null);
        // console.log('--db-1-result--', result)
        resolve(result)
      });
      client.close();
    })
  }).then(function (data) {
    return data;
  });
  // console.log('--db-2-res--', res)
  return res

}