import './styles/home.css';
import './styles/shared.css';
import Init from './components/init';
import Login from './components/login';
import Create from './components/create';
import Schedule from './components/schedule';
import { useState } from 'react';

const Home = (): JSX.Element => {

    // Logo next to app title.
    const logo = require('./imgs/logo.png');

    // 0 : Init
    // 1 : Login
    // 2 : Create
    // 3 : Schedule
    // Mapping for which component to render.
    let [currComp, setCurrComp] = useState<number>(0);

    // No need to use state for these variables. Will be passed as props to a component.
    let schedule: object = {};
    let username: string = '';

    // Switch to correct component to render.
    const switchComp = (compNum: number): JSX.Element => {
        switch (compNum) {
            case 0: return <Init onReturn={changeCompNum} />;
            case 1: return <Login onReturn={changeCompNum} />;
            case 2: return <Create onReturn={changeCompNum} />;
            case 3: return <Schedule />;
            default: return <Init onReturn={changeCompNum}/>;
        }
    }

    // Used for when a component needs to alter the current component state.
    const changeCompNum = (newCompNum: number, currUsername: string, currSchedule: object): void => {
        schedule = currSchedule;
        username = currUsername;
        setCurrComp(newCompNum);
    }

    return (
        <div id='home-div'>
            <div id='title-container'>
                <img src={logo} alt='SheduleIt Logo' id='logo'></img>
                <h1>ScheduleIt</h1>
                <img src={logo} alt='SheduleIt Logo' id='logo'></img>
            </div>
            {switchComp(currComp)}
        </div>
    );
}

export default Home;