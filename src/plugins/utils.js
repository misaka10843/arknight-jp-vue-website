// utils.js
const checkEmail = (email) => {         // 验证邮箱格式是否正确
    const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    return reg.test(email);
}

const judgeClient = () => {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
        client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        client = 'Android';
    } else {
        client = 'PC';
    }
    return client;
}

const formatTime = (time) => {
    let year = new Date(time).getFullYear()
    let month = new Date(time).getMonth() + 1
    let date = new Date(time).getDate()

    if(month < 10) {
        month = `0${month}`
    }
    if(date < 10) {
        date = `0${date}`
    }

    return `${year}.${month}.${date}`;
}

module.exports = {
    checkEmail,
    judgeClient,
    formatTime
}