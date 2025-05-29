const tg = window.Telegram.WebApp;
let balance = 100;

function spin() {
    if (balance < 10) {
        alert("Недостаточно средств!");
        return;
    }

    // Отправка запроса на бекенд
    fetch("http://localhost:5000/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: tg.initDataUnsafe.user.id, bet: 10 })
    })
    .then(response => response.json())
    .then(data => {
        balance -= 10;
        if (data.result === "win") balance += data.prize;
        document.getElementById("balance").textContent = `Баланс: ${balance} 🎁`;
        document.getElementById("result").textContent = data.result === "win"
            ? `🎉 Вы выиграли ${data.prize} 🎁!`
            : "😢 Проигрыш...";
    });
}

tg.expand();  // Раскрыть Mini App на весь экран