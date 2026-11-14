
/* 東京旅行倒數計時 */

// 設定旅行日期（台灣時間）
const tripStart = new Date("2026-12-06T00:00:00+08:00");
const tripEnd = new Date("2026-12-13T00:00:00+09:00");

// 找到網頁上的倒數區域
const countdown = document.getElementById("countdown-number");
const countdownTitle = document.querySelector(".countdown h3");

// 建立倒數更新功能
function updateCountdown() {


    // 每次執行都重新取得現在時間
    const now = new Date();

    if (now < tripStart) {

        const difference = tripStart - now;

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        
document.getElementById("days").textContent = days;
document.getElementById("hours").textContent = String(hours).padStart(2, "0");
document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");


    } else if (now < tripEnd) {

        countdownTitle.textContent = "🎉 東京旅行進行中！";
        countdown.textContent = "享受東京之旅 ❤️";

    } else {

        countdownTitle.textContent = "🎂 宇宸的東京生日旅行";
        countdown.textContent = "旅行圓滿結束！";

    }
}

// 開啟網頁時先執行一次
updateCountdown();

// 之後每隔 1 秒再執行一次
setInterval(updateCountdown, 1000);



/* 宇宸生日行程詳細資訊 */


/* 宇宸生日詳細頁面 */





/* 返回每日行程 */


/* 返回每日行程 */


function goHome() {

    // 隱藏共用詳細行程頁面
    document.getElementById("day-detail-page").hidden = true;
document.getElementById("transport-page").hidden = true;
    // 顯示首頁七天行程
    document.querySelector(".today").hidden = false;

}

/* 開啟交通資訊頁面 */
function showTransport() {

    // 隱藏首頁七天行程
    document.querySelector(".today").hidden = true;

    // 隱藏每日詳細行程
    document.getElementById("day-detail-page").hidden = true;

    // 顯示交通資訊頁面
    document.getElementById("transport-page").hidden = false;

}


/* 2026 東京旅行：七天行程資料 */

const tripDays = {
    "12/06": {
        title: "✈️ 抵達東京・錦糸町",
        places: [
            "桃園機場 T1：15:35 起飛",
            "成田機場 T2：19:35 抵達",
            "JR 直達錦糸町",
            "步行前往 Airbnb 入住"
        ]
    },

    "12/07": {
        title: "🏮 淺草・晴空塔",
        places: [
            "淺草雷門、仲見世商店街",
            "Flower Miffy",
            "東京晴空塔（視天氣決定是否登塔）",
            "Pokémon Center Skytree Town"
        ]
    },

    "12/08": {
        title: "🎂 宇宸6歲生日",
        places: [
            "Pokémon Cafe TOKYO（尚未訂位成功）",
            "Pokémon Center TOKYO DX",
            "日本橋高島屋",
            "錦糸町購買生日切片蛋糕",
            "回 Airbnb 慶生"
        ]
    },

    "12/09": {
        title: "❄️ 輕井澤玩雪",
        places: [
            "搭乘北陸新幹線前往輕井澤",
            "王子滑雪場 Snowman Park",
            "只玩雪、不滑雪",
            "返回東京住宿"
        ]
    },

    "12/10": {
        title: "🖍️ 春日部・蠟筆小新",
        places: [
            "春日部站及小新相關景點",
            "小新主題遊戲中心",
            "春日部市役所、野原一家雕像",
            "下午視體力決定是否前往澀谷"
        ]
    },

    "12/11": {
        title: "⚡ 池袋・原宿",
        places: [
            "Pokémon Center MEGA TOKYO",
            "Pikachu Sweets",
            "Pokémon Card Station",
            "原宿 Topologie、表參道",
            "返回住宿整理行李"
        ]
    },

    "12/12": {
        title: "✈️ 返回台灣",
        places: [
            "退房，前往成田機場 T2",
            "預計 10:00 左右抵達機場",
            "虎航 IT201：13:00 起飛",
            "桃園機場 T1：16:25 抵達",
            "取車返回宜蘭"
        ]
    }
};
/* 顯示指定日期的詳細行程 */

function showDay(date) {

    // 取得指定日期的行程資料
    const day = tripDays[date];

    // 如果找不到資料，就停止執行
    if (!day) {
        console.error("找不到行程資料：" + date);
        return;
    }

    // 隱藏首頁及舊的詳細頁面
    document.querySelector(".today").hidden = true;

    // 找到共用詳細頁面
    const detailPage = document.getElementById("day-detail-page");

    // 更新當天標題
    document.getElementById("day-detail-title").textContent = day.title;

    // 找到景點清單容器
    const placesContainer = document.getElementById("day-detail-places");

    // 清除上一次顯示的景點
    placesContainer.replaceChildren();

    // 自動產生當天每個景點
   


day.places.forEach(function(place) {

    const paragraph = document.createElement("p");
    paragraph.textContent = place;

    // 找出這一行文字中所有符合的景點
    const matchedLocations = Object.keys(mapLocations).filter(
        function(name) {
            return place.includes(name);
        }
    );

    // 每個符合的景點都建立自己的導航按鈕
    matchedLocations.forEach(function(name) {

        const mapLink = document.createElement("a");

        mapLink.textContent = "📍 " + name;

        const destination = mapLocations[name];


mapLink.href =
    "https://www.google.com/maps/search/?api=1" +
    "&query=" +
    encodeURIComponent(destination);


        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";

        mapLink.className = "map-button";

        paragraph.appendChild(mapLink);

    });

    placesContainer.appendChild(paragraph);

});


    // 顯示共用詳細頁面
    detailPage.hidden = false;
}

/* 第49步：Google Maps 導航資料 */

const mapLocations = {
    "淺草雷門": "淺草寺 雷門 東京都台東區",
    "仲見世商店街": "仲見世商店街 東京都台東區",
    "Flower Miffy": "Flower Miffy 浅草",
    "東京晴空塔": "東京スカイツリー",
    "Pokémon Center Skytree Town": "ポケモンセンタースカイツリータウン",

    "Pokémon Cafe TOKYO": "ポケモンカフェ 東京 日本橋",
    "Pokémon Center TOKYO DX": "ポケモンセンタートウキョーDX",
    "日本橋高島屋": "日本橋高島屋S.C.",

    "輕井澤": "軽井沢駅",
    "王子滑雪場": "軽井沢プリンスホテルスキー場",

    "春日部站": "春日部駅",
    "春日部市役所": "春日部市役所",

    "Pokémon Center MEGA TOKYO": "ポケモンセンターメガトウキョー",
    "Pikachu Sweets": "ピカチュウスイーツ",
    "Pokémon Card Station": "ポケモンカードステーション 池袋",
    "原宿": "原宿駅",
    "表參道": "表参道駅"
};

 // 註冊離線功能
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./service-worker.js")
            .then(function() {
                console.log("離線功能註冊成功");
            })
            .catch(function(error) {
                console.error("離線功能註冊失敗：", error);
            });
    });
}

