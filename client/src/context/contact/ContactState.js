import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from '../types';

const uuid = require('uuid');

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id })
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
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                current: state.current,
                filtered: state.filtered,
                clearFilter,
                filterContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;