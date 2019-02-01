import { shallow } from 'enzyme';
import React from "react";
import SearchBar from "./SearchBar";

const mockhandleSubmit = jest.fn();

const props = {
  handleSubmit: mockhandleSubmit,
};

describe('SearchBar Component', () => {
  let searchComponent = shallow(<SearchBar {...props} />);
  it('snapshot', () => {
    expect(searchComponent).toMatchSnapshot();
  });
  it('handleOnChange for blank text', () => {
    searchComponent.instance().handleOnChange({ target: { value: '' } });
    expect(searchComponent.state().term).toEqual('');
  });
  it('handleOnChange for correct text ', () => {
    searchComponent.instance().handleOnChange({ target: { value: 'Hello' } });
    expect(searchComponent.state().term).toEqual('Hello');
  });

  it('should call handleSubmit method when button is clicked', () => {
    const event = {preventDefault: () => {}}
    searchComponent.find('form').prop('onSubmit')(event);
    expect(mockhandleSubmit).toHaveBeenCalled();
  });
});
