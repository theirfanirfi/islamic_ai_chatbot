import { BlurView } from "expo-blur";

const BottomBlurView = (props) => {
    const { width, height, opacity } = props;
  return (
    <BlurView style={{
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    bottom: 12,
    backgroundColor: 'rgba(255, 184, 29, 0.04)',
    borderRadius: 50,
    opacity: opacity || 0.04,
    marginHorizontal: width * 0.025, // 2.5% margin on both sides
  }} />
)
}
export default BottomBlurView;