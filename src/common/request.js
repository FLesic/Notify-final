function request(url, data, task = "请求") {
  console.log("req url: ", url, "data: ", data);
  return new Promise((resolve, reject) => {
    uni.request({
      url: "https://www.qsc.zju.edu.cn/notify/api/api/" + url,
      data: data,
      method: "POST",
      success: ({ data, cookies }) => {
        if (cookies) console.log(task, url, cookies);
        const ret = data;
        console.log(ret);
        if (ret.code !== 200) {
          switch (ret.code) {
            case 400:
              uni.showToast({
                title: "服务器错误",
                icon: "error",
              });
              break;
            case 500:
              uni.showToast({
                title: "请求错误",
                icon: "error",
              });
              break;
            default:
              uni.showToast({
                title: task + "失败",
                icon: "error",
              });
              break;
          }
          console.log(task + ": ", ret);
          reject(task + "失败");
        } else {
          resolve(ret.data);
        }
      },
      fail(e) {
        uni.showToast({
          title: task + "出错",
          icon: "error",
        });
        console.log(e);
        reject(e);
      },
    });
  });
}

export default request;