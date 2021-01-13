import React from 'react';
import '@testing-library/react';
import NavBar from "../components/NavBar";
import ReactDOM from 'react-dom'
import HomePage from "../components/HomePage";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

configure({adapter: new Adapter()})

let home = shallow(<HomePage/>)
describe('Home Page component Contains proper content', () => {
    it('renders quiz path', () => {

        expect(home.text()).toEqual(expect.stringMatching(/Check Your Status/i))
        const quizButton = home.find('toQuiz')
        expect([1])
    })
})
