document.getElementById("convertBtn").addEventListener("click", function () {
  const currency = document.getElementById("currency").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount)) {
    alert("Error");
    return;
  }

  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
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
      alert("Error");
    });
});
