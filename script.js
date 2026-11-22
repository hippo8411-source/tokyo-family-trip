
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
const TEST_JAPAN_DATE = null;

// 取得今天的日本日期
function getJapanDate() {
    if (TEST_JAPAN_DATE !== null) {
    return TEST_JAPAN_DATE;
}
    const today = new Date();

    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(today);
}
// 判斷今天是旅行第幾天
function getTripDay() {
    const japanDate = getJapanDate();

    if (japanDate < "2026-12-06") return 0;
    if (japanDate > "2026-12-12") return 8;

    const day = Number(japanDate.split("-")[2]);

    return day - 5;
}
// 更新智慧首頁的日期與旅行狀態
function updateSmartHome() {
    const tripDay = getTripDay();
    const dateText = document.getElementById("smart-home-date");
    const title = document.getElementById("smart-home-title");

    if (tripDay === 0) {
        title.textContent = "🧳 東京旅行準備中";
        dateText.textContent = "距離出發還有一段時間，準備迎接東京之旅！";
    } else if (tripDay === 8) {
        title.textContent = "🏠 東京旅行圓滿結束";
        dateText.textContent = "宇宸的六歲生日旅行，留下美好的回憶 ❤️";
    } else {
        title.textContent = tripDay === 3
            ? "🎂 宇宸六歲生日快樂！"
            : "🇯🇵 東京家庭旅行";

        dateText.textContent =
            `${getJapanDate()}｜旅行第 ${tripDay} 天`;
    }
}

updateSmartHome();
// 智慧首頁：每日行程摘要
function updateSmartHomePlan() {
    const tripDay = getTripDay();
    const plan = document.getElementById("smart-home-plan");

    const dailyPlans = [
        "✈️ 抵達東京・前往錦糸町住宿",
        "⛩️ 淺草雷門・仲見世・晴空塔",
        "🎂 宇宸六歲生日・日本橋寶可夢之旅",
        "⛄ 輕井澤王子滑雪場・玩雪",
        "🖍️ 春日部・蠟筆小新之旅",
        "⚡ 池袋寶可夢中心・原宿",
        "🛫 前往成田機場・返回台灣"
    ];

    if (tripDay === 0) {
        plan.innerHTML = `
            <h3>📍 今日行程</h3>
            <p>旅行尚未開始，12/6 即將出發！</p>
        `;
    } else if (tripDay === 8) {
        plan.innerHTML = `
            <h3>📍 今日行程</h3>
            <p>七天東京生日之旅已經結束 ❤️</p>
        `;
    } else {
        plan.innerHTML = `
            <h3>📍 今日行程</h3>
            <p>${dailyPlans[tripDay - 1]}</p>
            <button type="button" onclick="showDay('12/${String(tripDay + 5).padStart(2, '0')}')">
                📅 查看今日詳細行程
            </button>
        `;
    }
}

updateSmartHomePlan();
// 智慧首頁：天氣查詢地點
const weatherLocations = {
    tokyo: {
        name: "東京",
        latitude: 35.6762,
        longitude: 139.6503
    },
    karuizawa: {
        name: "輕井澤",
        latitude: 36.3483,
        longitude: 138.5969
    }
};

// 根據旅行日期選擇當天目的地
function getTodayWeatherLocation() {
    const tripDay = getTripDay();

    if (tripDay === 4) {
        return weatherLocations.karuizawa;
    }

    return weatherLocations.tokyo;
}
// 測試取得東京即時天氣
// 將天氣代碼轉換成中文描述
function getWeatherDescription(code) {
    if (code === 0) return "☀️ 晴天";
    if (code <= 3) return "⛅ 多雲";
    if (code <= 48) return "🌫️ 有霧";
    if (code <= 67) return "🌧️ 下雨";
    if (code <= 77) return "❄️ 下雪";
    if (code <= 82) return "🌦️ 陣雨";
    if (code <= 86) return "🌨️ 陣雪";
    if (code <= 99) return "⛈️ 雷雨";

    return "🌤️ 天氣未知";
}
// 根據氣溫產生穿衣建議
function getClothingAdvice(temperature) {
    if (temperature <= 0) {
        return "🥶 非常寒冷：發熱衣＋保暖中層＋厚外套，搭配手套、圍巾與毛帽。";
    }

    if (temperature <= 7) {
        return "🧣 天氣寒冷：發熱衣＋毛衣或刷毛衣＋防風厚外套。";
    }

    if (temperature <= 14) {
        return "🧥 天氣偏冷：長袖上衣＋保暖外套，早晚注意保暖。";
    }

    return "👕 天氣較溫和：長袖上衣搭配方便穿脫的外套。";
}
async function testTokyoWeather() {
    try {
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=35.6762" +
            "&longitude=139.6503" +
            "&current=temperature_2m,relative_humidity_2m,weather_code" +
            "&timezone=Asia%2FTokyo";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("天氣服務回應異常");
        }

        const data = await response.json();
// 儲存最後一次成功取得的東京天氣
const tokyoWeatherCache = {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
    updatedAt: new Date().toISOString()
};

localStorage.setItem(
    "tokyoWeatherCache",
    JSON.stringify(tokyoWeatherCache)
);
        const tokyoTemperature = data.current.temperature_2m;

const weatherBox = document.getElementById("smart-home-weather");
const tokyoText = weatherBox.querySelector("p");

const weatherDescription =
    getWeatherDescription(data.current.weather_code);

tokyoText.textContent =
    `東京：${weatherDescription}・${tokyoTemperature}°C`;

    const clothingBox = document.getElementById("smart-home-clothing");
const clothingText = clothingBox.querySelector("p");

// 只有非輕井澤玩雪日，才使用東京氣溫
if (getTripDay() !== 4) {
    clothingText.textContent = getClothingAdvice(tokyoTemperature);
}
   } catch (error) {
    console.error("東京天氣取得失敗：", error);

const weatherBox = document.getElementById("smart-home-weather");
const tokyoText = weatherBox.querySelector("p");
const clothingText = document.querySelector("#smart-home-clothing p");

const savedWeather = localStorage.getItem("tokyoWeatherCache");

if (savedWeather) {
    const cached = JSON.parse(savedWeather);

    const description = getWeatherDescription(cached.weatherCode);

    const updatedTime = new Date(cached.updatedAt).toLocaleString(
        "zh-TW",
        {
            timeZone: "Asia/Tokyo",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

    tokyoText.textContent =
        `東京：${description}・${cached.temperature}°C（離線資料，最後更新：${updatedTime} 日本時間）`;

    if (getTripDay() !== 4) {
        clothingText.textContent =
            getClothingAdvice(cached.temperature);
    }
} else {
    tokyoText.textContent =
        "東京：暫時無法取得天氣，請確認網路連線。";

    if (getTripDay() !== 4) {
        clothingText.textContent =
            "暫時無法提供即時穿衣建議，請依當地氣溫注意保暖。";
    }
}
}}

testTokyoWeather();
// 取得當天目的地的即時氣溫
async function loadDestinationWeather() {
    const location = getTodayWeatherLocation();

    const weatherBox = document.getElementById("smart-home-weather");
    const destinationText = weatherBox.querySelectorAll("p")[1];
// 只有輕井澤玩雪日才需要比較兩地天氣
if (getTripDay() !== 4) {
    destinationText.hidden = true;
    return;
}

destinationText.hidden = false;
    try {
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${location.latitude}` +
            `&longitude=${location.longitude}` +
            "&current=temperature_2m,weather_code" +
            "&timezone=Asia%2FTokyo";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("天氣服務回應異常");
        }

        const data = await response.json();

        // 儲存目的地天氣，供離線使用
localStorage.setItem("tokyoDestinationWeather", JSON.stringify({
    location: location.name,
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
    updatedAt: new Date().toISOString()
}));

        const weatherDescription =
    getWeatherDescription(data.current.weather_code);

destinationText.textContent =
    `目的地（${location.name}）：${weatherDescription}・${data.current.temperature_2m}°C`;
// 輕井澤玩雪日：使用當地氣溫提供穿衣建議
if (getTripDay() === 4) {
    const clothingText = document.querySelector(
        "#smart-home-clothing p"
    );

    clothingText.textContent =
        getClothingAdvice(data.current.temperature_2m) +
        " ⛄ 今天要玩雪，請準備防水手套、雪褲、防滑保暖鞋及備用襪子，宇宸也要特別注意手腳保暖。";
}
   } catch (error) {
    const cached = JSON.parse(
        localStorage.getItem("tokyoDestinationWeather") || "null"
    );

    if (cached && cached.location === location.name) {
        const description = getWeatherDescription(cached.weatherCode);

        const updatedTime = new Date(cached.updatedAt).toLocaleString(
            "zh-TW",
            {
                timeZone: "Asia/Tokyo",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

        destinationText.textContent =
            `目的地（${cached.location}）：${description}・${cached.temperature}°C` +
            `（離線資料，最後更新：${updatedTime} 日本時間）`;

        if (getTripDay() === 4) {
            const clothingText = document.querySelector(
                "#smart-home-clothing p"
            );

            clothingText.textContent =
                getClothingAdvice(cached.temperature) +
                "（依最後取得的天氣資料建議）";
        }
    } else {
        destinationText.textContent = "目的地：暫時無法取得天氣";
    }

    console.error("目的地天氣取得失敗：", error);
}
}

loadDestinationWeather();
/* 宇宸生日行程詳細資訊 */


/* 宇宸生日詳細頁面 */





/* 返回每日行程 */


/* 返回每日行程 */


function goHome() {

    // 隱藏共用詳細行程頁面
    document.getElementById("day-detail-page").hidden = true;
document.getElementById("transport-page").hidden = true;
document.getElementById("map-page").hidden = true;
document.getElementById("tools-page").hidden = true;
    // 顯示首頁七天行程
    document.querySelector(".today").hidden = false;
document.getElementById("smart-home").hidden = false;
document.getElementById("itinerary-list").hidden = true;
}
/* 顯示每日行程列表 */
function showItinerary() {
    // 先回到每日行程頁面
    goHome();
document.getElementById("smart-home").hidden = true;
document.getElementById("itinerary-list").hidden = false;
    // 再捲動到每日行程列表
    document.getElementById("itinerary-list").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
/* 開啟交通資訊頁面 */
function showTransport() {

    // 隱藏首頁七天行程
    document.querySelector(".today").hidden = true;

    // 隱藏每日詳細行程
    document.getElementById("day-detail-page").hidden = true;
document.getElementById("map-page").hidden = true;
document.getElementById("tools-page").hidden = true;
    // 顯示交通資訊頁面
    document.getElementById("transport-page").hidden = false;

}
/* 開啟地圖頁面 */
function showMap() {
    // 隱藏每日行程列表
    document.querySelector(".today").hidden = true;

    // 隱藏每日詳細行程
    document.getElementById("day-detail-page").hidden = true;

    // 隱藏交通頁面
    document.getElementById("transport-page").hidden = true;
document.getElementById("tools-page").hidden = true;
    // 顯示地圖頁面
    document.getElementById("map-page").hidden = false;

    // 回到頁面頂端
    window.scrollTo(0, 0);
}
    /* 開啟旅行工具頁面 */
function showTools() {
    // 隱藏每日行程列表
    document.querySelector(".today").hidden = true;

    // 隱藏其他頁面
    document.getElementById("day-detail-page").hidden = true;
    document.getElementById("transport-page").hidden = true;
    document.getElementById("map-page").hidden = true;

    // 顯示工具頁面
    document.getElementById("tools-page").hidden = false;

    // 回到頁面最上方
    window.scrollTo(0, 0);
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
document.getElementById("tools-page").hidden = true;
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

/* 行李整理表：自動保存勾選紀錄 */
/* 行李整理表：自動保存與進度計算 */
function setupPackingList() {
    const checkboxes = document.querySelectorAll(
        '#packing-list input[type="checkbox"]'
    );

    const progressText = document.getElementById('packing-progress-text');
    const progressBar = document.getElementById('packing-progress-bar');

    // 更新行李準備進度
    function updatePackingProgress() {
// 讀取已保存的自訂行李
const savedCustomPacking = JSON.parse(
    localStorage.getItem("tokyoCustomPacking") || "[]"
);

// 固定行李 + 自訂行李的總數
const total = checkboxes.length + savedCustomPacking.length;

// 固定行李 + 自訂行李的完成數量
const completed =
    Array.from(checkboxes).filter(
        checkbox => checkbox.checked
    ).length +
    savedCustomPacking.filter(
        item => item.checked
    ).length;
            const percent = total === 0
            ? 0
            : Math.round(completed / total * 100);

        progressText.textContent =
            `${completed} / ${total}（${percent}%）`;

        progressBar.max = total;
        progressBar.value = completed;
    }
refreshPackingProgress = updatePackingProgress;
    checkboxes.forEach((checkbox, index) => {
        const key = 'tokyo-packing-' + index;

        // 恢復之前保存的勾選狀態
        checkbox.checked = localStorage.getItem(key) === 'true';

        // 勾選時自動保存並更新進度
        checkbox.addEventListener('change', () => {
            localStorage.setItem(key, checkbox.checked);
            updatePackingProgress();
        });
    });

    // 開啟頁面時先計算一次
    updatePackingProgress();
}
let refreshPackingProgress = function () {};
setupPackingList();
// 日本採買備忘錄：新增與保存商品
const shoppingForm = document.getElementById("shopping-form");
const shoppingName = document.getElementById("shopping-name");
const shoppingNote = document.getElementById("shopping-note");
const shoppingList = document.getElementById("shopping-list");
const shoppingCount = document.getElementById("shopping-count");

let shoppingItems = JSON.parse(
    localStorage.getItem("tokyoShoppingItems") || "[]"
);

function saveShoppingItems() {
    localStorage.setItem("tokyoShoppingItems", JSON.stringify(shoppingItems));
}

function renderShoppingItems() {
    shoppingList.innerHTML = "";

    shoppingItems.forEach((item) => {
        const row = document.createElement("div");
        row.className = "shopping-item";
        // 已購買勾選框
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.bought;

        checkbox.addEventListener("change", function () {
            item.bought = checkbox.checked;
            saveShoppingItems();
            renderShoppingItems();
        });

        row.appendChild(checkbox);

        if (item.bought) {
            row.classList.add("shopping-bought");
        }
        const name = document.createElement("strong");
        name.textContent = item.name;
        row.appendChild(name);

        if (item.note) {
            const note = document.createElement("p");
            note.textContent = item.note;
            row.appendChild(note);
        }
        // 編輯商品按鈕
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "✏️ 編輯";

editButton.addEventListener("click", function () {
    const newName = prompt("修改商品名稱：", item.name);

    // 按取消就不修改
    if (newName === null) return;

    // 商品名稱不能空白
    if (!newName.trim()) {
        alert("商品名稱不能空白！");
        return;
    }

    const newNote = prompt("修改備註／購買地點：", item.note || "");

    // 按取消就不修改
    if (newNote === null) return;

    item.name = newName.trim();
    item.note = newNote.trim();

    saveShoppingItems();
    renderShoppingItems();
});

row.appendChild(editButton);
// 刪除商品按鈕
const deleteButton = document.createElement("button");
deleteButton.type = "button";
deleteButton.textContent = "🗑️ 刪除";

deleteButton.addEventListener("click", function () {
    if (!confirm(`確定要刪除「${item.name}」嗎？`)) {
        return;
    }

    shoppingItems = shoppingItems.filter(
        shoppingItem => shoppingItem.id !== item.id
    );

    saveShoppingItems();
    renderShoppingItems();
});

row.appendChild(deleteButton);
        shoppingList.appendChild(row);
    });

    // 計算採買完成進度
const total = shoppingItems.length;
const bought = shoppingItems.filter(item => item.bought).length;
const percent = total === 0 ? 0 : Math.round(bought / total * 100);

shoppingCount.textContent =
    total === 0
        ? "目前尚無商品"
        : `已買 ${bought} / ${total} 項（${percent}%）`;}

if (shoppingForm) {
    shoppingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = shoppingName.value.trim();
        const note = shoppingNote.value.trim();

        if (!name) return;

        shoppingItems.push({
            id: Date.now().toString(),
            name: name,
            note: note,
            bought: false
        });

        saveShoppingItems();
        renderShoppingItems();

        shoppingForm.reset();
    });

    renderShoppingItems();
}
// 自訂行李清單
const customPackingForm = document.getElementById("custom-packing-form");
const customPackingName = document.getElementById("custom-packing-name");
const customPackingList = document.getElementById("custom-packing-list");

// 讀取之前儲存的自訂行李
let customPackingItems = JSON.parse(
    localStorage.getItem("tokyoCustomPacking") || "[]"
);

function saveCustomPacking() {
    localStorage.setItem(
        "tokyoCustomPacking",
        JSON.stringify(customPackingItems)
    );
}

function renderCustomPacking() {
    customPackingList.innerHTML = "";

    // 自訂行李變動後，重新計算行李準備進度
refreshPackingProgress();    
    customPackingItems.forEach(function (item) {
        const row = document.createElement("div");
        row.className = "custom-packing-item";
// 自訂行李勾選框
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = item.checked;

checkbox.addEventListener("change", function () {
    item.checked = checkbox.checked;
    saveCustomPacking();
    renderCustomPacking();
});

row.appendChild(checkbox);
        const name = document.createElement("span");
        name.textContent = item.name;

        row.appendChild(name);
        // 編輯自訂行李
const editButton = document.createElement("button");
editButton.type = "button";
editButton.textContent = "✏️ 編輯";

editButton.addEventListener("click", function () {
    const newName = prompt("修改行李名稱：", item.name);

    // 按取消就不修改
    if (newName === null) return;

    // 不允許空白名稱
    if (!newName.trim()) {
        alert("行李名稱不能空白！");
        return;
    }

    item.name = newName.trim();

    saveCustomPacking();
    renderCustomPacking();
});

row.appendChild(editButton);
        // 刪除自訂行李
const deleteButton = document.createElement("button");
deleteButton.type = "button";
deleteButton.textContent = "🗑️ 刪除";

deleteButton.addEventListener("click", function () {
    if (!confirm(`確定要刪除「${item.name}」嗎？`)) {
        return;
    }

    customPackingItems = customPackingItems.filter(
        packingItem => packingItem.id !== item.id
    );

    saveCustomPacking();
    renderCustomPacking();
});

row.appendChild(deleteButton);
        customPackingList.appendChild(row);
    });
}

if (customPackingForm) {
    customPackingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = customPackingName.value.trim();

        if (!name) return;

        customPackingItems.push({
            id: Date.now().toString(),
            name: name,
            checked: false
        });

        saveCustomPacking();
        renderCustomPacking();

        customPackingForm.reset();
    });

    renderCustomPacking();
}