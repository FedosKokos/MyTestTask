const express = require("express");
const path = require("path");

const settings = require("./settings.json");

const port = settings.httpPort;

const app = express();

app.use(express.static(path.join(__dirname, "/")));
app.use(express.json());

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.get("/getData", async function (req, res) {
  try {
    const result = await fetch(
      "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT"
    );
    const response = await result.json();
    // Цены
    const bidPrice = Number(response.bidPrice);
    const askPrice = Number(response.askPrice);
    const commission = settings.commission;

    // Коммиссии
    const bidCommission = (bidPrice * commission) / 100;
    const askCommission = (askPrice * commission) / 100;

    // Цены с коммиссией
    const bidPriceWithCommission = bidPrice + bidCommission; // Покупатель платит больше
    const askPriceWithCommission = askPrice - askCommission; // Продавцу нужно заплатить меньше

    // Финальная цена
    const finalPrice = (bidPriceWithCommission + askPriceWithCommission) / 2;

    // Частота    
     const frequency = settings.frequency * 1000;

    
    res.json({
      _bidPrice: bidPrice,
      _askPrice: askPrice,
      _commission: commission,
      _bidPriceWithCommission: bidPriceWithCommission,
      _askPriceWithCommission: askPriceWithCommission,
      _finalPrice: finalPrice,
      _frequency: settings.frequency,
    });
  } catch (err) {
    console.log(`Ошибка ${err}`);
  }
});

app.listen(port, function () {
  console.log(`Сервер запусчен на: http://localhost:${port}`);
});
