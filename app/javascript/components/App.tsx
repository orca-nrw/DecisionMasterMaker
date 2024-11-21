import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import create from 'zustand';
import {
  devtools,
  persist
} from 'zustand/middleware'
import ErrorBoundary from "./ErrorBoundary";
// UI
import { Archive } from './Archive';
import Modal from './Modal';
import { Notes } from './Notes';
import {
  choice,
  Protocol
} from './Protocol';
// nodes
import {
  BodyNodeProps,
  BodyNode
} from './BodyNode';
import {
  FuseNodeProps,
  FuseNode
} from './FuseNode';
import {
  QuizNodeProps,
  QuizNode
} from "./QuizNode";
import {
  SelfEvaluationNodeProps,
  SelfEvaluationNode
} from "./SelfEvaluationNode";
import {
  StepwiseNodeProps,
  StepwiseDiagnosticNode
} from "./StepwiseDiagnosticNode";
import {
  TextNodeProps,
  TextVideoNode
} from './TextVideoNode';
import {
  ArrowRightIcon
} from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  LightBulbIcon,
  BoltIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/solid';
import { IntroNode } from "./IntroNode";

/**
 * AppContext to share stuff without prop drilling
 * consider immutable
 */
interface AppContextInterface {
  markReady: (arg0: boolean) => void,
  skipTo: (step: number) => void,
  attachments: Attachment[],
  steps: StepProps[],
  title: string,
  gender: string
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    return false;
  }

  return context
}

/**
 * Persisted App State, holds game progress and choices
 */
interface AppState {
  step: number,
  choices: choice[],
  skipTo: (step: number) => void,
  advance: () => void,
  reset: (skipConfirmation?: boolean) => void,
  notes: string
  setNotes: (arg0: string) => void,
  logChoice: (arg0: choice) => void,
  version: number | undefined
}

const initialState = {
  step: 0,
  choices: [] as choice[],
  notes: '',
  version: 1
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
	...initialState,
        skipTo: (step) => set((state) => ({ step: step })),
	advance: () => set((state) => ({ step: state.step + 1 })),
	setNotes: (notes: string) => set((state) => ({ notes: notes })),
	logChoice: (choice: choice) => set((state) => ({ choices: [...state.choices, choice] })),
	reset: () => {
	  set(initialState);
	}
      }),
      {
	name: 'app-storage',
      }
    )
  )
);

type Attachment = {
  title: string,
  body: string,
  files: Array<{
    filename: string,
    url: string
  }>
}

type StepProps = {
  interactable_type: 'BodyNode' | 'FuseNode' | 'QuizNode' | 'SelfEvaluationNode' | 'StepwiseDiagnosticNode' | 'TextVideoNode',
  title: string,
  objective?: string,
  nklm_links: {
      title: string,
      nklm_url: string
    }[],
  params: BodyNodeProps | FuseNodeProps | TextNodeProps | QuizNodeProps | StepwiseNodeProps | SelfEvaluationNodeProps,
  casefile: boolean,
  attachments: Array<Attachment>
}

type PatientProps = {
  id: number,
  title: string,
  gender: string,
  skip: boolean,
  steps: Array<StepProps>,
  attachments: Array<Attachment>,
  setNavAddons: (arg0: React.ReactNode) => void,
  maxScore: number,
  returnToTitle?: () => void,
  tutorial?: boolean,
  returnToMenu?: () => void
}

type AppProps = {
  title: string,
  patients: Array<PatientProps>,
  contact: string,
  tutorial_id: number | null
}

const Case = (props: PatientProps) => {
  const version = useAppStore(state => state.version);
  const steps =
    props.skip ?
      [
        {
          interactable_type: 'IntroNode',
          attachments: [],
	  objective: '',
	  nklm_links: [],
          params: null
        } as StepProps,
        ...props.steps
      ] :
    props.steps;
  const step = useAppStore(state => state.step);
  const choices = useAppStore(state => state.choices);
  const skipTo = useAppStore(state => state.skipTo);
  const incrementStep = useAppStore(state => state.advance);
  const advanceStep = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    incrementStep();
  };
  const [advanceable, setAdvanceable] = useState(false);
  const resetState = useAppStore(state => state.reset);
  const reset = () => {
    resetState();
    if (!props.skip) {
      location.reload();
    }
  }

  useEffect(() => {
    // name and rehydrate store
    useAppStore.persist.setOptions({
      name: props.title
    });
    useAppStore.persist.rehydrate();
    // remove blueprint
    localStorage.removeItem('app-storage');
    // check version
    if (!version || version < initialState.version) {
      localStorage.clear();
      reset();
    }

    if (!props.skip) {
    props.setNavAddons(<div className="flex items-center gap-3">
      <button className="flex flex-col items-center gap-1" onClick={() => setNotesOpen(true)}>
        <img className="w-4 h-4" alt="Notizzettel" src="/notizen.svg"/>
        <span className="text-[0.5rem]">Notizen</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={() => setProtocolOpen(true)}>
        <img className="w-4 h-4" alt="Klemmbrett mit Liste" src="/protokoll.svg"/>
        <span className="text-[0.5rem]">Protokoll</span>
      </button>
    </div>);
    }

    if (steps.slice(0, step).filter(s => s.interactable_type != "TextVideoNode").length < choices.length) {
      advanceStep();
    }
  }, []);

  // don't trigger a rerender whenever state changes:
  const [ctxCache] = useState({
    markReady: setAdvanceable,
    skipTo: skipTo,
    attachments: props.attachments,
    steps: props.steps,
    title: props.title,
    gender: props.gender
  } as AppContextInterface);

  // UI states
  const [notesOpen, setNotesOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);

  return (
    <AppContext.Provider value={ctxCache}>
      {archiveOpen && <Modal onClose={() => setArchiveOpen(false)}>
	<Archive />
      </Modal>}

      {notesOpen && <Modal onClose={() => setNotesOpen(false)}>
	<Notes />
      </Modal>}

      {protocolOpen && <Modal onClose={() => setProtocolOpen(false)}>
	<Protocol />
      </Modal>}

      <div className="relative bg-white">
    <div className="flex flex-col p-3 mx-auto max-w-prose gap-2">
      <div className="flex justify-between gap-6">
	<div className="text-xl font-bold max-w-prose">
	  <p className="text-secondary">Case {props.title.slice(0,4)} – Schritt {step}</p>
	  <p>{props.title.slice(5)} {props.skip && step == 0 && ' - Inhaltsverzeichnis'}</p>
	</div>
	{steps.length > step &&
	 <button className="flex flex-col gap-1 items-center relative p-1 text-black bg-white rounded-md shrink-0" onClick={() => setArchiveOpen(true)}>
	   <img className="w-10 h-10" alt="Klemmbrett mit medizinischem Kreuz" src="/fallakte.svg"/>
	   {steps[step].attachments.length > 0 && <span className="absolute right-0 flex w-3 h-3 top-2 -translate-y-1/3 translate-x-1/3">
	     <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-magenta-100 animate-ping"></span>
	     <span className="relative inline-flex w-3 h-3 rounded-full bg-magenta-100"></span>
	   </span>}
	   <span className="text-xs font-semibold">Fallakte</span>
	 </button>
	}
      </div>
      {steps[step] && steps[step].objective !== '' &&
       <p className="text-black/50 lg:-mt-2 flex flex-wrap gap-1 items-center">
	 Lernziel: {steps[step].objective} {steps[step].nklm_links.map(nklm =>
	   <a title={nklm.title} href={nklm.nklm_url}>
	     <ArrowTopRightOnSquareIcon className="w-4 h-4" />
	   </a>)}
       </p>
      }
      <div className="w-full mx-auto max-w-prose bg-base-200 mt-2">
	<div className="h-1 transition-all bg-secondary" style={{width: 100/steps.length*step + "%"}}></div>
      </div>
    </div>
    {steps.length > step ?
		    <div className="pt-4">
		      <ErrorBoundary>
			{
			  {
			    IntroNode: <IntroNode key={"step-" + step} />,
			    BodyNode: <BodyNode key={"step-" + step} {...steps[step].params as BodyNodeProps} />,
			    FuseNode: <FuseNode key={"step-" + step} {...steps[step].params as FuseNodeProps} />,
			    QuizNode: <QuizNode key={"step-" + step} {...steps[step].params as QuizNodeProps} />,
			    SelfEvaluationNode: <SelfEvaluationNode key={"step-" + step} {...steps[step].params as SelfEvaluationNodeProps} />,
			    StepwiseDiagnosticNode: <StepwiseDiagnosticNode key={"step-" + step} {...steps[step].params as StepwiseNodeProps} />,
			    TextVideoNode: <TextVideoNode key={"step-" + step} {...steps[step].params as TextNodeProps} />,
			  }[steps[step].interactable_type]
			}
		      </ErrorBoundary>
		      <div className="w-full p-3 mx-auto max-w-prose">
			{advanceable && !props.skip &&
			 <button className="w-full p-4 my-6 text-xl font-semibold text-white bg-secondary" onClick={advanceStep}>
			   Zum nächsten Schritt
			 </button>}
			{advanceable && props.skip &&
			 <button className="w-full p-4 my-6 text-xl font-semibold text-white bg-secondary" onClick={reset}>
			   Übersicht
			 </button>}
		      </div>
		    </div>
	    :
		    <div className="w-full mx-auto max-w-prose p-3">
		      <div className="bg-base-200 text-center px-2 md:py-4 lg:py-6 font-bold rounded-lg shadow-lg text-lg">
			<p className="text-secondary text-2xl">Fall abgeschlossen!</p>
			{props.maxScore > 0  && <p>Sie haben {choices.reduce((sum, c) => sum + c.score, 0)} von {props.maxScore} Punkten erreicht</p>}
		      </div>
		      <button className="w-full p-4 my-6 text-xl font-semibold text-white bg-secondary" onClick={reset}>
			Zurück zur Fallübersicht
		      </button>
		    </div>}
      </div>
    </AppContext.Provider>
  );
}

const Nav: React.FC<{ returnToMenu: () => void }> = ({ returnToMenu, children }) => {
  return (
    <div className="flex justify-center p-3 mb-4 text-white bg-primary">
      <div className="flex items-center w-full max-w-prose">
	<div className="flex items-center gap-2 mr-auto hover:cursor-pointer" onClick={returnToMenu}>
	  <img src="/logo.svg" className="w-8 h-8" alt="" />
	  <span className="text-xl font-semibold">
	    DecisionMaster
	  </span>
	</div>
	<div>
	  {children}
	</div>
      </div>
    </div>
  );
}

export const App = (props: AppProps) => {
  const [caseId, setCaseId] = useState<undefined | number>(undefined);
  const [navAddons, setNavAddons] = useState<React.ReactNode>(undefined);

  console.log(props.patients);
  const returnToMenu = () => {
    setCaseId(undefined);
    setNavAddons(undefined);
  }

  return (
    <>
      <Nav returnToMenu={returnToMenu}>
	<div className="flex gap-3 items-center">
	  <button className="flex flex-col items-center gap-1" onClick={() => setCaseId(undefined)}>
	    <img className="w-4 h-4" alt="Notizzettel" src="/homw.svg"/>
	    <span className="text-[0.5rem]">Hauptmenü</span>
	  </button>
	  {navAddons}
	  {props.tutorial_id && <button className="flex flex-col items-center gap-1" onClick={() => setCaseId(props.tutorial_id)}>
	    <img className="w-4 h-4" alt="Fragezeichen in einem Kreis" src="/tutorial.svg"/>
	    <span className="text-[0.6rem]">Hilfe</span>
	  </button>}
	  
	</div>
      </Nav>
      {(caseId !== undefined) && <Case {...props.patients.find(p => p.id == caseId )} key={caseId} setNavAddons={setNavAddons} returnToTitle={returnToMenu} />}
	{caseId === undefined && <div className="p-3 mx-auto max-w-prose">
	  <h1 className="mb-2 text-xl font-bold">Fallauswahl</h1>
	  <ul className="grid items-stretch gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
	    {props.patients.filter(p => p.id !== props.tutorial_id).map((p,i) =>
	      <li key={`patient-button-${p.id}`} className="flex flex-col font-bold hover:cursor-pointer" onClick={() => setCaseId(p.id)}>
		<div className="px-4 py-2 bg-base-200 grow">
		  <div className="text-secondary">Case {i+1}</div>
		  {p.title}
		</div>
		<div className="p-2 text-center text-white bg-secondary">Fall spielen</div>
	      </li>
	    )}
	  </ul>
	  <div>
	    <h2 className="text-xl font-bold">Ihre Rückmeldung verbessert den Decision Master!</h2>
	    <p className="mb-4 text-sm text-neutral/75">
	      Ihr Feedback ist für uns sehr wertvoll, denn es hilft uns, DecisionMaster kontinuierlich zu verbessern und an Ihre Bedürfnisse anzupassen!
	    </p>
	    <div className="flex flex-wrap gap-2">
	      <div className="flex gap-2 px-4 py-4 grow bg-base-200">
		<LightBulbIcon className="hidden w-5 h-5 shrink-0 md:block text-secondary" />
		<div>
		  <h3 className="font-bold">Inhaltliche Anmerkung</h3>
		  <p className="mb-2 text-sm">
		    Sind Ihnen sachliche Fehler aufgefallen, d.h. haben Sie Dinge bemerkt, die nicht korrekt sind?
		  </p>
		  <a href={`mailto:avmz@ukaachen.de?subject=Anregung%20DMM`} className="flex items-center gap-1 font-semibold text-secondary">
		    Kontaktieren Sie uns
		    <ArrowRightIcon className="w-4 h-4" />
		  </a>
		</div>
	      </div>
	      <div className="flex items-start gap-2 px-4 py-4 grow bg-base-200">
		<BoltIcon className="hidden w-5 h-5 shrink-0 md:block text-secondary" />
		<div>
		  <h3 className="font-bold">Fehlermeldung</h3>
		  <p className="mb-2 text-sm">
		    Hat etwas nicht funktioniert oder ist etwas anders gelaufen, als Sie es erwartet haben?
		  </p>
		  <a href={`mailto:avmz@ukaachen.de?subject=Bug%20Report%20DMM%20&body=URL:%20${window.location}%0D%0ABrowser:%20${window.navigator.userAgent}%0D%0ABeschreiben%20Sie%20das%20aufgetretene%20Problem:%0D%0A`} className="flex items-center gap-1 font-semibold text-secondary">
		    Melden Sie einen technischen Fehler
		    <ArrowRightIcon className="w-4 h-4" />
		  </a>
		</div>
	      </div>
            </div>
          </div>
	</div>}
    </>
  );
}
