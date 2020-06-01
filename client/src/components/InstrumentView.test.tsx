import React from 'react';
import { shallow } from 'enzyme';
import InstrumentViewComponent from './InstrumentView';

async function onUpdateSuccess(data: any) {}

async function onUpdateError(error: any) {}

async function onDeleteSuccess(data: any) {}

async function onDeleteError(error: any) {}

describe('InstrumentView', () => {
  it('renders the InstrumentView component', () => {
    expect(InstrumentViewComponent).toMatchSnapshot();
  });

  it('displays the Instrument code', () => {
    const result = shallow(<InstrumentViewComponent
    key={7428}
    amount="5"
    code="MSFT"
    description="Microsoft Corporation - Common Stock"
    userId={1}
    instrumentId={7428}
    onDeleteSuccess={onDeleteSuccess}
    onDeleteError={onDeleteError}
    onUpdateSuccess={onUpdateSuccess}
    onUpdateError={onUpdateError}
  />).contains('MSFT');
    expect(result).toBeTruthy();
  });

  it('displays the Instrument description', () => {
    const result = shallow(<InstrumentViewComponent
    key={3008}
    amount="25.25"
    code="MFA"
    description="MFA Financial, Inc."
    userId={1}
    instrumentId={3008}
    onDeleteSuccess={onDeleteSuccess}
    onDeleteError={onDeleteError}
    onUpdateSuccess={onUpdateSuccess}
    onUpdateError={onUpdateError}
  />).contains('MFA Financial, Inc.');
    expect(result).toBeTruthy();
  });

  it('displays the Instrument amount', () => {
    const result = shallow(<InstrumentViewComponent
    key={6710}
    amount="120"
    code="GOOG"
    description="Alphabet Inc. - Class C Capital Stock"
    userId={1}
    instrumentId={6710}
    onDeleteSuccess={onDeleteSuccess}
    onDeleteError={onDeleteError}
    onUpdateSuccess={onUpdateSuccess}
    onUpdateError={onUpdateError}
  />).contains('120.000');
    expect(result).toBeTruthy();
  });
  
});
