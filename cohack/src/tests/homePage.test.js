import React from 'react';
import { render } from '@testing-library/react';
import NavBar from "../components/NavBar";
import ReactDOM from 'react-dom'

test('Navbar renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<NavBar/>, div)
})

//test()
