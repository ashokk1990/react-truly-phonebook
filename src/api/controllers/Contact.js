import api from "../api";
/**
 * Using to make api calls making use of axois default config
 */

/**
 *
 * @returns {Promise<*>}
 */
const getContact = (sortBy, order, name) => {
    const params = {};
    if (name) params.name_like = name;
    if (sortBy) params._sort = sortBy;
    if (order) params._order = order;
    return api.get("/contacts", {params});
};

/**
 *
 * @param payload
 * @returns {Promise<void>}
 */
const addNewContact = async payload => {
    return api.post("/contacts", payload);
};

export default {
    getContact,
    addNewContact
};
