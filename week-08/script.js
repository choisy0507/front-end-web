// Store five scent notes in an array of objects.

const scentNotes = [
  {
    name: 'Rose',
    summary:
      'A floral note that can range from fresh and green to rich and slightly sweet.',
    scentReference:
      'The scent of fresh garden roses, including their petals and stems.',
    connects: ['Green', 'Sweet'],
    color: '#D4A7AD',
  },
  {
    name: 'Iris',
    summary:
      'A soft, powdery floral note with violet-like and slightly woody qualities. In perfumery, it is associated with orris root.',
    scentReference: 'Fine cosmetic face powder with a faint violet-like scent.',
    connects: ['Powdery', 'Dry'],
    color: '#C7BECE',
  },
  {
    name: 'Vanilla',
    summary:
      'A warm, sweet note with smooth, creamy and sometimes slightly woody qualities.',
    scentReference:
      'The aroma of a split vanilla bean or pure vanilla extract.',
    connects: ['Sweet', 'Creamy', 'Warm'],
    color: '#D9B98F',
  },
  {
    name: 'Musk',
    summary:
      'A skin-like note that can range from clean and powdery to warm and animalic, depending on the type of musk.',
    scentReference:
      'Clean cotton-scented products or the subtle warmth of skin, depending on the musk used.',
    connects: ['Clean', 'Soapy', 'Powdery', 'Warm'],
    color: '#C3CBD0',
  },
  {
    name: 'Cedarwood',
    summary: 'A dry, clean woody note with a distinct pencil-shaving quality.',
    scentReference:
      'Freshly sharpened cedar pencils or natural cedarwood blocks.',
    connects: ['Dry'],
    color: '#CBBFB6',
  },
];

// Select HTML elements.

const cardList = document.getElementById('card-list');
const revealAllButton = document.getElementById('reveal-all');
const hideAllButton = document.getElementById('hide-all');

const cards = [];

// Create HTML elements.

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

// Create a card with a front and back.

function createCard(note) {
  const card = createElement('button', 'note-card');
  card.type = 'button';
  card.style.setProperty('--accent', note.color);
  card.setAttribute('aria-pressed', 'false');

  const inner = createElement('span', 'card-inner');

  // Front
  const front = createElement('span', 'card-face card-front');
  front.setAttribute('aria-hidden', 'false');

  const frontCenter = createElement('span', 'front-center');

  const orb = createElement('span', 'note-orb');
  orb.setAttribute('aria-hidden', 'true');

  const name = createElement('span', 'note-name', note.name);

  frontCenter.append(orb, name);
  front.appendChild(frontCenter);

  // Back
  const back = createElement('span', 'card-face card-back');
  back.setAttribute('aria-hidden', 'true');

  const backTitle = createElement('span', 'back-title', note.name);

  const summary = createElement('span', 'back-summary', note.summary);

  const referenceLabel = createElement(
    'span',
    'back-section-label',
    'SCENT REFERENCE',
  );

  const reference = createElement(
    'span',
    'back-reference',
    note.scentReference,
  );

  const descriptorLabel = createElement(
    'span',
    'back-section-label',
    'RELATED DESCRIPTORS',
  );

  const descriptorList = createElement('span', 'descriptor-list');

  note.connects.forEach(function (descriptor) {
    const tag = createElement('span', 'descriptor-tag', descriptor);

    descriptorList.appendChild(tag);
  });

  back.append(
    backTitle,
    summary,
    referenceLabel,
    reference,
    descriptorLabel,
    descriptorList,
  );

  inner.append(front, back);
  card.appendChild(inner);

  // Flip when clicked.
  card.addEventListener('click', function () {
    const isFlipped = card.classList.contains('is-flipped');
    setCardFlipped(card, !isFlipped);
  });

  return card;
}

// Change the card state

function setCardFlipped(card, flipped) {
  card.classList.toggle('is-flipped', flipped);
  card.setAttribute('aria-pressed', String(flipped));

  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');

  front.setAttribute('aria-hidden', String(flipped));
  back.setAttribute('aria-hidden', String(!flipped));
}

// Generate cards using the array

scentNotes.forEach(function (note) {
  const card = createCard(note);

  cards.push(card);
  cardList.appendChild(card);
});

// Reveal all cards.

revealAllButton.addEventListener('click', function () {
  cards.forEach(function (card) {
    setCardFlipped(card, true);
  });
});

// Hide all cards

hideAllButton.addEventListener('click', function () {
  cards.forEach(function (card) {
    setCardFlipped(card, false);
  });
});
