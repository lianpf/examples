// DB: select结果，数组转对象
const getObj = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) return arr[0]
  return {}
}

// 随机数
const random = () => {
  return Number.parseInt(Math.random() * 1000000);
}

// 此处可使用 npm: uuid 库替换
const getUuid = () => {
  return Date.now() + '-' + random();
}

module.exports = {
  getObj,
  getUuid
}