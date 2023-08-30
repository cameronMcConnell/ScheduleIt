import './styles/home.css';
import Login from './components/login';
import Create from './components/create';
import Schedule from './components/schedule';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

const Home = (): JSX.Element => {
    return (
        <BrowserRouter>
            <div>
                <button>
                    <Link to='/login'>Login</Link>
                </button>
                <button>
                    <Link to='/create'>Create</Link>
                </button>
                <button>
                    <Link to='/schedule'>Schedule</Link>
                </button>
            </div>
            <Routes>
                <Route path='/login' Component={Login} />
                <Route path='/create' Component={Create} />
                <Route path='/schedule' Component={Schedule} />
            </Routes>
        </BrowserRouter>
    );
}

export default Home;