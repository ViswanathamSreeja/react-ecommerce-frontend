import React from 'react'
import Typewriter from 'typewriter-effect'
const Jumbotron = ({ text }) => (
    <Typewriter
        options={{
            strings: text,
            loop: true,
            autoStart: true
        }}
    />

)
export default Jumbotron