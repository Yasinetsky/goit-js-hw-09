import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const timeUpdateThrottled = throttle(saveCurrentTime, 1000);

player.on('timeupdate', timeUpdateThrottled);

function saveCurrentTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player.setCurrentTime(savedTime);
}
