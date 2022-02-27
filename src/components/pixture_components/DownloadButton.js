export default function DownloadButton(props){

    return (
        <a href={props.url} download={`${props.title}.jpg`}>
            Download
        </a>
    )
}