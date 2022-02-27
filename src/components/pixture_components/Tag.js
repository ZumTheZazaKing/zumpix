import { css } from 'aphrodite';
import { pixtureStyles } from '../../styles/pixtureStyles';
import { useNavigate } from 'react-router-dom';

export default function Tag(props){

    const navigate = useNavigate();
    const tag = props.tag;

    const handleClick = () => {
        navigate(`/search/${tag}`);
    }

    return (
        <span onClick={handleClick} className={css(pixtureStyles.tag)}>
            {props.tag}
        </span>
    )
}