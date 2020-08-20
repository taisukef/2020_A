<!DOCTYPE html>
<html><body>
    Test
    <div id="test1">

    </div>
    <!-- <script src="../js/compareTime.js"></script> -->
    <script type="module">

        import { compareTime } from "./js/compareTime.js";
        const testdate = new Date(2020,7,20,11,42).getTime();
        // 仮の設定時間の定義
        window.onload =  function () {
            var cnt = setInterval(function(){
                var cmp = compareTime(testdate);
                if(cmp >= 0) {
                    clearInterval(cnt);
                    // cmp(compareTimeの返り値)が0以上なら時間が過ぎているのでループを抜ける
                }

            },100);
            // 100msごとにまわしている

        }
    </script>
</body></html>
