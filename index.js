import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TOKEN = "ضع_هنا_التوكن_الخاص_بك";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown"
    })
  });
}

app.post("/", async (req, res) => {
  const message = req.body.message;
  if (!message) return res.sendStatus(200);

  const text = message.text;

  if (text === "/start") {
    await sendMessage(message.chat.id, "👋 مرحبًا بك! اكتب /my_stats لرؤية الإحصائيات.");
  }

  if (text === "/my_stats") {
    await sendMessage(message.chat.id,
      "📊 *إحصائياتك:*\n\n👥 عدد دعواتك: 5\n🎯 رتبتك: عضو نشط\n🏆 مركزك: #12"
    );
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("🚀 البوت يعمل على المنفذ 3000"));
