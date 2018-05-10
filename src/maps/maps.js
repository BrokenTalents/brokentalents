const rarities = require('./rarities.json');

function getTalentName(talent) {
  if (talent == 'NoTalent' || talent == '' || talent == undefined) {
    return 'No Talent';
  }

  return talent.substring(talent.lastIndexOf('_') + 1, talent.length - 1) // snake case to words
               .replace(/([A-Z])/g, (s) => ' ' + s.toLowerCase())
               .split(' ') // capitalize first letter
               .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
               .join(' ');
}

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
  getTalentName,
  getTalentRarity,
  getHero,
};
