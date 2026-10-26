let leftDoor = document.getElementById('left-door');
let rightDoor = document.getElementById('right-door');

let leftOpen = false;
let rightOpen = false;

function updateDoors() {
  if (leftOpen) {
    leftDoor.classList.add('open');
    leftDoor.setAttribute('aria-expanded', 'true');
    leftDoor.setAttribute('aria-label', 'Close left door');
  } else {
    leftDoor.classList.remove('open');
    leftDoor.setAttribute('aria-expanded', 'false');
    leftDoor.setAttribute('aria-label', 'Open left door');
  }

  if (rightOpen) {
    rightDoor.classList.add('open');
    rightDoor.setAttribute('aria-expanded', 'true');
    rightDoor.setAttribute('aria-label', 'Close right door');
  } else {
    rightDoor.classList.remove('open');
    rightDoor.setAttribute('aria-expanded', 'false');
    rightDoor.setAttribute('aria-label', 'Open right door');
  }
}

leftDoor.addEventListener('click', function () {
  leftOpen = !leftOpen;
  updateDoors();
});

rightDoor.addEventListener('click', function () {
  rightOpen = !rightOpen;
  updateDoors();
});
