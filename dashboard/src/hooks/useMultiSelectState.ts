import { SelectMenuItem } from 'evergreen-ui';
import { useState, useMemo, useCallback } from 'react';

export type MultiselectOptionType = {
  label: string;
  value: string;
};

export const useMultiSelectState = (options: SelectMenuItem[]) => {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedItems = useMemo(() => {
    return options.filter((option) => selected.includes(`${option.value}`));
  }, [selected, options]);

  const selectedLabels = useMemo((): string => {
    let labels = selectedItems[0]?.label;

    if (selectedItems.length > 1) {
      selectedItems.slice(1).map((item) => {
        labels += ', '.concat(item.label);

        return null;
      });
    }

    return labels;
  }, [selectedItems]);

  const onSelect = useCallback(
    (option: SelectMenuItem) => {
      setSelected([...selected, `${option.value}`]);
    },
    [selected],
  );

  const onDeselect = useCallback(
    (option: SelectMenuItem) => {
      setSelected(selected.filter((item) => item !== `${option.value}`));
    },
    [selected],
  );

  return {
    selected,
    selectedItems,
    selectedLabels,
    setSelected,
    onSelect,
    onDeselect,
  };
};
