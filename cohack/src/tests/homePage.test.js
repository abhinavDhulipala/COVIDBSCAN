import React from 'react';
import '@testing-library/react';
import HomePage from "../components/HomePage";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'

configure({adapter: new Adapter()})

let homeWrapper = shallow(<HomePage/>)
describe('Home Page component Contains proper content', () => {
    it('Ensure we have 3 cards', () => {
        const cardsWrapper = homeWrapper.find('Card')
        expect(cardsWrapper.length).toEqual(3)
    })

    it('Ensures we have requisite content for quiz card', () => {
        const htmlSnap = homeWrapper.html()
        homeWrapper.debug()
        expect(htmlSnap).toEqual(expect.stringMatching(/Check Your Status/i))
        expect(htmlSnap).toEqual(expect.stringMatching(/Login/i))
        expect(htmlSnap).toEqual(expect.stringMatching(/Participate/i))
    })

    it('Ensures we have requisite content for map card', () => {
        const htmlSnap = homeWrapper.html()
        expect(htmlSnap).toEqual(expect.stringMatching(/Density Map/i))
        expect(htmlSnap).toEqual(expect.stringMatching(/View Map/i))
    })
})
