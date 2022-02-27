import { useNavigate } from 'react-router-dom';

export default function Creator(props){

    const creatorName = props.creatorName;
    const creatorId = props.creatorId;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/${creatorId}`);
    }

    return (
        <span style={{cursor:"pointer"}} onClick={handleClick}>
            <b>{creatorName || creatorId}</b>
        </span>
    )
}