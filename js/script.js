
const $ = (e) => document.querySelector(e);
const $$ = (e) => [...document.querySelectorAll(e)]; 

const $input = $('input');
const $ul = $('.autocomplete > ul');

const { data: STATIONS } = stationList;
const { data: DETAILS } = timeList;
STATIONS.sort((a, b) => a.station_nm.localeCompare(b.station_nm));
console.log(STATIONS);

/**
 * k : 공항철도
b : 분당선
a : 공항철도
g : 경춘선
s : 신분당선
su : 수인선
i : 인천 1호선
e : 용인경전철
u : 의정부경전철
 */

const STATION_LINE_NAME = {
  k: "공항철도",
  b: "분당선",
  a: "공항철도",
  g: "경춘선",
  s: "신분당선",
  su:" 수인선",
  i: "인천 1호선",
  e: "용인경전철",
  u: "의정부경전철",
}

const util = {
  findAllStations(value) {
    return STATIONS.filter(({ station_nm }) => station_nm.includes(value));
  },
  getStationDetail({ station_nm, station_cd: id }) {
    console.log(station_nm, id);
    const data = DETAILS.find(({ station_cd }) => station_cd === id);
    console.log(data);
    // const { first_time, last_time, line_num } = data;
    // const stationLineName = !isNaN(line_num) ? `${line_num}호선` : STATION_LINE_NAME[line_num];
    // console.log({ first_time, last_time, station_nm,  stationLineName });
  }
}

const events = {
  handleInputChange(e) {
    const input = e.target.value;
    if (!input.trim()) return;
    const filteredStations = util.findAllStations(input);
    $ul.innerHTML = '';
    console.log(filteredStations);
    filteredStations.forEach((station) => renderStation(station, input));
    filteredStations.forEach(util.getStationDetail);
  }
}

function renderStation({ station_nm }, input) {
  const $station = document.createElement('li');
  $station.className = 'indi-station';
  $station.innerHTML = station_nm.replace(input, `<span style="color: red">${input}</span>`);
  $ul.append($station);
}

window.onload = () => {
  $input.addEventListener('input', events.handleInputChange);
}