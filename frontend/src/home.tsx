import './styles/home.css';
import { useState } from 'react';

const Home = (): JSX.Element => {
    
    // State to render component that user is on currently.
    // 0 : init
    // 1 : login
    // 2 : create
    // 3 : schedule
    let [currPage, setCurrPage] = useState<number>(0);

    return (
        <div>
        </div>
    );
}

export default Home;