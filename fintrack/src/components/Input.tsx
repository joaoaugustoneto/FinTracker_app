import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/utils/icons';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      icon,
      containerStyle,
      secureTextEntry,
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = Boolean(secureTextEntry);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const inputContainerStyle: StyleProp<ViewStyle> = [
      styles.inputContainer,
      isFocused && styles.focusedBorder,
      Boolean(error) && styles.errorBorder,
    ];

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={inputContainerStyle}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={error ? colors.danger : isFocused ? colors.primary : colors.muted}
              style={styles.icon}
            />
          )}

          <TextInput
            ref={ref}
            placeholderTextColor={colors.muted}
            secureTextEntry={isPassword && !isPasswordVisible}
            style={[styles.input, style]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...rest}
          />

          {isPassword && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              style={styles.passwordToggle}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.muted}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  focusedBorder: {
    borderColor: colors.primary,
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
  },
  passwordToggle: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});