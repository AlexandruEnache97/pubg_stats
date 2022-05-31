import { StyleSheet, Text } from 'react-native';

function Paragraph({ children, style = {} }: { children: string | number, style?: any }) {
  return <Text style={StyleSheet.compose(styles.defaultText, style)}>{children}</Text>;
}

const styles = StyleSheet.create({
  defaultText: {
    color: '#efefef',
    fontFamily: 'regularDroidSans',
  },
});

export default Paragraph;
