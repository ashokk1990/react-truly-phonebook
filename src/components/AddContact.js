import PropTypes from 'prop-types';
import React from 'react';


class AddContact extends React.Component {
    handleAddSubmit = event => {
        event.preventDefault();
        for (const v of Object.values(this.state)) {
            if (!v) return;
        }

        this.props.handleSubmit(this.state);
    };
    handleOnChange = (name, value) => {
        this.setState({[name]: value});
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            context: "",
        }
    }

    render() {

        return (
            <div className="ui form">
                <div className="fields">
                    <div className="field">
                        <label>Name</label>
                        <input type="text" placeholder="Name"
                               onChange={(e) => this.handleOnChange("name", e.target.value)} required/>
                    </div>
                    <div className="field">
                        <label>Number</label>
                        <input type="number" placeholder="Number"
                               onChange={(e) => this.handleOnChange("number", e.target.value)} required/>
                    </div>
                    <div className="field">
                        <label>Context</label>
                        <input type="text" placeholder="Context"
                               onChange={(e) => this.handleOnChange("context", e.target.value)} required/>
                    </div>
                </div>
                <button className="ui icon button" onClick={this.handleAddSubmit}>
                    Add
                </button>
            </div>
        )
    }
}

AddContact.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default AddContact
