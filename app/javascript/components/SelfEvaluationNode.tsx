import React, { useEffect, useState } from "react";
import { useAppContext, useAppStore } from "./App";

const faces = ['😭', '☹️', '😕', '🙂', '😀'];
const labels = ['Gar nicht', 'Eher nicht', 'Geht so', 'Schon ziemlich', 'Voll und ganz'];

export type SelfEvaluationChoice = {
  text: string,
  rating: number,
  score: number
}

export interface SelfEvaluationNodeProps {
  prompt: string,
  score: number,
  solution: string
}

export const SelfEvaluationProtocol = (props: {
  choice: SelfEvaluationChoice,
  nodeProps: SelfEvaluationNodeProps
}) => {
  return (
    <>
      <div className="pl-4 mb-4 bg-white border-l-4 border-blue-100 p-default" dangerouslySetInnerHTML={{ __html: props.nodeProps.prompt }} />

      <p className="block mb-2 text-sm font-semibold text-gray-75">Ihre Antwort</p>
      <div className="pl-4 bg-white border-l-4 border-blue-100 p-default" dangerouslySetInnerHTML={{ __html: props.choice.text }} />

      <p className="block mb-2 text-sm font-semibold text-gray-75">Musterlösung</p>
      <p className="pl-4 mb-4 bg-white border-l-4 border-blue-100 p-default" dangerouslySetInnerHTML={{ __html: props.nodeProps.solution }} />

      <p className="block mb-2 text-sm font-semibold text-gray-75">Ihre Einschätzung</p>
      <p className="pl-4 mb-4 bg-white border-l-4 border-blue-100 p-default">
        {faces[props.choice.rating]} {labels[props.choice.rating]}
      </p>
    </>
  );
}

export const SelfEvaluationArchive = (props: SelfEvaluationNodeProps) => {
  return (
    <>
      <div className="pl-4 mb-4 bg-white border-l-4 border-blue-100 p-default" dangerouslySetInnerHTML={{ __html: props.prompt }} />

      <p className="block mb-2 text-sm font-semibold text-gray-75">Musterlösung</p>
      <p className="pl-4 mb-4 bg-white border-l-4 border-blue-100 p-default" dangerouslySetInnerHTML={{ __html: props.solution }} />
    </>
  );
}

export const SelfEvaluationNode = (props: SelfEvaluationNodeProps) => {
  const ctx = useAppContext();
  const logChoice = useAppStore(state => state.logChoice);

  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(2);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (ctx) {
      ctx.markReady(false);
    }
  }, []);

  const advance = () => {
    if (stage == 1 && ctx) {
      logChoice({ text: answer, rating: score, score: props.score/4*score });
      ctx.markReady(true);
    }

    setStage(stage + 1);
  }

  if (props.prompt == '' || props.prompt == null) {
    return <>Fragestellung nicht ausgefüllt!</>;
  }
  if (props.solution == '' || props.solution == null) {
    return <>Musterlösung nicht ausgefüllt!</>;
  }
  if (stage == 0) {
    return (
      <>
        <div className="flex flex-col gap-2 w-full mx-auto max-w-prose p-3">
          <div className="p-6 bg-base-200 rounded-lg shadow-md mb-6 text-center text-lg font-semibold" dangerouslySetInnerHTML={{ __html: props.prompt }} />
          
          <textarea className="rounded-lg shadow-md bg-base-200 p-default border-0 mb-2" cols={30} id="answer" name="answer" rows={10} onBlur={(evt) => setAnswer(evt.target.value)} placeholder="Geben Sie hier Ihre Antwort ein">
          </textarea>
          <button className="my-6 w-full p-4 font-semibold text-xl text-white bg-secondary" onClick={advance}>Mit Musterlösung vergleichen</button>
        </div>
      </>
    );
  }
  if (stage == 1) {
    return (
      <div className="mx-auto w-full max-w-prose p-3">
        <div className="p-6 bg-base-200 rounded-lg shadow-md mb-6 text-center text-lg font-semibold" dangerouslySetInnerHTML={{ __html: props.prompt }}></div>
        <div className="text-xl font-bold mb-4">
	  Ihre Antwort
	</div>
	<div className="bg-base-200 mb-2 p-default">
          {answer}
        </div>
        <div className="text-xl font-bold mb-4">
	  Musterlösung
	</div>
        <p className="bg-base-200 mb-2 p-default" dangerouslySetInnerHTML={{ __html: props.solution }}></p>

	<div className="relative pt-1">
	  <div className="text-xl font-bold mb-4">
	    Wie zutreffend finden Sie Ihre Antwort?
	  </div>
          <div className="flex justify-between">
            <span>Gar nicht</span>
            <span>Voll und ganz</span>
          </div>
          <input
            type="range"
            className="block w-full h-6 p-0 mb-4 rounded-md appearance-none form-range bg-base-200 focus:outline-none focus:ring-0 focus:shadow-none"
            min="0"
            max="4"
            id="customRange1"
            onChange={(evt) => setScore(parseInt(evt.target.value))}
            value={score}
          />
          <div className="flex justify-center">
            <div className="text-center">
              <span className="text-6xl ">{faces[score]}</span><br />
              {labels[score]}
            </div>
          </div>
          <button className="my-6 w-full p-4 font-semibold text-xl text-white bg-secondary" onClick={advance}>Fertig</button>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-prose p-3">
        <div className="p-6 bg-base-200 rounded-lg shadow-md mb-6 text-center text-lg font-semibold" dangerouslySetInnerHTML={{ __html: props.prompt }}></div>
        <div className="text-xl font-bold mb-4">
	  Ihre Antwort
	</div>
	<div className="bg-base-200 mb-2 p-default">
          {answer}
        </div>
        <div className="text-xl font-bold mb-4">
	  Musterlösung
	</div>
        <p className="bg-base-200 mb-2 p-default" dangerouslySetInnerHTML={{ __html: props.solution }}></p>

	<div className="relative pt-1">
	  <div className="text-xl font-bold mb-4">
	    Wie zutreffend finden Sie Ihre Antwort?
	  </div>

	  {faces[score]} {labels[score]}
	</div>
    </div>
  );
}
