import React from 'react';
import {
  ActivityIndicator,
  // MINHA MODIFICAÇÃO: Importei o 'StyleProp' para tratar corretamente arrays de estilo com condicionais.
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/theme';
import type { IconName } from '@/utils/icons';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  icon?: IconName;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  icon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';
  // MINHA MODIFICAÇÃO: Removi a variável 'const isDanger = variant === 'danger';'
  // do código original, pois ela não estava a ser lida e gerava um aviso de variável não utilizada.

  // MINHA MODIFICAÇÃO PRINCIPAL: Alterei o tipo de 'ViewStyle[]' para 'StyleProp<ViewStyle>'.
  // No código original, a expressão '(disabled || loading) && styles.disabled' devolve 'false' quando o botão está ativo.
  // O tipo 'ViewStyle[]' do TypeScript não aceita o booleano 'false' dentro da lista, mas o 'StyleProp<ViewStyle>'
  // aceita valores falsos e nulos com segurança sem quebrar o compilador.
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    styles[variant],
    (disabled || loading) && styles.disabled,
    style, // MINHA MODIFICAÇÃO: Removi a conversão forçada 'as ViewStyle', pois o StyleProp já aceita a prop style diretamente.
  ];

  const textColor = isOutline ? colors.primary : isSecondary ? colors.text : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={containerStyle}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons name={icon} size={20} color={textColor} style={styles.icon} />
          )}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primarySoft,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
