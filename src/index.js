import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import SortFilter from './Components/Shuffle.js';

// const App = () => {
//     return (
//         <div>
//             <p>Testing</p>
//             {console.log('This React App is working!!!')}
//         </div>
//     )
// }

const shufflejs = document.getElementById('shufflejs');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

if (shufflejs != null) {
    ReactDOM.render(
        <SortFilter />,
        document.getElementById('shufflejs')
    );
}