import React from 'react';
import Test from './Test';

import './styles.css';

const App = () => {
    return (
        <div>
            <p>Testing</p>
            <Test />
            {console.log('This React App is working!')}
        </div>
    )
}

export default App;