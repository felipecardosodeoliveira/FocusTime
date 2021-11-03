import React from 'react';

import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';

import { ProgressBar } from 'react-native-paper';

import { Countdown } from '../../components/Countdown';

import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing'

import { colors } from '../../utils/colors';

import { spacing, fontSizes } from '../../utils/sizes';

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
  
  useKeepAwake();

  const [minutes, setMinutes] = React.useState(DEFAULT_TIME);
  
  const [isStarted, setIsStarted] = React.useState(false);

  const [progress, setProgress] = React.useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  } 

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);

    } else {
      Vibration.vibrate(10000);

    }
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.md, marginTop: spacing.xl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View  style={{ paddingTop: spacing.md }}>
          <ProgressBar
            color="#5E84E2"
            progress={progress}
            style={{ height: 50 }}
          />
        </View>
        <View style={styles.buttonWrapper} >
            <Timing onChangeTime={changeTime} />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            size={100}
            title="Pause"
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            size={100}
            title="Start"
            onPress={() => setIsStarted(true)}
          />
        )}
        <View style={styles.clearSubject}>
          <RoundedButton
            size={50}
            title="-"
            onPress={() => clearSubject()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    // flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.xl : spacing.xl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
