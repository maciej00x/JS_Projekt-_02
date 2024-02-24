document
  .getElementById("currencyForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount === 0) {
      alert("Proszę wpisać kwotę większą od 0");
      return;
    }

    const currency = document.getElementById("currency").value;

    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[0].mid;
        const convertedAmount = (amount * rate).toFixed(2);
        const rateText = `Kurs: 1 ${currency} = ${rate} PLN`;
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.textContent = `Przeliczona kwota: ${amount} ${currency} wynosi ${convertedAmount} PLN. ${rateText}`;
        resultContainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Wystąpił błąd przy przeliczaniu walut");
      });
  });
