import { useParams } from "react-router-dom"
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { pixtureStyles } from "../styles/pixtureStyles";
import { css } from "aphrodite";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";
import moment from "moment";
import Creator from '../components/pixture_components/Creator';
import Tag from '../components/pixture_components/Tag';
import DownloadButton from "../components/pixture_components/DownloadButton";

export const Pixture = () => {

    const { pixtureId } = useParams();
    const [pixtureInfo, setPixtureInfo] = useState(null);
    const [creatorName, setCreatorName] = useState(null);

    useEffect(() => {
        getPixtureData()
    },[])

    const getPixtureData = async () => {
        const pixtureDoc = doc(db, "pixtures", pixtureId);
        await getDoc(pixtureDoc).then(pixtureData => {
            setPixtureInfo(pixtureData.data());
            getCreatorName(pixtureData.data().illustrator_id);
        })
    }

    const getCreatorName = async (creator_id) => {
        const creatorDoc = doc(db, "users", creator_id);
        await getDoc(creatorDoc).then(creatorData => {
            setCreatorName(creatorData.data().name);
        })
    }

    return ( pixtureInfo ?
        <div className={css(pixtureStyles.container)}>
            <Helmet>
                <title>{pixtureInfo.title}</title>
            </Helmet>
            <img className={css(pixtureStyles.previewImage)} src={pixtureInfo.url} alt={pixtureInfo.title}/>
            
            <div className={css(pixtureStyles.infoContainer)}>
                <h1>{pixtureInfo.title}</h1>
                <p>Uploaded by <Creator creatorId={pixtureInfo.illustrator_id} creatorName={creatorName}/></p>
                <p>on <b>{moment.utc(new Date(pixtureInfo.createdAt.seconds*1000).toUTCString()).format('ddd, Do MMMM YYYY')}</b></p>
                <br/>
                <p>
                    {pixtureInfo.tags.map((tag,i) => {
                        return <Tag tag={tag} key={i}/>
                    })}
                </p>
                <br/>
                <DownloadButton url={pixtureInfo.url} title={pixtureInfo.title}/>
            </div>
        </div>
        : 
        <div>
            <Helmet>
                <title>Loading...</title>
            </Helmet>
            <CircularProgress disableShrink size={60} thickness={5}/>
        </div>
    )
}