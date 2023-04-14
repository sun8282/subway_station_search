
const $ = (e) => document.querySelector(e);
const $$ = (e) => [...document.querySelectorAll(e)]; 

const $input = $('input');
const $ul = $('.autocomplete > ul');
const $form = $('form');
const $result = $('.result');

const { data: STATIONS } = stationList;
const { data: DETAILS } = timeList;
STATIONS.sort((a, b) => a.station_nm.localeCompare(b.station_nm));

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
    return STATIONS.filter(({ station_nm }) => station_nm.includes(value)).slice(0, 10);
  },
  getStationDetail({ station_nm, station_cd: id }) {
    console.log(station_nm, id);
    const station = DETAILS.find(({ station_cd }) => station_cd === id);
    return {...station, station_nm}
  }
}

const state = {
  stations: [],
  clearStations() {
    this.stations = [];
  }
}

const events = {
  handleInputChange(e) {
    const input = e.target.value;
    if (!input.trim()) {
      $ul.innerHTML = '';
      return;
    }
    state.clearStations();
    const filteredStations = util.findAllStations(input);
    $ul.innerHTML = '';
    console.log(filteredStations);
    filteredStations.forEach((station) => renderStation(station, input));
    filteredStations.forEach((station) => {
      const stationDetails = util.getStationDetail(station);
      state.stations.push(stationDetails);
    }); 
  },
  handleFormSubmit(e) {
    $result.innerHTML = '';
    state.stations.forEach(renderStationDetails);
  }
}

function renderStation({ station_nm }, input) {
  const $station = document.createElement('li');
  $station.className = 'indi-station';
  $station.innerHTML = station_nm.replace(input, `<span style="color: red">${input}</span>`);
  $ul.append($station);
}

function renderStationDetails({ station_nm, first_time, last_time, line_num }) {
  const $output = document.createElement('div');
  const stationLineName = !isNaN(line_num) ? `${line_num}호선` : STATION_LINE_NAME[line_num];
  $output.innerHTML = `
    <span>${station_nm}</span> <span>${stationLineName}</span> <span>${first_time}</span> <span>${last_time}</span>
  `;
  console.log({ stationLineName, station_nm, first_time, last_time });
  $result.append($output);
}

window.onload = () => {
  $input.addEventListener('input', events.handleInputChange);
  $form.addEventListener('submit', events.handleFormSubmit);
}