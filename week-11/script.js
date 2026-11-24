const chart = document.querySelector('#chart');
const weekdayButton = document.querySelector('#sort-weekday');
const dropButton = document.querySelector('#sort-drop');
const sortStatus = document.querySelector('#sort-status');

let stations = [];
let maxValue = 0;

async function loadStations() {
  try {
    const response = await fetch('stations.csv');
    if (!response.ok) throw new Error('Could not load stations.csv.');
    const text = await response.text();
    const records = parseSimpleCSV(text);
    if (records.length !== 20) throw new Error('Expected 20 stations.');

    // CSV values are text. Convert the numbers and calculate the change.
    stations = records.map(record => {
      const weekday = Number(record.weekday_avg);
      const weekend = Number(record.weekend_avg);
      if (!record.station || !record.weekday_avg || !record.weekend_avg ||
          !Number.isFinite(weekday) || weekday <= 0 ||
          !Number.isFinite(weekend) || weekend < 0) {
        throw new Error('Check the station names and numbers in the CSV.');
      }
      return {
        rank: Number(record.rank),
        name: record.station,
        lines: record.lines,
        weekday: weekday,
        weekend: weekend,
        weekendDays: Number(record.weekend_days),
        change: (weekend / weekday - 1) * 100
      };
    });

    // One fixed maximum for every station and both sort orders.
    maxValue = Math.max(...stations.map(station => Math.max(station.weekday, station.weekend)));
    showSortedBy('weekday');
    weekdayButton.disabled = false;
    dropButton.disabled = false;
  } catch (error) {
    sortStatus.textContent = window.location.protocol === 'file:'
      ? 'Open this page with Live Server to load the CSV.'
      : 'The data could not be loaded. Please refresh the page to try again.';
    console.error(error);
  }
}

function parseSimpleCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().replace(/^\uFEFF/, '').split(',');
  return lines.filter(line => line.trim() !== '').map(line => {
    const values = line.split(',');
    if (values.length !== headers.length) throw new Error('Check the CSV columns.');
    const record = {};
    headers.forEach((header, index) => {
      record[header.trim()] = values[index].trim();
    });
    return record;
  });
}

function showSortedBy(type) {
  // Sort a copy. Keep the full percentage for sorting; round only the text.
  const sorted = [...stations].sort((a, b) => {
    const difference = type === 'weekday' ? b.weekday - a.weekday : a.change - b.change;
    return difference || a.rank - b.rank;
  });
  weekdayButton.setAttribute('aria-pressed', String(type === 'weekday'));
  dropButton.setAttribute('aria-pressed', String(type === 'drop'));
  sortStatus.textContent = type === 'weekday'
    ? '20 stations · most weekday entries first.'
    : '20 stations · biggest percentage drop first.';
  drawChart(sorted);
}

function drawChart(list) {
  chart.replaceChildren();
  list.forEach(station => {
    const row = document.createElement('li');
    row.className = 'station';
    const info = document.createElement('div');
    const name = document.createElement('h3');
    name.className = 'station-name';
    name.textContent = station.name;
    const lines = document.createElement('p');
    lines.className = 'station-lines';
    lines.textContent = station.lines;
    info.append(name, lines);

    if (station.weekendDays < 8) {
      const noteLink = document.createElement('a');
      noteLink.href = '#flushing-note';
      noteLink.textContent = ' *';
      noteLink.setAttribute('aria-label', 'Read the excluded dates note');
      name.append(noteLink);
    }

    const bars = document.createElement('div');
    bars.className = 'bars';
    bars.append(makeBar('Weekday', station.weekday, 'weekday'), makeBar('Weekend', station.weekend, 'weekend'));

    const change = document.createElement('p');
    change.className = 'change';
    const amount = document.createElement('strong');
    amount.textContent = describeChange(station.change);
    const context = document.createElement('span');
    context.textContent = 'on weekends';
    change.append(amount, document.createTextNode(' '), context);
    row.append(info, bars, change);
    chart.append(row);
  });
}

function makeBar(label, value, type) {
  const row = document.createElement('div');
  row.className = 'bar-row';
  const barLabel = document.createElement('span');
  barLabel.className = 'bar-label';
  barLabel.textContent = label;
  const track = document.createElement('div');
  track.className = 'bar-track';
  track.setAttribute('aria-hidden', 'true');
  const bar = document.createElement('div');
  bar.className = `bar ${type}`;
  bar.style.width = `${value / maxValue * 100}%`;
  track.append(bar);
  const number = document.createElement('span');
  number.className = 'bar-number';
  number.textContent = Math.round(value).toLocaleString('en-US');
  row.append(barLabel, track, number);
  return row;
}

function describeChange(change) {
  const amount = Math.round(Math.abs(change));
  if (amount === 0) return 'About the same';
  return change < 0 ? `${amount}% fewer` : `${amount}% more`;
}

weekdayButton.addEventListener('click', () => showSortedBy('weekday'));
dropButton.addEventListener('click', () => showSortedBy('drop'));
loadStations();
