import '../styles/create.css';
import '../styles/shared.css';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number) => void;
}

const Create: React.FC<compProps> = (props): JSX.Element => {
    return (
        <div>
            <button onClick={() => props.onReturn(0)}>Return to Home</button>
            <button onClick={() => props.onReturn(3)}>Create Account</button>
        </div>
    );
}

export default Create;