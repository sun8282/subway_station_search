
const $ = (e) => document.querySelector(e);
const $$ = (e) => [...document.querySelectorAll(e)]; 

const $input = $('input');
const $ul = $('.autocomplete > ul');

const { data: STATIONS } = stationList;
console.log(STATIONS);


const util = {
  findAllStations(value) {
    return STATIONS.filter(({ station_nm }) => station_nm.includes(value));
  }
}

const event = {
  handleInputChange(e) {
    const input = e.target.value;
    if (!input.trim()) return;
    const filteredStations = util.findAllStations(input);
    $ul.innerHTML = '';
    console.log(filteredStations);
    filteredStations.forEach(station => renderStation(station));
  }
}

$input.addEventListener('input', event.handleInputChange);

function renderStation(station) {
  const $station = document.createElement('li');
  $station.className = 'indi-station';
  // change each character to span and give class of red
  $station.innerHTML = station.station_nm;
  $ul.append($station);
}
