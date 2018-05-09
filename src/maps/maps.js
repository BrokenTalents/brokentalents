const rarities = require('./rarities.json');

function getTalentRarity(talent) {
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

function getHero(actor) {
  return actor.substring(1, actor.length - 1);
}

module.exports = {
  getTalentRarity,
  getHero,
};
