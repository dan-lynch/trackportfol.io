import { parseData } from 'utils';
import * as React from 'react';
import { StockContext } from 'context/StockContext';
import { API_KEY } from 'helpers/constants';

interface WithOHLCDataProps {
  readonly data: IOHLCData[];
}

export interface WithOHLCState {
  data?: IOHLCData[];
  message: string;
}

export interface IOHLCData {
  readonly close: number;
  readonly date: Date;
  readonly high: number;
  readonly low: number;
  readonly open: number;
  readonly volume: number;
}

function fetchStockData() {
  return <TProps extends WithOHLCDataProps>(OriginalComponent: React.ComponentClass<TProps>) => {
    return class WithOHLCData extends React.Component<Omit<TProps, 'data'>, WithOHLCState> {
      static contextType = StockContext;
      currentStock: string | undefined;

      public constructor(props: Omit<TProps, 'data'>) {
        super(props);

        this.state = {
          message: 'Loading data...',
        };

        this.currentStock = undefined;
      }

      public async componentDidMount() {
        this.fetchStock();
      }

      public async componentDidUpdate() {
        if (this.currentStock !== this.context.stock) {
          this.fetchStock();
        }
      }

      public render() {
        const { data, message } = this.state;
        if (data === undefined) {
          return <div className="center">{message}</div>;
        }
        return <OriginalComponent {...(this.props as TProps)} data={data} />;
      }

      async fetchStock() {
        try {
          this.currentStock = this.context.stock;
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.context.stock}&apikey=${API_KEY}`,
          );
          response.json().then((data) => {
            const parsedData = parseData(data);
            this.setState({ data: parsedData });
          });
        } catch (error) {
          this.setState({
            message: `Failed to fetch data. Error: {error}`,
          });
        }
      }
    };
  };
}

export default fetchStockData;
