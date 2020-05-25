import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Instrument } from 'helpers/types';

const useStyles = makeStyles(() => ({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

type Props = {
  instruments: Instrument[] | [];
  value: Instrument | null;
  setValue: any;
};

const SearchStock: React.FC<Props> = (props) => {
  const { instruments, value, setValue } = props;
  const [open, setOpen] = useState(false);
  const loading = open && props.instruments.length === 0;

  const classes = useStyles();

  return (
    <Autocomplete
      autoComplete={true}
      id='search-stock'
      value={value}
      onChange={(_event: any, newValue: Instrument | null) => {
        setValue(newValue);
      }}
      style={{ width: 300 }}
      options={instruments}
      classes={{
        option: classes.option,
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoHighlight
      getOptionLabel={(option: Instrument) => option.code}
      loading={loading}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option.code}</span>
          {option.description}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose a stock'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchStock;
