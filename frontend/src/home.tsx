import './styles/home.css';
import './styles/shared.css';
import Init from './components/init';
import Login from './components/login';
import Create from './components/create';
import Schedule from './components/schedule';
import { useState } from 'react';

const Home = (): JSX.Element => {

    // 0 : Init
    // 1 : Login
    // 2 : Create
    // 3 : Schedule
    // Mapping for which component to render.
    let [currComp, setCurrComp] = useState<number>(0);

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
    const changeCompNum = (newCompNum: number): void => {
        setCurrComp(newCompNum);
    }

    return (
        <div id='home-div'>
            {switchComp(currComp)}
        </div>
    );
}

export default Home;