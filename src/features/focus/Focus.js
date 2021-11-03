import React from 'react';

import { Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';

import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';

import { fontSizes, spacing } from '../../utils/sizes';

import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = React.useState(null);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What would you like to focus on?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Focus on"
              style={{
                flex: 1,
                marginRight: 10,
              }}
              onSubmitEditing={({ nativeEvent }) => {
                setSubject(nativeEvent.text);
              }}
            />
            <RoundedButton
              size={50}
              title="+"
              onPress={() => addSubject(subject)}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    padding: spacing.sm,
  },
  inputContainer: {
    alignItems: 'center',
    paddingTop: spacing.md,
    flexDirection: 'row',
  },
});
