const API = "https://api.frankfurter.dev/v2";

const form = document.getElementById("form");
const pairInput = document.getElementById("pair");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const status = document.getElementById("status");
const results = document.getElementById("results");
const buttons = form.querySelectorAll("button");

function toDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function yearsAgo(years) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return toDateString(date);
}

async function getRate(base, quote, date) {
  let url = `${API}/rate/${base}/${quote}?providers=ecb`;
  if (date) url += `&date=${date}`;

  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("The request failed.");

  return await response.json();
}

async function compare() {
  const [base, quote] = pairInput.value.split("-");
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  results.hidden = true;

  if (amount <= 0 || !date || date < "1999-01-04" || date > toDateString(new Date())) {
    status.textContent = "Enter a positive amount and a valid past date.";
    return;
  }

  status.textContent = "Loading rates...";
  buttons.forEach(button => button.disabled = true);

  try {
    const past = await getRate(base, quote, date);
    const latest = await getRate(base, quote);

    if (!past || !latest) {
      status.textContent = "No rate available for this date.";
      return;
    }

    const pastAmount = Math.round(amount * past.rate);
    const latestAmount = Math.round(amount * latest.rate);
    const difference = latestAmount - pastAmount;
    const percent = Math.abs((latest.rate - past.rate) / past.rate * 100).toFixed(1);

    document.getElementById("then-date").textContent = past.date;
    document.getElementById("latest-date").textContent = latest.date;
    document.getElementById("then-value").textContent = `${pastAmount.toLocaleString()} ${quote}`;
    document.getElementById("latest-value").textContent = `${latestAmount.toLocaleString()} ${quote}`;

    if (difference === 0) {
      document.getElementById("difference").textContent = `0 ${quote}`;
      document.getElementById("summary").textContent = "No change.";
    } else {
      const sign = difference > 0 ? "+" : "-";
      document.getElementById("difference").textContent =
        `${sign}${Math.abs(difference).toLocaleString()} ${quote} (${sign}${percent}%)`;
      document.getElementById("summary").textContent =
        `${amount} ${base} converts to ${Math.abs(difference).toLocaleString()} ${quote} ` +
        `${difference > 0 ? "more" : "less"} at the latest rate.`;
    }

    status.textContent = "";
    results.hidden = false;
  } catch (error) {
    status.textContent = "Could not load exchange rates. Try again later.";
    console.error(error);
  } finally {
    buttons.forEach(button => button.disabled = false);
  }
}

form.addEventListener("input", () => {
  results.hidden = true;
  status.textContent = "";
});

form.addEventListener("submit", event => {
  event.preventDefault();
  compare();
});

document.querySelectorAll("[data-years]").forEach(button => {
  button.addEventListener("click", () => {
    dateInput.value = yearsAgo(Number(button.dataset.years));
    compare();
  });
});

dateInput.max = toDateString(new Date());
dateInput.value = yearsAgo(1);
compare();
