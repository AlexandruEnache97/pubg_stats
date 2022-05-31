import {
  Dimensions, Image, ImageBackground, ScrollView, View,
} from 'react-native';
import ReactNativeZoomableView from
  '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
// import { ImageMapper } from 'react-native-image-mapper';
import Svg, { Circle } from 'react-native-svg';
import ImageViewer from 'react-native-image-zoom-viewer';
import ZoomableImage from './ZoomableImage';

const { width } = Dimensions.get('window');

const images = [{
  url: '',
  props: {
    // Or you can set source directory.
    // eslint-disable-next-line global-require
    source: require('../../images/pubgMap.png'),
  },
}];

export default function Maps() {
  const annotations = [
    {
      x1: 25,
      x2: 35,
      y1: 20,
      y2: 30,
      description: 'A pair of black running sports shoes, has lace-up detail. Textile and mesh upper',
    },
    {
      x1: 60,
      x2: 70,
      y1: 15,
      y2: 25,
      description: 'Shoe sole tip!',
    },
    {
      x1: 20,
      x2: 30,
      y1: 50,
      y2: 60,
      description: 'Textured and patterned outsole',
    },
    {
      x1: 65,
      x2: 75,
      y1: 65,
      y2: 75,
      description: 'Textured outsole with a stacked heel',
    },
  ];

  return (
    <>
      {/* <ImageViewer imageUrls={images} /> */}
      {/* eslint-disable-next-line global-require */}
      <View>
        <ScrollView horizontal>
          <ScrollView>
            <ImageBackground
              resizeMode="cover"
              style={{
                width: 1000, height: 1000,
              }}
              source={require('../../images/pubgMap.png')}
            />
          </ScrollView>
        </ScrollView>
        <Svg height={2000} width={2000} style={{ zIndex: 10, position: 'absolute' }}>
          <Circle
            key="circle_outline"
            cx={300}
            cy={500}
            r={50}
            stroke="white"
            strokeOpacity="1"
            strokeWidth="1"
            fill="white"
          />
        </Svg>
      </View>
      <View />

      {/* <ZoomableImage
        imageHeight={1000}
        imageWidth={width}
        annotations={annotations}
        popOverStyles={{ backgroundColor: 'white' }}
        // eslint-disable-next-line global-require
        source={require('../../images/pubgMap.png')}
      /> */}
      {/* <ReactNativeZoomableView
        maxZoom={5}
        minZoom={0.8}
        zoomCenteringLevelDistance={1}
        zoomStep={0.5}
        initialZoom={0.8}
        style={{
          width: 1000,
          padding: 50,
          backgroundColor: 'red',
        }}
      >
        <Image
          // eslint-disable-next-line global-require
          source={require('../../images/pubgMap.png')}
          resizeMode="contain"
          style={{ position: 'absolute', width: 1000, height: 1000 }}
        />
      </ReactNativeZoomableView> */}
    </>
  );
}
