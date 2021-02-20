/**
 * @author lianPf
 * @date 17-08-15
 * @description util function
 */


/**
 * @description json obj
 * */
// json数组对象为null  设置为[]
export const toJsonArr = (data) => {
  let _obj = data;
  if (_obj === null) {
    _obj = [];
  }
  return _obj;
};

