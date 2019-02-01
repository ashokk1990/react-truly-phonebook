import {shallow} from 'enzyme';
import React from "react";
import AddContact from "./AddContact";

const mockhandleSubmit = jest.fn();

const props = {
    handleSubmit: mockhandleSubmit,
};

describe('AddContact Component', () => {
    let addContactComponent = shallow(<AddContact {...props} />);
    it('snapshot', () => {
        expect(addContactComponent).toMatchSnapshot();
    });

    it('handleOnChange for correct text ', () => {
        addContactComponent.instance().handleOnChange("name", "Bob Barker");
        expect(addContactComponent.state().name).toEqual('Bob Barker');
    });

    it('handleOnChange for correct text ', () => {
        addContactComponent.instance().handleOnChange("number", "+12675558080");
        expect(addContactComponent.state().number).toEqual('+12675558080');
    });

    it('handleOnChange for correct text ', () => {
        addContactComponent.instance().handleOnChange("context", "personal");
        expect(addContactComponent.state().context).toEqual('personal');
    });

    it('should call handleSubmit method when button is clicked', () => {
        const event = {
            preventDefault: () => {
            }
        }
        addContactComponent.find('button').prop('onClick')(event);
        expect(mockhandleSubmit).toHaveBeenCalledWith({
            "name": "Bob Barker",
            "number": "+12675558080",
            "context": "personal"
        });
    });
});
