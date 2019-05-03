import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={100} height={100} {...props}>
    <Path d="M50 12c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zm0 72c-18.8 0-34-15.2-34-34s15.2-34 34-34 34 15.2 34 34-15.2 34-34 34zm22.9-46.9c-.8-.8-2-.8-2.8 0L44.6 62.7 33.9 52c-.8-.8-2.1-.8-2.8 0-.8.8-.8 2.1 0 2.8l12.1 12.1c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l26.9-27c.8-.8.8-2 0-2.8z" />
    <Path
      fill="#00F"
      d="M1644-1210V474H-140v-1684h1784m8-8H-148V482h1800v-1700z"
    />
  </Svg>
);

export default SvgComponent;
