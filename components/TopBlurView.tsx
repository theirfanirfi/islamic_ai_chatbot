import { BlurView } from "expo-blur";

const TopBlurView = (props) => {
    const { width, height } = props;
  return (
    <BlurView style={{
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    top: height * 0.1,
    backgroundColor: 'hsla(41, 100%, 56%, 0.04)',
    borderRadius: 50,
    marginHorizontal: width * 0.025,
    }} />
  );
}
export default TopBlurView;