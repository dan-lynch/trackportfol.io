import * as React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { AppContext } from 'context/AppContext';
import { API_KEY } from 'helpers/constants';
import { parseData } from 'utils';

interface WithOHLCDataProps {
  readonly data: IOHLCData[];
}

export interface WithOHLCState {
  data?: IOHLCData[];
  message: string;
  isLoading: boolean;
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
      static contextType = AppContext;
      currentStock: string | undefined;

      public constructor(props: Omit<TProps, 'data'>) {
        super(props);

        this.state = {
          message: 'Fetching stock data...',
          isLoading: true,
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
        const { data, message, isLoading } = this.state;
        if (data === undefined) {
          return isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
              <CircularProgress size={32} disableShrink />
            </div>
          ) : (
            <Typography align='center' variant='subtitle1'>
              {message}
            </Typography>
          );
        }
        return <OriginalComponent {...(this.props as TProps)} data={data} />;
      }

      async fetchStock() {
        try {
          this.currentStock = this.context.stock;
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.context.stock}&apikey=${API_KEY}`
          );
          response.json().then((data) => {
            if (!data['Error Message']) {
              const parsedData = parseData(data);
              this.setState({ data: parsedData });
            } else {
              this.setState({
                message: `Failed to fetch data for ${this.context.stock}`,
              });
            }
          });
        } catch (error) {
          this.setState({
            message: `Failed to fetch data for ${this.context.stock}`,
          });
        }
      }
    };
  };
}

export default fetchStockData;
