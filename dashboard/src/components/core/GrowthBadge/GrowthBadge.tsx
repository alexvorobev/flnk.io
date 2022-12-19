import { Badge } from 'evergreen-ui';
import { FC, memo } from 'react';

interface Props {
  value?: number;
}

export const GrowthBadge: FC<Props> = memo(({ value = 0 }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const positiveColor = isPositive ? 'green' : null;
  const negativeColor = isNegative ? 'red' : null;

  return (
    <Badge color={positiveColor || negativeColor || 'neutral'} borderRadius={16}>
      {isPositive && '+'}
      {value}%
    </Badge>
  );
});
