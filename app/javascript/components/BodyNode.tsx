import React, {
  ReactFragment,
  useEffect,
  useState
} from "react";
import Modal from "./Modal";
import {
  useAppContext,
  useAppStore
} from "./App";
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ArrowLeftCircleIcon
} from '@heroicons/react/20/solid';

const location_labels = {
  after: "After",
  ears: "Ohren",
  eyes: "Augen",
  fingers: "Fingerspitzen",
  genital: "Genital",
  head: "Kopf",
  heart: "Herz",
  lungs: "Lunge",
  miscellaneous: "Sonstiges",
  mouth: "Mund, Lippen",
  pulse: "Puls",
  throat: "Hals, Rachen",
  visceral_abdominal: "Viszerales Abdomen",
}

// fetch localized label for a given location
const labelLocation = (location: string) => // @ts-ignore
  location_labels[location] || location;

const examination_labels = {
  auscultation: "Auskultation",
  complex: "Komplex",
  inspection: "Inspektion",
  light_reaction: "Lichtreaktion",
  meningitis: "Meningitis",
  otoscopy: "Otoskopie",
  palpation: "Palpation",
  percussion: "Perkussion",
  smell: "Geruch",
}

// fetch localized label for a given examination
const labelExamination = (examination: string) => //@ts-ignore
  examination_labels[examination] || examination;

export type BodyNodeChoice = {
  ids: Array<number>,
  score: number
}

interface BodyExamination {
  id: number,
  location: string,
  examination_type: string,
  examination_type_details: string,
  examination_type_comment: string,
  results: string,
  results_comment: string,
  points: number
}

export interface BodyNodeProps {
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

export const BodyNodeProtocol = (props: { choice: BodyNodeChoice, nodeProps: BodyNodeProps }) => {
  return (
    <Results chosenExaminations={props.nodeProps.examinations.filter(e =>
      props.choice.ids.includes(e.id))} />
  );
}


const Result = (props: {title: string, score: number, result: string, comment: string, muted?: boolean}) => {
  const cls = props.score > 0 && props.muted == undefined ? "bg-success text-white" : "bg-base-200";
  return(
    <li className={`mb-4 p-default ${cls}`}>
      <div className="flex justify-between font-bold">
        <span>{props.title}</span>
        <span>({props.score} Pt.)</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.result }}></div>
      <div dangerouslySetInnerHTML={{ __html: props.comment }}></div>
    </li>
  );
}

const Results = (props: { chosenExaminations: Array<BodyExamination> }) => {
  const containerStyles = 'mb-2 p-2 ' +
    'divide-y rounded-md bg-white ' +
    'shadow-md shadow-black/25 ';
  return (
    <>
      {props.chosenExaminations.map((x, i) =>
	<Result title={`${labelLocation(x.location)}: ${labelExamination(x.examination_type)}`} result={x.results} comment={x.results_comment} score={x.points} />
      )}
    </>
  );
}

export const BodyNode = (props: BodyNodeProps) => {
  const ctx = useAppContext();
  const logChoice = useAppStore(state => state.logChoice);

  const [previewArea, setPreviewArea] = useState('');
  const [area, setArea] = useState('');
  const [chosenExaminations, setChosenExaminations] = useState([] as Array<BodyExamination>);
  const [modal, setModal] = useState<ReactFragment | null>(null);

  useEffect(() => {
    if (ctx) {
      ctx.markReady(false);
    }
  }, []);

  const previewExamination = (examination: BodyExamination) => {
    setModal(<>
      <div dangerouslySetInnerHTML={{ __html: examination.examination_type_comment }} />
    </>);
  }

  const chooseExamination = (examination: BodyExamination) => {
    setModal(<>
      <div dangerouslySetInnerHTML={{ __html: examination.results }} />
    </>);
    const newExaminations = [...chosenExaminations, examination];
    if (newExaminations.length >= props.tries && ctx) {
      logChoice({ ids: newExaminations.map(e => e.id), score: newExaminations.reduce((sum, e) => sum + e.points, 0) });
      ctx.markReady(true);
    }
    setChosenExaminations(newExaminations);
    setArea('');
  }

  return (
    <div className="mx-auto w-full max-w-prose p-3">
      {modal && <Modal onClose={() => setModal(null)}>{modal}</Modal>}

      {chosenExaminations.length < props.tries &&
      <div className="py-6 -mt-3 mb-4 bg-base-200 flex justify-center shadow-lg">
	<img alt="" src={`/body/${ctx ? ctx.gender : 'b'}_${area || previewArea}.png`}/>
      </div>}

    
      {chosenExaminations.length < props.tries && area == '' && <>
            <div className="text-secondary font-bold text-center py-2 mb-2">Untersuchungsbereich</div>
            <ul className="grid grid-cols-3 gap-2 mb-6">
              {[...new Set(props.examinations.map(e => e.location))].map(l => props.location_labels.find(ll => ll.location == l)).sort((a, b) => {
                if (a && b) {
                  const A = a.location_label.toUpperCase();
                  const B = b.location_label.toUpperCase();
                  if (A < B) { return -1 }
                  if (A > B) { return 1 }
                }
                return 0;
              }).map((l, i) => <React.Fragment key={i}>
                {l &&
		 <li className="text-center p-2 rounded-md bg-base-200 hover:font-bold hover:cursor-pointer"
		     onClick={() => setArea(l.location)}
		     onMouseEnter={() => setPreviewArea(l.location)}
		     onMouseLeave={() => setPreviewArea('')}>
                  {l.location_label}
                </li>}
              </React.Fragment>)}
            </ul>
      </>}
      {chosenExaminations.length < props.tries && area != '' && <>
        <div className="flex py-2 items-center text-secondary justify-between after:content-[''] mb-2" onClick={() => setArea("")}>
	    <ArrowLeftCircleIcon className="w-5 h-5 shrink-0 hover:cursor-pointer" />
            <div className="font-bold text-center">
	      Untersuchungsbereich {labelLocation(area)}
	    </div>
	</div>

            <ul className="flex flex-col gap-2 mb-6">
              {props.examinations.filter(e => !chosenExaminations.map(ce => ce.id).includes(e.id)).filter(e => e.location == area).map((e, i) => <>
                <li className="flex items-center justify-between p-2 rounded-md bg-base-200 hover:font-bold hover:cursor-pointer before:content-['']" key={i}>
                  <span onClick={() => chooseExamination(e)}>{labelExamination(e.examination_type)} {e.examination_type_details && <>({e.examination_type_details})</>}</span>
                  <span onClick={() => previewExamination(e)}>
                    <InformationCircleIcon className="inline-block w-5 h-5" />
                  </span>
                </li>
              </>)}
            </ul>
      </>}
    
    <div className="text-xl font-bold mb-4 flex items-center justify-between">
    <span>Gewählte Untersuchungen</span>
    <div className="inline-block flex gap-1">
    {[...Array(chosenExaminations.length)].map(q => <span className="inline-block w-5 h-5 border-2 bg-black rounded-full"></span>)}
    {[...Array(props.tries - chosenExaminations.length)].map(q => <span className="inline-block w-5 h-5 border-2 rounded-full"></span>)}
    </div>
    </div>
    <ol className="mb-4">
    {chosenExaminations.map((x, i) =>
	<Result title={`${labelLocation(x.location)}: ${labelExamination(x.examination_type)}`} result={x.results} comment={x.results_comment} score={x.points} />
    )}
    </ol>

    </div>
  );
}
