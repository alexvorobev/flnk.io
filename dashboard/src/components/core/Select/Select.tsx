import React, { FC, useCallback, useEffect, useState } from 'react';
import { Select as EvergreenSelect, SelectOwnProps } from 'evergreen-ui';
import { PolymorphicBoxProps } from 'ui-box';

type Option = {
  value: string;
  label: string;
};

type EvergreenSelectProps = PolymorphicBoxProps<'select', SelectOwnProps>;

interface Props extends Omit<EvergreenSelectProps, 'onChange'> {
  options: Option[];
  onChange?: (value: string) => void;
}

export const Select: FC<Props> = (props) => {
  const { defaultValue, options, value, onChange } = props;
  const [selected, setSelected] = useState(defaultValue ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find((option) => option.value === event.target.value);
      if (selectedOption) {
        setSelected(selectedOption.value);
        onChange?.(selectedOption.value);
      }
    },
    [onChange, options],
  );

  return (
    <EvergreenSelect {...props} onChange={handleChange}>
      {options.map((option) => (
        <option value={option.value} selected={selected === option.value}>
          {option.label}
        </option>
      ))}
    </EvergreenSelect>
  );
};
