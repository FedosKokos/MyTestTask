async function getFrequency() {
    try {
        const res = await fetch('/settings.json');
        const response = await res.json();
        const frequency = await response.frequency * 1000;
        getData();
        setInterval(() => { getData() }, frequency);

    } catch (err) {
        console.log(err);
    }
}

getFrequency();

async function getData() {
    const bidPriceElement = document.getElementById("bid-price");
    const askPriceElement = document.getElementById("ask-price");
    const commissionElement = document.getElementById("commission");
    const finalPriceElement = document.getElementById("finalPrice");
    try {
        const res = await fetch("/getData");
        const response = await res.json();
        bidPriceElement.innerText = response._bidPrice + "$";
        askPriceElement.innerText = response._askPrice + "$";
        commissionElement.innerText = response._commission + "%";
        finalPriceElement.innerText = response._finalPrice + "$";

    } catch (err) {
        console.log(`Ошибка ${err}`);
    }
}




