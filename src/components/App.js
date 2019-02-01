import React, {PureComponent} from "react";
import {contact as contactController} from "../api";
import {formattedPhoneNumber, uuid} from "../utils";
import AddContact from "./AddContact";
import "./App.css";
import SearchBar from "./SearchBar";

const tableHead = [
    {name: "name", label: "Name"},
    {name: "number", label: "Number"},
    {name: "context", label: "Context"}
];

class App extends PureComponent {
    componentDidMount = async () => {
        this.fetchContacts();
    };
    /**
     * handle Search filter
     * @param name
     */
    handleSearchFilter = name => {
        this.fetchContacts({name});
    };
    /**
     * handle Add contact
     * @param name
     */
    handleAddContact = async data => {
        await contactController.addNewContact({id: uuid(), ...data});
        this.fetchContacts();
        this.setState({addContact: false});
    };
    handleOpenAdd = () => {
        this.setState({addContact: !this.state.addContact});
    };
    handleSort = async sortBy => {
        const {contacts} = this.state;
        let order = "";
        if (contacts.order === "asc") {
            order = "desc";
        } else {
            order = "asc";
        }
        this.fetchContacts({sortBy, order});
    };
    /**
     *
     * @param sortBy
     * @param order
     * @param name
     * @returns {Promise<void>}
     */
    fetchContacts = async ({sortBy, order, name} = {}) => {
        this.setState({loading: true});
        const state = this.state;
        try {
            const {data} = await contactController.getContact(sortBy, order, name);
            state.loading = false;
            !data.length ? (state.noData = true) : (state.noData = false);
            if (data) state.contacts.data = data;
            if (sortBy) state.contacts.sortBy = sortBy;
            if (order) state.contacts.order = order;
        } catch (error) {
            state.loading = false;
            state.error = true;
        }
        this.setState({...state});
    };
    tableHeadClass = name => {
        const {contacts} = this.state;
        const {sortBy, order} = contacts;
        if (sortBy !== name) return "";

        let classname = "headings sorted";
        if (order === "asc") classname += " ascending";
        else classname += " descending";
        return classname;
    };

    constructor(props) {
        super(props);
        this.state = {
            addContact: false,
            loading: false,
            error: false,
            noData: false,
            contacts: {
                data: [],
                sortBy: "name",
                order: "asc"
            }
        };
    }

    render() {
        const {contacts, error, loading, noData, addContact} = this.state;

        return (
            <div className="ui container">
                <h1> Contact List </h1>
                <SearchBar handleSubmit={this.handleSearchFilter}/>
                <div className="tableContainer">
                    {loading && <div className="ui active centered inline loader"/>}
                    {error && <div>Error While Fetching Data From Server!</div>}
                    {noData && <div>No Contacts Found!</div>}
                    <button className="ui icon button" onClick={this.handleOpenAdd}>
                        <i className="plus icon"/>
                    </button>
                    {addContact && <AddContact handleSubmit={this.handleAddContact}/>}
                    {
                        <table className="ui striped selectable sortable unstackable table">
                            <thead>
                            <tr>
                                {tableHead.map(head => (
                                    <th
                                        key={head.name}
                                        className={this.tableHeadClass(head.name)}
                                        onClick={() => this.handleSort(head.name)}
                                    >
                                        {head.label}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {contacts.data.map(({name, number, context}) => {
                                //Generating a unique string of length 6 to use as key
                                return (
                                    <tr key={number} className="table-rows">
                                        <td className="stats">{name}</td>
                                        <td className="stats">{formattedPhoneNumber(number)}</td>
                                        <td className="stats">
                                            {context.replace(context[0], context[0].toUpperCase())}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default App;
