import React, { ReactChildren, ReactFragment, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, ThreeEvent, useLoader } from '@react-three/fiber';
import { Environment, Stage, OrbitControls } from '@react-three/drei';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { list } from "postcss";
import { Vector3 } from "three";

/**
 * Component that loads and suspends the model
 */
const Girl = (props: any) => {
  const gltf = useLoader(GLTFLoader, props.model) as GLTF;
  
  return (
    <Suspense fallback={<>Loading</>}>
      <primitive position={[8.5,0,0]} object={gltf.scene} onClick={(evt: ThreeEvent<MouseEvent>) => props.handleClick(evt.intersections[0].point)}/>
    </Suspense>
  )
}


interface LocationProps {
  position: [x: number, y: number, z: number],
  scale?: [x: number, y: number, z: number],
  location: string,
  clickHandler (arg0: string): void
}

/**
 * Clickable Location component
 */
const Location = (props: LocationProps) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    props.clickHandler(props.location);
  }

  return (
    <Suspense fallback={null}>
      <mesh position={props.position}
	    scale={props.scale || [1,1,1]}
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerLeave={() => setHover(false)}>
        <sphereGeometry />
        <meshStandardMaterial color={hover ? 0xAAAAAA : 0xFF6666} />
      </mesh>
    </Suspense>
  );
}

interface BodyExamination {
  location: string,
  examination_type: string,
  examination_type_details: string,
  examination_type_comment: string,
  results: string,
  results_comment: string
}

interface BodyNodeProps {
  number: number,
  model: string,
  location_labels: Array<{location: string, location_label: string}>,
  examination_type_labels: Array<{examination_type: string, examination_type_label: string}>,
  examinations: Array<BodyExamination>
}

/**
 * Component that provides a closeable, absolutely rendered modal
 */
const Modal: React.FC<{onClose: Function}> = ({onClose, children}) => {
  return (
    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[65ch] p-4 shadow-lg shadow-black/50 rounded-md bg-white dark:bg-gray-90 z-40">
      <button className="absolute top-2 right-2" onClick={() => onClose()}>
	<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
	  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
	</svg>
      </button>
      { children }
    </div>
  );
}

/**
 * Component that provides number of remaining tries
 */
const Tries = (props: { remaining: number } ) => {
  return (
    <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-white
      text-black shadow-md shadow-black/25 dark:bg-black
      dark:text-white dark:shadow-black">
      { props.remaining } Untersuchungen verbleibend
    </div>
  );
}

/**
 *
 */
interface BodyExamination {
  examination_type: string,
  examination_type_details: string,
  examination_type_comment: string,
  location: string,
  results: string,
  results_comment: string
}

/**
 *
 */
interface BodyNodeProps {
  examinations: Array<BodyExamination>,
  examination_type_labels: Array<{
    examination_type: string,
    examination_type_label: string
  }>,
  model: string,
  location_labels: Array<{
    location: string,
    location_label: string
  }>,
  tries: number
}

/**
 *
 */
export const BodyNode = (props: BodyNodeProps) => {
  const [chosenExaminations, setChosenExaminations] = useState(([] as Array<BodyExamination>));
  const [markerPosition, setMarkerPosition] = useState(new Vector3(0,0,0));
  const [modal, setModal] = useState<ReactFragment | null>(null);

  // Explain and append chosen Examination to chosenExaminations
  const openLocation = (location: string) => {
    setModal(<div className="divide-y">
      <header className="font-xl">
	{labelLocation(location)}
      </header>
        <ul>
	{ props.examinations
	       .filter(x => x.location == location)
	       .filter(x => !chosenExaminations.includes(x))
	       .map((x, i) =>
		 <li key={i}>
		   <span onClick={ () => chooseExamination(x) }>{ labelExamination(x.examination_type)}</span>
		   <span onClick={ () => previewExamination(x) }>(i)</span>
		 </li>
	       )
	}
	</ul>
    </div>);
  }

  // Explain and append chosen Examination to chosenExaminations
  const chooseExamination = (examination: BodyExamination) => {
    if (!chosenExaminations.includes(examination)) {
      setModal(<div className="divide-y">
        <header className="font-xl">
	  {labelLocation(examination.location)}
	  –
	  {labelExamination(examination.examination_type)}
	</header>
        <div dangerouslySetInnerHTML={{__html: examination.results}}></div>
      </div>);
      setChosenExaminations([...chosenExaminations, examination]);
    } else {
      // todo flash auch wenn eigentlich nicht applicable
    }
  }

  // Display possible results for a given examination
  const previewExamination = (examination: BodyExamination) => {
    setModal(<div className="divide-y">
      <header className="font-xl">
	{labelLocation(examination.location)}
	–
	{labelExamination(examination.examination_type)}
      </header>
      <div dangerouslySetInnerHTML={{__html: examination.examination_type_comment}}></div>
    </div>);
  }

  // fetch localized label for a given location
  const labelLocation = (location: string) =>
    props.location_labels.find(l => l.location === location)?.location_label;

  // fetch localized label for a given examination
  const labelExamination = (examination: string) =>
    props.examination_type_labels.find(x => x.examination_type === examination)?.examination_type_label;

  const shadow: {
    blur: number;
    opacity?: number | undefined;
    position?: [x: number, y: number, z: number] | undefined;
  } = { blur: 2, opacity: 0.5, position: [0, 0, 0] };

  // show results if count of chosen examinations is equal to or exceeds number
  // of tries
  if (chosenExaminations.length < props.tries) {
    return (
      <div className="relative">
        { modal ? <Modal onClose={() => setModal(null)}>{ modal }</Modal> : null }
        <Tries remaining={ props.tries - chosenExaminations.length }/>
        <div>
	  <ul>
	    { props.examinations.filter(x => !chosenExaminations.includes(x)).map((x, i) =>
              <li key={i}>
		<span onClick={ () => chooseExamination(x) }>{x.location} - {x.examination_type}</span>
		<span onClick={ () => previewExamination(x) }>(i)</span>
	      </li>
	    ) }
          </ul>
	</div>
	<Canvas className="!h-screen z-0">
	  <OrbitControls />
	  <Suspense fallback={null}>
	    <Environment preset="studio" background={false} />
	    <Stage contactShadow={shadow} adjustCamera intensity={1}
		   preset="rembrandt">
	      <Girl model={props.model} clickHandler={openLocation} />
	      <mesh position={markerPosition}
		    scale={[1,1,1]}>
		<sphereGeometry />
		<meshStandardMaterial color={0xAAAAAA} />
	      </mesh>
	      { true ? <>
		<Location location='after' position={[0,1.1,-0.75]} scale={[1,0.75,0.75]} clickHandler={openLocation} />
		<Location location='eyes' position={[0,6,0]} scale={[0.75,0.25,0.25]} clickHandler={openLocation} />
		<Location location='fingers' position={[-5.75,4.125,-0.75]} scale={[0.5,0.25,0.5]} clickHandler={openLocation} />
		<Location location='fingers' position={[5.75,4.125,-0.75]} scale={[0.5,0.25,0.5]} clickHandler={openLocation} />
		<Location location='genital' position={[0,0.75,0]} scale={[0.75,0.5,0.75]} clickHandler={openLocation} />
		<Location location='throat' position={[0,5,-0.75]} scale={[0.5,0.5,0.5]} clickHandler={openLocation} />
		<Location location='heart' position={[0.125,3.75,0]} scale={[0.5,0.5,0.5]} clickHandler={openLocation} />
		<Location location='head' position={[0,6.2,-0.75]} clickHandler={openLocation} />
		<Location location='lungs' position={[0,3.5,0]} scale={[1,1.2,0.75]} clickHandler={openLocation} />
		<Location location='mouth' position={[0,5.5,0]} scale={[0.5,0.25,0.25]} clickHandler={openLocation} />
		<Location location='ears' position={[-1,6,-0.6]} scale={[0.25,0.3,0.3]} clickHandler={openLocation} />
		<Location location='ears' position={[1,6,-0.6]} scale={[0.25,0.3,0.3]} clickHandler={openLocation} />
		<Location location='ears' position={[1,6,-0.6]} scale={[0.25,0.3,0.3]} clickHandler={openLocation} />
		<Location location='visceral_abdominal' position={[0,2,0]} scale={[1,1,1]} clickHandler={openLocation} />
	      </> : <>
	      </> }
	    </Stage>
	  </Suspense>
	</Canvas>
	<p className="text-xs">"Female Base Mesh" (https://skfb.ly/oqGHQ) by Odami_3D is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
    </div>
    );
  } else {
    return (
      <>
      { chosenExaminations.map((x, i) =>
	<div key={i} className="mb-2 p-2 rounded-md divide-y bg-white shadow-md shadow-black/25 dark:bg-black dark:shadow-black">
	  <header>
	    { labelLocation(x.location) }
	    –
	    { labelExamination(x.examination_type) }
	  </header>

          <div>
            <span className="text-sm text-gray-75">Resultate:</span>
	    <div dangerouslySetInnerHTML={{__html: x.results}}></div>
	  </div>

          <div>
            <span className="text-sm text-gray-75">Kommentar:</span>
	    <div dangerouslySetInnerHTML={{__html: x.results_comment}}></div>
	  </div>
	</div>) }
	</>
    );
  }
}
