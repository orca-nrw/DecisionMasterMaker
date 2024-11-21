import React, { useEffect } from "react";
import ReactPlayer from 'react-player/file';
import { useAppContext } from './App';

export interface TextNodeProps {
    content: string,
    stopAutoPlay?: boolean,
    video?: string
}

export const TextVideoNode = (props: TextNodeProps) => {
    const ctx = useAppContext();
    useEffect(() => {
        if (ctx) {
            ctx.markReady(true);
        }
    }, []);
    if (/^https:\/\/player.orca.educast.nrw/.test(props.video)) {
	return (
	    <>
		<iframe className="w-full mx-auto mb-6 max-w-prose aspect-video" src={props.video} title="educast.nrw player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		<div className="p-3 mx-auto prose max-w-prose" dangerouslySetInnerHTML={{ __html: props.content }}></div>
	    </>
	);
    } else {
	return (
	    <>
		<ReactPlayer controls={true} playing={true} forceVideo={true} className="w-full mx-auto mb-6 max-w-prose" url={props.video} />
		<div className="p-3 mx-auto prose max-w-prose" dangerouslySetInnerHTML={{ __html: props.content }}></div>
	    </>
	);
    }
}
