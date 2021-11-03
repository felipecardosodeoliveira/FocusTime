import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { spacing, fontSizes } from '../utils/sizes';

import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
   minutes, 
   isPaused,
   onProgress,
   onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = React.useState(minutesToMillis(minutes)); 

  const countDown =  () => {
    setMillis((time) => {
      if (time === 0) {
        // do more stuff here
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // report the progress
      onProgress((timeLeft / minutesToMillis(minutes)));
      return timeLeft;
    });
  };

  React.useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);


  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}: {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    color: colors.white,
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
  },
});
