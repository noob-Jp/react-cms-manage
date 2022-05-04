//定义一个默认仓库
const defaultState = {
  msg: "你好世界",
  mykey: 1,
};
//导出一个函数
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "changeMsgFn":
      newState.msg = action.value;
      break;
    case "addKeyFn":
        console.log('触发addKeyFn');
      newState.mykey++;
      break;
    default:
      break;
  }
  return newState;
};
