import PropTypes from 'prop-types';
import React from "react";
class SearchBar extends React.PureComponent {
  state = {
    term: ""
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.term);
  };

  handleOnChange = event => {
    if (this.state.term && event.target.value === "") this.props.handleSubmit("");
    this.setState({ term: event.target.value });
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form className="ui form" onSubmit={this.handleSearchSubmit}>
          <div className="field">
            <label>Name Search Filter</label>
            <input
              type="text"
              value={this.state.term}
              onChange={this.handleOnChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SearchBar;
