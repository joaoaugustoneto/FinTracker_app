import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors, radius, spacing } from '@/theme';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary && styles.buttonSecondary,
        isOutline && styles.buttonOutline,
        isDanger && styles.buttonDanger,
        isGhost && styles.buttonGhost,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={isOutline || isGhost ? colors.primary : '#FFFFFF'} />
      ) : (
        <Text
          style={[
            styles.text,
            isSecondary && styles.textSecondary,
            isOutline && styles.textOutline,
            isDanger && styles.textDanger,
            isGhost && styles.textGhost,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: colors.text,
  },
  textOutline: {
    color: colors.primary,
  },
  textDanger: {
    color: '#FFFFFF',
  },
  textGhost: {
    color: colors.muted,
  },
});
