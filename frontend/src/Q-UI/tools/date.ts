/**
 * return { Y年,M月,D日,h时,m分,s秒,ms毫秒,W周几,getTime时间戳 }
 */
export function getDate(o = new Date()) {
    return {
        Y: o.getFullYear(),
        M: o.getMonth() + 1,
        D: o.getDate(),
        h: o.getHours(),
        m: o.getMinutes(),
        s: o.getSeconds(),
        ms: o.getMilliseconds(),
        W: o.getDay() + 1,
        getTime: o.getTime()
    };
}

/*
    let s = ms / 1000;
    let m = Math.floor(s / 60) % 60;
    let h = Math.floor(s / 60 / 60) % 24;
    let D = Math.floor(s / 60 / 60 / 24);
*/
//日期转时间戳
// new Date(start.replace(/-0/g, '-')).getTime()