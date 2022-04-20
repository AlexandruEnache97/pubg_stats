/* eslint-disable max-len */
import { Dimensions, View } from 'react-native';
import Svg, {
  Circle, G, Line, Polygon, Text, TSpan,
} from 'react-native-svg';

const { width } = Dimensions.get('screen');

function RadarGraph() {
  const degToRadians = (deg: number) => (deg * Math.PI) / 180.0;

  const calculateEdgePoint = (center: number, radius: number, degree: number) => {
    const degreeInRadians = degToRadians(degree);
    return [
      center + Math.cos(degreeInRadians) * radius,
      center + Math.sin(degreeInRadians) * radius,
    ];
  };

  const radarText = ['Air drop', 'Crates', 'Items', 'Throwable', 'Damage'];
  const radarText2 = ['called', 'looted', 'looted', 'used', 'taken'];
  const radarTextOposite = ['Damage', 'Top 10', 'Position', 'Time', 'Heal'];
  const radarTextOposite2 = ['dealt', 'players', 'per game', 'survived', 'recieved'];

  const radarData = [
    { label: 'Air drop', value: 86 },
    { label: 'Crates looted', value: 70 },
    { label: 'Items looted', value: 60 },
    { label: 'Throwable used', value: 85 },
    { label: 'Damage taken', value: 60 },
    { label: 'Damage dealt', value: 40 },
    { label: 'Top 10 players', value: 50 },
    { label: 'Position per game', value: 69 },
    { label: 'Time survived', value: 50 },
    { label: 'Heak recieved', value: 44 },
  ];

  const viewBoxCenterX = 140;
  const viewBoxCenterY = 150;
  const radius = 100;

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
                <G transform={`translate(
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
                <G transform={`translate(
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
          strokeWidth={1.2}
          fill="#FFEA65"
          fillOpacity={0.9}
          points={`${radarData.map((r, i) => `${calculateEdgePoint(viewBoxCenterX, ((radius - 22) * r.value) / 100, i * 36)[0]} ,
            ${calculateEdgePoint(viewBoxCenterY, ((radius - 22) * r.value) / 100, i * 36)[1]}`)}`}
        />
        {radarData.map((r, i) => (
          <Line
            key={`crosshair_stroked_${r.value * i}`}
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
      </Svg>
    </View>
  );
}

export default RadarGraph;
