/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Dimensions, View, Text as RNText } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Svg, {
  Circle, G, Line, Polygon, Text, TSpan,
} from 'react-native-svg';

import {
  getPercentagePlayerAttributes,
  radarText, radarText2, radarTextOposite, radarTextOposite2,
} from './radarUtils';

const { width } = Dimensions.get('screen');

interface RadarValue { label: string, value: number }

function RadarGraph({ maxSurvivalMasteries, playerSurvivalMastery }: { maxSurvivalMasteries: any, playerSurvivalMastery: any }) {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState<boolean>(false);
  const [radarData, setRadarData] = useState<Array<RadarValue> | null>(null);
  const [playerAttributes, setPlayerAttributes] = useState<Array<{ label: string, value: number }> | null>(null);

  useEffect(() => {
    if (playerSurvivalMastery !== null && maxSurvivalMasteries !== null) {
      setRadarData([
        {
          label: 'totalAirDropsCalled',
          value:
            (100 * playerSurvivalMastery.attributes.stats.airDropsCalled.total)
            / maxSurvivalMasteries.totalAirDropsCalled,
        },
        {
          label: 'averageEnemyCratesLooted',
          value:
            (100 * playerSurvivalMastery.attributes.stats.enemyCratesLooted.average)
            / maxSurvivalMasteries.averageEnemyCratesLooted,
        },
        {
          label: 'averageUniqueItemsLooted',
          value:
            (100 * playerSurvivalMastery.attributes.stats.uniqueItemsLooted.average)
            / maxSurvivalMasteries.averageUniqueItemsLooted,
        },
        {
          label: 'averageThrowablesThrown',
          value:
            (100 * playerSurvivalMastery.attributes.stats.throwablesThrown.average)
            / maxSurvivalMasteries.averageThrowablesThrown,
        },
        {
          label: 'averageDamageTaken',
          value:
            (100 * playerSurvivalMastery.attributes.stats.damageTaken.average)
            / maxSurvivalMasteries.averageDamageTaken,
        },
        {
          label: 'averageDamageDealt',
          value:
            (100 * playerSurvivalMastery.attributes.stats.damageDealt.average)
            / maxSurvivalMasteries.averageDamageDealt,
        },
        {
          label: 'top10',
          value:
            (100 * playerSurvivalMastery.attributes.stats.top10.total)
            / maxSurvivalMasteries.top10,
        },
        {
          label: 'averagePosition',
          value:
            (100 * playerSurvivalMastery.attributes.stats.position.average)
            / maxSurvivalMasteries.averagePosition,
        },
        {
          label: 'averageTimeSurvived',
          value:
            (100 * playerSurvivalMastery.attributes.stats.timeSurvived.average)
            / maxSurvivalMasteries.averageTimeSurvived,
        },
        {
          label: 'averageHealed',
          value:
            (100 * playerSurvivalMastery.attributes.stats.healed.average)
            / maxSurvivalMasteries.averageHealed,
        },
      ]);
    }
  }, [playerSurvivalMastery, maxSurvivalMasteries]);

  useEffect(() => {
    if (radarData !== null) {
      const sortedPercentageAttributes = getPercentagePlayerAttributes(radarData);
      setPlayerAttributes(sortedPercentageAttributes);
    }
  }, [radarData]);

  const degToRadians = (deg: number) => (deg * Math.PI) / 180.0;
  const calculateEdgePoint = (center: number, radius: number, degree: number) => {
    const degreeInRadians = degToRadians(degree);
    return [
      center + Math.cos(degreeInRadians) * radius,
      center + Math.sin(degreeInRadians) * radius,
    ];
  };

  const viewBoxCenterX = 140;
  const viewBoxCenterY = 150;
  const radius = 100;

  const polygonOnClick = () => {
    setIsTooltipDisplayed(!isTooltipDisplayed);
  };

  const renderTooltipPoligon = () => {
  };

  const renderLineDotsText = () => {
    let current = -1;
    return (
      <>
        {
          [0, 1, 2, 3, 4].map((i) => {
            current += 1;
            return (
              <>
                <Line
                  key={`crosshair_${i}`}
                  x1={calculateEdgePoint(viewBoxCenterX, radius - 25, i * 36)[0]}
                  y1={calculateEdgePoint(viewBoxCenterY, radius - 25, i * 36)[1]}
                  x2={calculateEdgePoint(viewBoxCenterX, radius - 25, i * 36 + 180)[0]}
                  y2={calculateEdgePoint(viewBoxCenterY, radius - 25, i * 36 + 180)[1]}
                  stroke="white"
                  strokeOpacity="0.2"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <G
                  key={`gText_${i}`}
                  transform={`translate(
                  ${calculateEdgePoint(viewBoxCenterX, radius - 10, i * 36)[0]} 
                  ${calculateEdgePoint(viewBoxCenterY, radius - 10, i * 36)[1]})`}
                >
                  <Text
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    x={0}
                    y={0}
                    textAnchor="middle"
                  >
                    <TSpan x="0" dy="1.2em">
                      {radarText[current]}
                    </TSpan>
                    <TSpan x="0" dy="1.2em">
                      {radarText2[current]}
                    </TSpan>
                  </Text>
                </G>
                <Circle
                  key={`circle_dot_${i}`}
                  cx={calculateEdgePoint(viewBoxCenterX, radius - 25, i * 36)[0]}
                  cy={calculateEdgePoint(viewBoxCenterY, radius - 25, i * 36)[1]}
                  r={2}
                  stroke="white"
                  strokeOpacity="0.5"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <Circle
                  key={`circle_dot_oposite_${i}`}
                  cx={calculateEdgePoint(viewBoxCenterX, radius - 25, i * 36 + 180)[0]}
                  cy={calculateEdgePoint(viewBoxCenterY, radius - 25, i * 36 + 180)[1]}
                  r={2}
                  stroke="white"
                  strokeOpacity="0.5"
                  strokeWidth="0.5"
                  fill="transparent"
                />
                <G
                  key={`gText2_${i}`}
                  transform={`translate(
                  ${calculateEdgePoint(viewBoxCenterX, radius + 13, i * 36 + 180)[0]} 
                  ${calculateEdgePoint(viewBoxCenterY, radius + 13, i * 36 + 180)[1]})`}
                >
                  <Text
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    x={0}
                    y={0}
                    textAnchor="middle"
                  >
                    <TSpan x="0" dy="1.2em">
                      {radarTextOposite[current]}
                    </TSpan>
                    <TSpan x="0" dy="1.2em">
                      {radarTextOposite2[current]}
                    </TSpan>
                  </Text>
                </G>
              </>
            );
          })
        }
      </>
    );
  };

  return (
    <View style={{
      height: 500,
      width: 450,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <View style={{ marginLeft: -80 }}>
        {playerAttributes && playerAttributes.map((attribute) => (
          <RNText
            key={attribute.label}
            style={{
              color:
                // eslint-disable-next-line no-nested-ternary
                attribute.label === 'Offensive' ? '#9C4100' : attribute.label === 'Survivor' ? '#EBB014' : '#FFF512',
            }}
          >
            {attribute.label}
            {' '}
            player:
            {' '}
            {attribute.value || '0'}
            %
          </RNText>
        ))}
      </View>
      {radarData === null ? (
        <View style={{ height: radius * 2 + 200, width }}>
          <ActivityIndicator size="large" color="#BA5F16" />
        </View>
      ) : (
        <Svg height={radius * 2 + 200} width={width}>
          {
            [0, 1, 2].map((i) => (
              <Circle
                key={`circle_outline_${i}`}
                cx={viewBoxCenterX}
                cy={viewBoxCenterY}
                r={(i + 1) * radius * 0.25}
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="0.5"
                fill="transparent"
              />
            ))
          }
          {renderLineDotsText()}
          <Polygon
            stroke="#FFEA65"
            strokeWidth={0.7}
            fill="#FFEA65"
            fillOpacity={0.5}
            points={`${radarData.map((r, i) => `${calculateEdgePoint(viewBoxCenterX, ((radius - 22) * r.value) / 100, i * 36)[0]} ,
          ${calculateEdgePoint(viewBoxCenterY, ((radius - 22) * r.value) / 100, i * 36)[1]}`)}`}
            onPressOut={polygonOnClick}
          />
          {radarData.map((r, i) => (
            <Line
              key={`crosshair_stroked_${r.value + i}`}
              x1={calculateEdgePoint(viewBoxCenterX, ((radius - 22) * r.value) / 100, i * 36)[0]}
              y1={calculateEdgePoint(viewBoxCenterY, ((radius - 22) * r.value) / 100, i * 36)[1]}
              x2={viewBoxCenterX}
              y2={viewBoxCenterY}
              stroke="black"
              strokeOpacity="1"
              strokeWidth="0.7"
              fill="transparent"
            />
          ))}
          {isTooltipDisplayed && renderTooltipPoligon()}
        </Svg>
      )}
    </View>
  );
}

export default RadarGraph;
