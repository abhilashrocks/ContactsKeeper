import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT, DELETE_CONTACT, CONTACT_ERROR, UPDATE_CONTACT, FILTER_CONTACTS,
    SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER, GET_CONTACTS, CLEAR_CONTACTS
} from '../types';

// const uuid = require('uuid');

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg })
        }
    }

    const addContact = async (contact) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.responce.msg })
        }
    }

    const updateContact = async (contact) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }p
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.responce.msg })
        }
    }

    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id })

        }
        catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.responce.msg })
        }
    }
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                current: state.current,
                filtered: state.filtered,
                clearFilter,
                filterContacts,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;