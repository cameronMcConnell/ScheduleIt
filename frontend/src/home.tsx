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

    // Have to use state in order for it to work and be passed as props to component.
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [schedule, setSchedule] = useState<{ [key: string]: boolean[][]}>({});

    // Switch to correct component to render.
    const switchComp = (compNum: number): JSX.Element => {
        switch (compNum) {
            case 0: return <Init onReturn={changeCompNum} />;
            case 1: return <Login onReturn={changeCompNum} />;
            case 2: return <Create onReturn={changeCompNum} />;
            case 3: return <Schedule username={username} password={password} schedule={schedule}/>;
            default: return <Init onReturn={changeCompNum}/>;
        }
    }

    // Used for when a component needs to alter the current component state.
    const changeCompNum = (newCompNum: number, currUsername: string, currPassword: string, currSchedule: {[key: string]: boolean[][]}): void => {
        setSchedule(currSchedule);
        setUsername(currUsername);
        setPassword(currPassword);
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