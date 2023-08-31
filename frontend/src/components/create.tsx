import '../styles/create.css';
import '../styles/shared.css';
import { useState } from 'react';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number) => void;
}

const Create: React.FC<compProps> = (props): JSX.Element => {

    let [username, setUsername] = useState<string>("");

    let [password, setPassword] = useState<string>("");

    // Need to implement a couple of possibilites.
    // 1. Username already exists.
    // 2. No username supplied.
    // 3. No password supplied.
    const createAccount = () => {

    }

    return (
        <div className='component-container'>
            <form className='form-container'>
                <label className='label-container'>
                    Username:
                    <input onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label className='label-container'>
                    Password:
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                </label>
            </form>
            <div className='button-container'>
                <button className='button-design' onClick={() => props.onReturn(0)}>Return to Home</button>
                <button className='button-design' onClick={() => createAccount()}>Create Account</button>
            </div>
        </div>
    );
}

export default Create;