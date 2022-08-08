import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { queryByDisplayValue } from '@testing-library/react';
// Recuerda siempre usar la palabra "use" al principio de cada custom hook
export const useExists = async (route:string, value:object,) => {
    let response = {data: []};
    await axios.post(route, value)
    .then(res => {
        response = res;
    })
    .then(err => {
        console.log(err)
    });
    return response;
}