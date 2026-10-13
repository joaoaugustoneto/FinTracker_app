import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from './Input';

interface FormInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'value' | 'onChangeText'
> {
  control: Control<T>;
  name: Path<T>;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  mask,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          {...rest}
          label={label}
          value={String(value ?? '')}
          onChangeText={(text) => {
            const formatted = mask ? mask(text) : text;
            onChange(formatted);
          }}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}
