const radarText = ['Air drop', 'Crates', 'Items', 'Throwable', 'Damage'];
const radarText2 = ['called', 'looted', 'looted', 'used', 'taken'];
const radarTextOposite = ['Damage', 'Top 10', 'Position', 'Time', 'Heal'];
const radarTextOposite2 = ['dealt', 'players', 'per game', 'survived', 'recieved'];

interface RadarValue { label: string, value: number }

const getPercentagePlayerAttributes = (radarData: Array<RadarValue>) => {
  let attributes = {
    survivor: 0,
    offensive: 0,
    strategic: 0,
  };
  radarData.forEach((item) => {
    switch (item.label) {
      case 'top10':
      case 'averagePosition':
      case 'averageHealed':
        attributes = {
          ...attributes,
          survivor: attributes.survivor + item.value,
        };
        break;
      case 'averageDamageDealt':
      case 'averageDamageTaken':
      case 'averageThrowablesThrown':
        attributes = {
          ...attributes,
          offensive: attributes.survivor + item.value,
        };
        break;
      case 'totalAirDropsCalled':
      case 'averageEnemyCratesLooted':
      case 'averageUniqueItemsLooted':
        attributes = {
          ...attributes,
          strategic: attributes.survivor + item.value,
        };
        break;
      default:
        break;
    }
  });
  const percentageAttributes = [{
    label: 'Survivor',
    value: Math.round((
      (attributes.survivor * 100)
      / (attributes.survivor + attributes.offensive + attributes.strategic)) * 100) / 100,
  },
  {
    label: 'Offensive',
    value: Math.round((
      (attributes.offensive * 100)
      / (attributes.survivor + attributes.offensive + attributes.strategic)) * 100) / 100,
  },
  {
    label: 'Strategic',
    value: Math.round((
      (attributes.strategic * 100)
      / (attributes.survivor + attributes.offensive + attributes.strategic)) * 100) / 100,
  }];
  return percentageAttributes.sort((a, b) => b.value - a.value);
};

export {
  radarText,
  radarText2,
  radarTextOposite,
  radarTextOposite2,
  getPercentagePlayerAttributes,
};
