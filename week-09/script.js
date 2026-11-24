// Definitions and note connections from the few-mid project
const descriptors = {
  "Citrusy": "A fresh, zesty scent resembling citrus fruits, especially their peels. It can range from sharp and sour to sweet or slightly bitter.",
  "Green": "A scent resembling fresh leaves, grass, or plant stems. It can feel crisp and freshly cut or slightly bitter and grassy.",
  "Fruity": "A scent resembling fresh or ripe fruit. It can range from crisp and tart, like green apples, to juicy and sweet, like peaches or berries.",
  "Herbal": "A scent resembling aromatic herbs such as mint, lavender, or rosemary. It can be fresh, cooling, slightly bitter, or medicinal.",
  "Clean": "An impression of freshness or cleanliness, often associated with freshly washed skin or laundry. It can be light and airy or soft and subtle, without necessarily smelling like soap.",
  "Soapy": "A scent resembling scented soap or freshly washed skin. It often combines clean floral, citrus, or soft musky qualities.",
  "Creamy": "A smooth, rounded scent with a soft, rich quality. It can feel milky or buttery and may appear in sweet, floral, or woody scents.",
  "Powdery": "A soft, dry scent resembling fine cosmetic powder or talcum powder. It can have floral, musky, or slightly sweet qualities.",
  "Dry": "A scent with little sense of juiciness or moisture. It often has woody, papery, or dusty qualities and may feel less sweet or less creamy.",
  "Sweet": "A scent resembling sugar, honey, vanilla, or naturally sweet flowers. It can range from light sweetness to rich, syrupy sweetness.",
  "Warm": "A rich, rounded scent that creates a sense of warmth rather than a literal temperature. It often appears with vanilla, spices, resins, or soft woods.",
  "Spicy": "A scent resembling aromatic spices. It can be warm and sweet, like cinnamon, or sharp and peppery, like black pepper.",
  "Roasted": "A scent resembling roasted coffee beans, toasted nuts, or browned cocoa. It can be warm, nutty, slightly bitter, or lightly smoky.",
  "Earthy": "A scent resembling soil, roots, or the forest floor. It can range from damp and moss-like to dry, woody, or dusty.",
  "Resinous": "A scent resembling aromatic resins from trees or plants. It can range from warm, sweet, and balsamic to dry, woody, or slightly pine-like."
};

const notes = {
  "Lemon": ["Citrusy"],
  "Bergamot": ["Citrusy"],
  "Mint": ["Green", "Herbal"],
  "Green Apple": ["Fruity"],
  "Rose": ["Green", "Sweet"],
  "Jasmine": ["Sweet"],
  "Iris": ["Powdery", "Dry"],
  "Musk": ["Clean", "Soapy", "Powdery", "Warm"],
  "Orange Blossom": ["Sweet"],
  "Vanilla": ["Sweet", "Creamy", "Warm"],
  "Cinnamon": ["Spicy", "Warm", "Sweet"],
  "Labdanum": ["Resinous", "Warm", "Sweet"],
  "Frankincense": ["Resinous", "Dry"],
  "Caramel": ["Sweet", "Warm"],
  "Cocoa": ["Roasted", "Dry"],
  "Coffee": ["Roasted"],
  "Oakmoss": ["Earthy", "Dry"],
  "Patchouli": ["Earthy"],
  "Cedarwood": ["Dry"],
  "Sandalwood": ["Creamy", "Warm"],
  "Vetiver": ["Earthy", "Dry"],
  "Lavender": ["Herbal", "Clean"],
  "Coumarin": ["Sweet", "Dry"],
};

// Each pair has its own difference, examples, and relationship.
const comparisons = [
  {
    words: ['Powdery', 'Soapy'],
    difference: 'Powdery evokes a fine, dry texture; Soapy evokes the recognizable smell of soap.',
    examples: ['Cosmetic face powder', 'A lathered soap bar'],
    type: 'overlap',
    relation: 'A soft musky scent can feel powdery and soapy at once. The powder-like texture and soap association remain distinct.'
  },
  {
    words: ['Soapy', 'Clean'],
    difference: 'Soapy is a specific soap-like scent; Clean is a broader impression of freshness.',
    examples: ['Scented soap', 'Freshly washed laundry'],
    type: 'broad', broad: 'Clean', specific: 'Soapy',
    relation: 'A soap-like scent can be one way to suggest cleanliness. A clean impression does not have to smell like soap.'
  },
  {
    words: ['Green', 'Herbal'],
    difference: 'Green evokes fresh leaves, grass, and stems; Herbal evokes aromatic herbs.',
    examples: ['Freshly cut grass', 'Crushed mint leaves'],
    type: 'overlap',
    relation: 'A plant-like scent can be green and herbal together. Mint connects leafy freshness with an aromatic herb character.'
  },
  {
    words: ['Sweet', 'Creamy'],
    difference: 'Sweet evokes sugar-like sweetness; Creamy evokes smooth, milky richness.',
    examples: ['Honey or sugar syrup', 'Fresh cream'],
    type: 'overlap',
    relation: 'Sweetness and creaminess can meet in one scent, as in vanilla. Creamy describes a rounded texture; it does not always mean sweet.'
  },
  {
    words: ['Citrusy', 'Fruity'],
    difference: 'Citrusy focuses on zesty citrus peel; Fruity evokes other recognizable fruit aromas.',
    examples: ['Freshly peeled lemon', 'Sliced green apple'],
    type: 'contrast', context: 'Fruit associations',
    relation: 'Two ways to imagine fruit: the zest of citrus peel and the crisp or juicy character of other fruit. Their meanings can overlap; this guide lists separate note examples.'
  },
  {
    words: ['Green', 'Earthy'],
    difference: 'Green evokes fresh vegetation; Earthy evokes soil, roots, and the forest floor.',
    examples: ['Crushed green leaves', 'Damp forest soil'],
    type: 'contrast', context: 'Nature associations',
    relation: 'Both evoke nature, but point in different directions: fresh growth above the ground and the soil or roots beneath it.'
  },
  {
    words: ['Dry', 'Powdery'],
    difference: 'Dry suggests little moisture, often woody or papery; Powdery evokes fine cosmetic powder.',
    examples: ['Cedar pencil shavings', 'Face powder'],
    type: 'broad', broad: 'Dry', specific: 'Powdery',
    relation: 'Powdery gives a dry impression a particular soft, cosmetic texture. A dry scent may instead feel woody or papery, without smelling powdery.'
  },
  {
    words: ['Warm', 'Spicy'],
    difference: 'Warm is an enveloping feeling; Spicy is a recognizable spice character.',
    examples: ['A vanilla bean', 'A freshly broken cinnamon stick'],
    type: 'qualities', dimensions: { Warm: 'Feeling', Spicy: 'Character' },
    relation: 'Warmth describes how a scent feels; spice describes what it evokes. Cinnamon can express both, but spices can also feel sharp or peppery.'
  },
  {
    words: ['Resinous', 'Warm'],
    difference: 'Resinous evokes aromatic plant resins; Warm describes a broader enveloping impression.',
    examples: ['Frankincense resin', 'A vanilla bean'],
    type: 'qualities', dimensions: { Resinous: 'Character', Warm: 'Feeling' },
    relation: 'Resin character and a warm feeling can coexist, as in labdanum. Resinous scents can also be dry or pine-like, so resinous does not always mean warm.'
  }
];

// Short sensory cues for the abstract forms.
const sensations = {
  Powdery: { cues: ['Fine', 'Dry', 'Soft'], phrase: 'A cloud of delicate powder.' },
  Soapy: { cues: ['Lathered', 'Floral', 'Musky'], phrase: 'The familiar scent of soap.' },
  Clean: { cues: ['Fresh', 'Airy', 'Light'], phrase: 'A clear, freshly washed impression.' },
  Green: { cues: ['Leafy', 'Crisp', 'Fresh-cut'], phrase: 'The green edge of a cut stem.' },
  Herbal: { cues: ['Aromatic', 'Leafy', 'Cooling'], phrase: 'Herbs releasing their aroma.' },
  Sweet: { cues: ['Sugary', 'Honeyed', 'Syrupy'], phrase: 'A familiar touch of sweetness.' },
  Creamy: { cues: ['Smooth', 'Milky', 'Rounded'], phrase: 'Soft richness that seems to flow.' },
  Citrusy: { cues: ['Zesty', 'Bright', 'Sharp'], phrase: 'A bright twist of citrus peel.' },
  Fruity: { cues: ['Juicy', 'Crisp', 'Ripe'], phrase: 'The recognizable aroma of cut fruit.' },
  Earthy: { cues: ['Soil-like', 'Rooted', 'Mossy'], phrase: 'The shaded floor of a forest.' },
  Dry: { cues: ['Papery', 'Woody', 'Low-moisture'], phrase: 'A dry, lightly rough impression.' },
  Warm: { cues: ['Enveloping', 'Rounded', 'Soft'], phrase: 'A feeling of warmth, not temperature.' },
  Spicy: { cues: ['Aromatic', 'Sharp', 'Peppery'], phrase: 'The distinct character of a spice.' },
  Resinous: { cues: ['Balsamic', 'Woody', 'Pine-like'], phrase: 'The aromatic character of plant resin.' }
};

// Descriptor colors
const colors = {
  Citrusy: '#dccb81', Green: '#a8bba0', Fruity: '#daa599', Herbal: '#afc6b9',
  Clean: '#c8dde2', Soapy: '#c8d3dd', Creamy: '#dfcdb5', Powdery: '#d4b4c9',
  Dry: '#cbbfb6', Sweet: '#d4a7ad', Warm: '#d9b98f', Spicy: '#c8957d',
  Roasted: '#b9a18e', Earthy: '#b7b49b', Resinous: '#c7b080'
};
const form = document.getElementById('compare-form');
const compareButton = document.getElementById('compare-button');
const result = document.getElementById('result');
const status = document.getElementById('selection-status');
let first = '';
let second = '';

function findComparison(a, b) {
  return comparisons.find(function (pair) {
    return (pair.words[0] === a && pair.words[1] === b) ||
      (pair.words[0] === b && pair.words[1] === a);
  });
}

// Create the two groups of radio buttons
function createOptions(containerId, group) {
  const container = document.getElementById(containerId);
  Object.keys(descriptors).forEach(function (name) {
    const label = document.createElement('label');
    label.className = 'descriptor-option';
    label.style.setProperty('--accent', colors[name]);
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = group;
    input.value = name;
    input.disabled = group === 'second' || name === 'Roasted';
    const card = document.createElement('span');
    card.className = 'option-card';
    card.innerHTML = `
      <span class="mini-orb" aria-hidden="true"></span>
      <span>${name}</span>
    `;
    label.append(input, card);
    container.appendChild(label);
  });
}

function updateOptions() {
  document.querySelectorAll('input[name="second"]').forEach(function (input) {
    input.disabled = !findComparison(first, input.value);
    input.checked = input.value === second;
  });
  compareButton.disabled = !findComparison(first, second);
}

form.addEventListener('change', function (event) {
  const input = event.target;
  if (input.name === 'first') {
    first = input.value;
    second = '';
    document.getElementById('second-help').textContent = 'Choose a highlighted word to compare with ' + first + '.';
    status.textContent = first + ' selected. Choose a word in step 02.';
  } else if (input.name === 'second') {
    second = input.value;
    status.textContent = first + ' + ' + second + '. Ready to compare.';
  }
  result.hidden = true;
  updateOptions();
});

// Simple SVG shapes; colors distinguish descriptors, not intensity.
function drawScent(name) {
  let shapes = '';
  if (name === 'Powdery') {
    for (let i = 0; i < 64; i++) {
      const x = 62 + (i * 37) % 196;
      const y = 25 + (i * 29) % 126;
      shapes += `<circle cx="${x}" cy="${y}" r="${1 + i % 3}" opacity="${0.25 + (i % 4) * 0.15}"/>`;
    }
  } else if (name === 'Soapy') {
    shapes = '<g class="bubbles"><circle cx="124" cy="91" r="48"/><circle cx="193" cy="65" r="37"/><circle cx="204" cy="127" r="27"/><circle cx="77" cy="48" r="16"/><path d="M91 78 Q94 55 115 52 M170 54 Q178 38 193 39" class="shine"/></g>';
  } else if (name === 'Clean') {
    shapes = '<ellipse class="clear-air" cx="160" cy="90" rx="105" ry="60"/><g class="air-lines"><path d="M62 108 Q149 57 258 79"/><path d="M75 131 Q159 87 244 100"/><path d="M89 65 Q155 35 229 54"/></g>';
  } else if (name === 'Green') {
    shapes = '<g class="plant-lines"><path d="M109 151 Q130 92 103 31 M151 153 Q151 94 182 25 M194 153 Q183 107 225 62"/><path d="M122 112 Q76 97 82 68 Q116 73 122 112 M157 103 Q194 89 201 58 Q166 62 157 103 M196 123 Q226 114 241 87"/></g>';
  } else if (name === 'Herbal') {
    shapes = '<g class="herb-leaves"><path d="M158 151 Q151 93 161 35" class="stem"/><path d="M157 115 Q102 129 100 87 Q135 78 157 115 M157 114 Q202 120 213 78 Q179 71 157 114 M155 83 Q112 89 117 50 Q148 46 155 83 M158 80 Q195 85 201 44 Q168 41 158 80 M162 52 Q141 26 163 12 Q184 28 162 52"/></g>';
  } else if (name === 'Sweet') {
    shapes = '<g class="rounded-forms"><path d="M84 112 C50 72 98 31 144 52 C184 11 244 53 224 97 C245 147 180 163 148 143 C116 158 89 144 84 112Z"/><ellipse cx="121" cy="76" rx="25" ry="13" class="shine"/></g>';
  } else if (name === 'Creamy') {
    shapes = '<g class="cream-layers"><path d="M53 94 C107 27 165 135 258 58 L268 92 C172 166 111 60 53 120Z"/><path d="M61 116 C116 61 176 160 262 95 L258 127 C171 181 118 95 72 141Z"/><path d="M63 75 C122 17 177 108 248 44" class="cream-line"/></g>';
  } else if (name === 'Citrusy') {
    for (let i = 0; i < 13; i++) {
      shapes += `<path d="M164 95 L256 95" transform="rotate(${i * 27.7} 160 90)"/>`;
    }
    shapes = '<g class="zest-lines">' + shapes + '<path d="M70 99 Q71 28 151 19"/></g>';
  } else if (name === 'Fruity') {
    shapes = '<g class="fruit-forms"><ellipse cx="122" cy="94" rx="53" ry="58"/><ellipse cx="191" cy="102" rx="56" ry="50"/><ellipse cx="206" cy="43" rx="25" ry="17"/><path d="M92 75 Q94 57 112 53 M165 90 Q175 71 191 72" class="shine"/></g>';
  } else if (name === 'Earthy') {
    shapes = '<g class="soil-layers"><path d="M48 67 Q108 44 161 66 T272 63 L272 90 Q211 103 157 85 T48 93Z"/><path d="M48 99 Q105 80 159 99 T272 96 L272 121 Q206 140 155 121 T48 127Z"/><path d="M48 134 Q103 116 159 135 T272 130 L272 151 L48 151Z"/></g>';
    for (let i = 0; i < 45; i++) {
      shapes += `<circle cx="${54 + (i * 31) % 211}" cy="${67 + (i * 19) % 80}" r="1" opacity=".6"/>`;
    }
  } else if (name === 'Dry') {
    for (let i = 0; i < 10; i++) {
      shapes += `<path d="M${56 + i % 3 * 9} ${40 + i * 11} l42 -5 l27 4 l39 -8 l36 4 l46 -7"/>`;
    }
    shapes = '<g class="paper-lines">' + shapes + '</g>';
  } else if (name === 'Warm') {
    shapes = '<g class="warm-glow"><ellipse cx="160" cy="90" rx="91" ry="60"/><ellipse cx="160" cy="90" rx="65" ry="42"/><ellipse cx="160" cy="90" rx="34" ry="25"/></g>';
  } else if (name === 'Spicy') {
    shapes = '<g class="spice-accents"><path d="M89 51 l13 24 l-26 10Z M164 30 l7 29 l-21 -12Z M213 77 l25 -12 l-8 29Z M130 109 l20 12 l-26 20Z M190 121 l12 28 l-26 -8Z"/><path d="M66 117 l15 -8 M214 39 l10 -10 M242 127 l12 8"/></g>';
  } else if (name === 'Resinous') {
    shapes = '<g class="resin-drops"><path d="M120 30 C122 54 153 72 151 105 C148 145 92 149 87 110 C83 82 109 55 120 30Z"/><path d="M203 60 C209 80 232 98 229 122 C225 151 186 150 182 124 C178 101 197 81 203 60Z"/><path d="M104 102 Q101 83 115 66" class="shine"/></g>';
  }
  return `<svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">${shapes}</svg>`;
}

function renderDescriptor(id, name, example) {
  const panel = document.getElementById(id);
  const scent = sensations[name];
  panel.style.setProperty('--accent', colors[name]);
  panel.innerHTML = `
    <h3>${name}</h3>
    <div class="scent-visual ${name.toLowerCase()}">${drawScent(name)}</div>
    <ul class="sensory-cues"></ul>
    <p class="sensory-phrase">${scent.phrase}</p>
    <div class="imagine"><h4>Imagine this</h4><p>${example}</p></div>
    <details><summary>More details</summary><p>${descriptors[name]}</p></details>
  `;
  scent.cues.forEach(function (cue) {
    const item = document.createElement('li');
    item.textContent = cue;
    panel.querySelector('ul').appendChild(item);
  });
}

function renderConnection(pair) {
  const diagram = document.getElementById('relation-diagram');
  diagram.className = 'relation-diagram ' + pair.type;
  diagram.style.setProperty('--color-a', colors[first]);
  diagram.style.setProperty('--color-b', colors[second]);
  const a = `<span class="diagram-word word-a">${first}</span>`;
  const b = `<span class="diagram-word word-b">${second}</span>`;
  if (pair.type === 'overlap') {
    document.getElementById('relation-type').textContent = 'Overlap';
    diagram.innerHTML = `${a}<span class="diagram-link">can coexist</span>${b}`;
  } else if (pair.type === 'broad') {
    document.getElementById('relation-type').textContent = 'Broad vs. Specific';
    diagram.style.setProperty('--broad-color', colors[pair.broad]);
    diagram.style.setProperty('--specific-color', colors[pair.specific]);
    diagram.innerHTML = `<div class="broad-frame"><span>${pair.broad}</span><small>one possible expression</small><span class="specific-word">${pair.specific}</span></div>`;
  } else if (pair.type === 'contrast') {
    document.getElementById('relation-type').textContent = 'Contrast';
    diagram.innerHTML = `${a}<span class="contrast-link">←<small>${pair.context}</small>→</span>${b}`;
  } else {
    document.getElementById('relation-type').textContent = 'Different Qualities';
    diagram.innerHTML = `<div class="quality-row"><small>${pair.dimensions[first]}</small>${a}</div><span class="quality-plus">+</span><div class="quality-row"><small>${pair.dimensions[second]}</small>${b}</div>`;
  }
  document.getElementById('relation-copy').textContent = pair.relation;
  const shared = Object.keys(notes).filter(function (name) {
    return notes[name].includes(first) && notes[name].includes(second);
  });
  const previousShared = document.getElementById('shared-notes');
  if (previousShared) {
    previousShared.remove();
  }
  if (shared.length > 0) {
    const sharedText = document.createElement('p');
    sharedText.id = 'shared-notes';
    sharedText.textContent = 'Shared note: ' + shared.join(', ');
    document.querySelector('.connection-copy').appendChild(sharedText);
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const pair = findComparison(first, second);
  if (!pair) {
    status.textContent = 'Choose a descriptor in each step before comparing.';
    return;
  }
  renderDescriptor('detail-a', first, pair.examples[pair.words.indexOf(first)]);
  renderDescriptor('detail-b', second, pair.examples[pair.words.indexOf(second)]);
  document.getElementById('difference-summary').textContent = pair.difference;
  renderConnection(pair);
  document.getElementById('result-heading').textContent = first + ' & ' + second;
  result.hidden = false;
  status.textContent = first + ' + ' + second + '. Comparison below.';
  document.getElementById('result-heading').focus();
});

document.getElementById('back-button').addEventListener('click', function () {
  result.hidden = true;
  status.textContent = 'Choose another comparison for ' + first + ', or change your starting point.';
  document.querySelector('input[name="second"]:checked').focus();
});

form.addEventListener('reset', function () {
  first = '';
  second = '';
  result.hidden = true;
  document.getElementById('second-help').textContent = 'Choose a word in step 01 first.';
  status.textContent = 'Selections cleared. Start with a descriptor in step 01.';
  document.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.checked = false;
  });
  updateOptions();
  document.querySelector('input[name="first"]').focus();
});

createOptions('first-options', 'first');
createOptions('second-options', 'second');
updateOptions();
