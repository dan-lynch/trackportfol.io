import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Instrument } from 'helpers/types';
import { useQuery } from 'react-apollo';
import { apiService } from 'services/apiService';

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
  value: Instrument | null;
  setValue: any;
  id: string;
};

const SearchStock: React.FC<Props> = (props) => {
  const { value, setValue, id } = props;
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [instruments, setInstruments] = useState<Instrument[] | []>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const searchResults = useQuery(apiService.searchInstruments, {
    variables: { search: inputValue, firstLetter: inputValue?.slice(0,1) },
  });

  useEffect(() => {
    if (open && inputValue && searchResults.data && searchResults.data.allInstruments.nodes) {
        setInstruments(searchResults.data.allInstruments.nodes)
    } else {
      setInstruments([]);
    }
    setLoading(false);
  }, [searchResults, inputValue, open]);

  function updateInputValue(newValue: any) {
    setInputValue(newValue);
    setLoading(true);
  }

  return (
    <Autocomplete
      id={id}
      value={value}
      onChange={(_event: any, newValue: Instrument | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_event: any, newValue: string | undefined) => {
        updateInputValue(newValue);
      }}
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
      getOptionLabel={(option: Instrument) => `${option.code} ${option.description}`}
      noOptionsText="Start typing to search..."
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
          label='Search stocks'
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
