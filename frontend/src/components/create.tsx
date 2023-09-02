import '../styles/create.css';
import '../styles/shared.css';
import { useState } from 'react';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number) => void;
}

const Create: React.FC<compProps> = (props): JSX.Element => {

    // Users entered username.
    let [username, setUsername] = useState<string>("");

    // Users entered password.
    let [password, setPassword] = useState<string>("");

    // Flag for showing no password was included.
    let [noPassword, setNoPassword] = useState<boolean>(false);

    // Flag for showing no unsername was included.
    let [noUsername, setNoUsername] = useState<boolean>(false);

    // Need to implement a couple of possibilites.
    // 1. Username already exists.
    // 2. No username supplied.
    // 3. No password supplied.
    const createAccount = async () => {

        // Call helper function to validate user input.
        if (!validateInput()) { return; }

        // Reset state.
        setNoPassword(false);
        setNoUsername(false);
 
        // Send data and await response.
        const response = await fetch('http://localhost:5000/create', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => { console.error(err); })

        // If not null, parse the json.
        if (response) { 
            var success = await response.json(); 
        } else { return; }

        // Check to see if account was created successfully.
        if (success.bool) {
            props.onReturn(3);
        } else { return; }
    }

    // Checks to see if user entered username and password.
    const validateInput = (): boolean => {
        // Code to handle parts of the UI to render.
        let flag = true;

        if (!username) {
            setNoUsername(true);
            flag = false;
        }
        if (!password) {
            setNoPassword(true);
            flag = false;
        }

        return flag;
    }

    return (
        <div className='component-container'>
            <form className='form-container'>
                <label className='label-container'>
                    Username:
                    <input onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                {noUsername ? <p>Please input a username.</p> : ''}
                <label className='label-container'>
                    Password:
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                {noPassword ? <p>Please input a password.</p> : ''}
            </form>
            <div className='button-container'>
                <button className='button-design' onClick={() => props.onReturn(0)}>Return to Home</button>
                <button className='button-design' onClick={() => createAccount()}>Create Account</button>
            </div>
        </div>
    );
}

export default Create;