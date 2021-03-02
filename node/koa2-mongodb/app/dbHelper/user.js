const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// mongoDB
const dbUrl = "mongodb://localhost:27017/testLocal";
const client = new MongoClient(dbUrl, {useNewUrlParser: true});
const dbName = 'testLocal'
const tableName = 'user'

/**
 * @desc: 查询所有用户
 */
exports.queryUsers = function() {
  return new Promise(function (resolve, reject) {
    try {
      client.connect(function(err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection(tableName);
        collection.find({}).toArray(function(err, result) {
          assert.equal(err, null);
          // console.log('--db-1-result--', result)
          client.close();
          resolve(result)
        });
      })
    } catch(e) {
      reject(e)
    }
  })
}

// 参考格式
// module.exports = {
//   find: function () => {}
// }
