import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ListCardProps = {
  Description: string;
};

export default function ListCard(props: ListCardProps) {
  return (
    <TouchableOpacity style={styles.Container}>
      <View style={styles.Image} />
      <Text style={styles.TextBold}>{props.Description}</Text>
      <View style={styles.Circle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    position: 'relative',
    height: 90,
    width: '100%',
    backgroundColor: '#E0E4EA',
    borderRadius: 20,
    boxShadow: '#00000001 0px 1px 3px 0px, #000000 0px 0px 1px 0px',
    flexDirection: 'row',
    paddingLeft: 14,
    alignItems: 'center',
    gap: 20,
    marginTop: 7.5,
    marginBottom: 7.5,
  },

  TextBold: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },

  GrayTextBold: {
    fontSize: 14,
    color: '#878787',
    fontWeight: 'bold',
  },

  Circle: {
    position: 'absolute',
    top: 32,
    right: -12,
    height: 30,
    width: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    zIndex: 5,
  },

  Image: {
    width: 65,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
});
