const rarities = require('./rarities.json');
const names = require('./names.json');
const modes = require('./modes.json');

const RARITIES = ['None', 'Rare', 'Epic', 'Legendary'];

function getTalentName(talent) {
  if (talent == 'NoTalent') {
    return 'No Talent';
  }

  switch (talent.slice(talent.length - 7 - 1, talent.length - 1)) {
    case 'TalentA':
    case 'TalentB':
    case 'TalentC':
      if (Object.keys(names).includes(talent)) {
        return names[talent];
      } else {
        return 'unknown';
      }
    default:
      return talent.substring(talent.lastIndexOf('_') + 1, talent.length - 1) // snake case to words
               .replace(/([A-Z])/g, (s) => ' ' + s.toLowerCase())
               .split(' ') // capitalize first letter
               .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
               .join(' ');
  }
}

function getTalentRarity(talent) {
  if (!talent || talent == 'NoTalent') {
    return 'None';
  }

  switch (talent.slice(talent.length - 7 - 1, talent.length - 1)) {
    case 'TalentA': return 'Rare';
    case 'TalentB': return 'Epic';
    case 'TalentC': return 'Legendary';
    default:
      if (Object.keys(rarities).includes(talent)) {
        return rarities[talent];
      } else {
        return 'unknown';
      }
  }
}

function getMaxLevel(entry) {
  switch (getTalentRarity(entry.Talent)) {
    case 'unknown':
    case 'None': return -1;
    case 'Rare': return 20;
    case 'Epic': return 10;
    case 'Legendary': return 5;
  }
};

function getScaledLevel(entry) {
  if (['unknown', 'None'].includes(getTalentRarity(entry.Talent))) {
    return 0;
  }
  return entry.Level / getMaxLevel(entry);
};

function getHero(actor) {
  return actor.substring(1, actor.length - 1);
}

function getMode(mode) {
  return modes[mode];
}

function hasTalents(mode) {
  return ['blitz_pvp_ranked', 'casual_aral'].includes(mode);
}

function playersPerMatch(mode) {
  return mode.includes('5v5')? 10 : 6;
}

module.exports = {
  RARITIES,
  getTalentName,
  getTalentRarity,
  getMaxLevel,
  getScaledLevel,
  getHero,
  getMode,
  hasTalents,
  playersPerMatch,
};
