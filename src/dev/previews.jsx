import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NavBar from "../components/NavBar.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NavBar">
                <NavBar/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews