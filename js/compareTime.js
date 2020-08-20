// 過ぎたら1 丁度なら0 まだなら-1 を返還
// UTCからの時間経過が引数
export default function compareTime(setTime){
    var now = new Date();
    var nowTime = now.getTime();
    console.log(setTime,nowTime);
    if(setTime < nowTime) {
        return 1;
    } else if(setTime > nowTime ){
        return -1;
    } else {
        return 0;
    }
}
