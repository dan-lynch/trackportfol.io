import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { graphqlService } from 'services/graphql';
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
  value: Instrument | null;
  setValue: any;
  id: string;
};
export default function SearchStock(props: Props) {
  const { value, setValue, id } = props;
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [instruments, setInstruments] = useState<Instrument[] | []>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const searchResults = useQuery(graphqlService.SEARCH_INSTRUMENTS, {
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
      open={open && instruments.length > 0}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoHighlight
      getOptionLabel={(option: Instrument) => `${option.code} ${option.description}`}
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
          placeholder='Start typing to search...'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
              startAdornment: (
                  <SearchIcon />
              ),
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
