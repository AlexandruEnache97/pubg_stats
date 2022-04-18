import {
  Dimensions, ScrollView, View, Image,
} from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
// import { ImageMapper } from 'react-native-image-mapper';
// import ZoomableImage from './ZoomableImage';

const { width } = Dimensions.get('window');

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
    <View style={{
      height: '100%',
      backgroundColor: '#000',
    }}
    >
      {/* <ZoomableImage
        imageHeight={1000}
        imageWidth={width}
        annotations={annotations}
        popOverStyles={{ backgroundColor: 'white' }}
        // eslint-disable-next-line global-require
        source={require('../../images/pubgMap.png')}
      /> */}
      <ScrollView horizontal>
        <ReactNativeZoomableView
          maxZoom={3}
          minZoom={1.2}
          zoomCenteringLevelDistance={3}
          zoomStep={0.5}
          initialZoom={1.5}
          bindToBorders
          captureEvent
          style={{
            height: '100%',
            width: '130%',
            padding: 10,
            backgroundColor: 'black',
          }}
        >
          <Image
            source={require('../../images/pubgMap.png')}
            resizeMode="contain"
            style={{ flex: 1, width: null, height: '100%' }}
          />
        </ReactNativeZoomableView>
      </ScrollView>
    </View>
  );
}
