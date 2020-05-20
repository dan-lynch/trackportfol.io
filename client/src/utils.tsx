import AutoSizer from 'react-virtualized-auto-sizer';
import * as React from 'react';

export const parseData = (data: any) => {
  // eslint-disable-next-line prefer-const
  let result: any = [];
  const obj: any = data['Time Series (Daily)'];
  Object.keys(obj).forEach(function (item) {
    const body = obj[item];
    const indiv = {
      date: new Date(item),
      open: parseFloat(body['1. open']),
      high: parseFloat(body['2. high']),
      low: parseFloat(body['3. low']),
      close: parseFloat(body['4. close']),
      volume: parseFloat(body['5. volume']),
      split: '',
      dividend: '',
      absoluteChange: '',
      percentChange: '',
      elderRay: {},
    };
    result.push(indiv);
  });
  const sortedData = result.sort((a: any, b: any) => a.date - b.date);
  return sortedData;
};

interface WithSizeProps {
  readonly width: number;
  readonly height: number;
}

export function withSize(minHeight = 300) {
  return <TProps extends WithSizeProps>(OriginalComponent: React.ComponentClass<TProps>) => {
    return class WithSize extends React.Component<Omit<TProps, 'width' | 'height'>> {
      public render() {
        return (
          <AutoSizer style={{ minHeight }}>
            {({ height, width }) => {
              return <OriginalComponent {...(this.props as TProps)} height={height} width={width} />;
            }}
          </AutoSizer>
        );
      }
    };
  };
}

function timeDifference(current: any, previous: any) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago'
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + ' min ago'
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + ' h ago'
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + ' days ago'
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago'
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + ' years ago'
  }
}

export function timeDifferenceForDate(date: any) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}