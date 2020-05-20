import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from '../types';

const uuid = require('uuid');

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Sowjanya",
                email: "sowji@gmail.com",
                phone: "89043795680",
                type: "personal"
            },
            {
                id: 2,
                name: "Ramadevi",
                email: "sowji@gmail.com",
                phone: "89043795680",
                type: "professional"
            }
        ]
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //curd 

    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;