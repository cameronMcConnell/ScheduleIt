import '../styles/login.css';
import '../styles/shared.css';
import { useState } from 'react';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number, currUsername: string, currPassword: string, currSchedule: {[key: string]: boolean[][]}) => void;
}

const Login: React.FC<compProps> = (props): JSX.Element => {

    // Users entered username.
    let [username, setUsername] = useState<string>('');

    // Users entered password.
    let [password, setPassword] = useState<string>('');

    // Flag for showing no password was included.
    let [noPassword, setNoPassword] = useState<boolean>(false);
    
    // Flag for showing no unsername was included.
    let [noUsername, setNoUsername] = useState<boolean>(false);

    // Flag for showing an error occured when calling backend.
    let [errorOccurred, setErrorOccurred] = useState<boolean>(false);

    // Flag for showing the input username doesn't exist in database.
    let [accountNotExist, setAccountNotExist] = useState<boolean>(false);

    // Check to see if users account exists in the database.
    const queryAccount = async () => {
        
        // Call helper function to validate user input.
        if (!validateInput()) { return; }
        
        // Reset state.
        setNoPassword(false);
        setNoUsername(false);

        // Check to see if username and password exists in the database.
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        }).catch((err) => {
            console.error(err);
            setErrorOccurred(true); 
        })

        // Check to see if response is not null.
        if (response) {
            var success = await response.json();
            setErrorOccurred(false);
        } else { return; }

        // Check to see if operation was a success.
        if (success.bool) {
            setAccountNotExist(false);
            props.onReturn(3, username, password, success.schedule);
        } else {
            // Change state to reflect accurate error.
            switch (success.reason) {
                case 1:
                    setErrorOccurred(true);
                    break;
                case 2:
                    setAccountNotExist(true);
                    break;
                default: 
                    break;
            }
        }
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
            {errorOccurred ? <p>An error occurred. Please try again.</p> : ''}
            {accountNotExist ? <p>Account doesn't exist. Please try again.</p> : ''}
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
                <button className='button-design' onClick={() => props.onReturn(0, '', '', {})}>Return to Home</button>
                <button className='button-design' onClick={() => queryAccount()}>Login</button>
            </div>
        </div>
    );
}

export default Login;