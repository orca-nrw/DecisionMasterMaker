import React, { useEffect, useState } from "react";
import { useAppContext, useAppStore } from "./App";

export type StepwiseNodeChoice = {
  chosenTypes: Array<DiagnosticSelection>,
  score: number
}

interface DiagnosticSelection {
  diagnostic: DiagnosticProps,
  step: number
}

interface DiagnosticProps {
  id: string,
  title: string,
  result: string,
  score: Array<number>
}

export interface StepwiseNodeProps {
  prompt: String,
  button_prompt: String,
  step_count: number,
  types: Array<DiagnosticProps>
}

export const StepwiseDiagnosticProtocol = (props: { choice: StepwiseNodeChoice, nodeProps: StepwiseNodeProps }) => {
  console.log(props.choice);
  return (
    <>
      {props.choice.chosenTypes.map((t, i) =>
        <li key={i}>
          <span className="font-bold">{t.diagnostic.title} (Schritt {t.step + 1}, {t.diagnostic.score[t.step]} Punkte)</span>
          <div dangerouslySetInnerHTML={{ __html: t.diagnostic.result }}></div>
        </li>
      )}
    </>
  );
}

const Explanation = (props: {title: string, step: number, score: number, result: string, muted?: boolean}) => {
  const cls = props.score > 0 && props.muted == undefined ? "bg-success text-white" : "bg-base-200";
  return(
    <li className={`mb-4 p-default ${cls}`}>
      <div className="flex justify-between font-bold">
        <span>{props.title}</span>
        <span>(Schritt {props.step + 1}, {props.score} Punkte)</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.result }}></div>
    </li>
  );
}

export const StepwiseDiagnosticNode = (props: StepwiseNodeProps) => {
  const ctx = useAppContext();
  const logChoice = useAppStore(state => state.logChoice);

  const [step, setStep] = useState(0);
  const [chosenTypes, setChosenTypes] = useState([] as Array<DiagnosticSelection>);

  useEffect(() => {
    if (ctx) {
      ctx.markReady(false);
    }
  }, []);

  useEffect(() => {
      if ((step >= props.step_count || chosenTypes.length >= props.types.length) && ctx) {
        logChoice({ chosenTypes: chosenTypes, score: chosenTypes.reduce((sum, c) => sum + c.diagnostic.score[c.step], 0) });
        ctx.markReady(true);
      }
  }, [step, chosenTypes]);

  const toggleChoice = (evt: React.MouseEvent) => {
    if (evt.target instanceof HTMLElement) {
      evt.target.setAttribute('data-chosen', evt.target.getAttribute('data-chosen') === 'true' ? 'false' : 'true');
      evt.target.classList.toggle('font-bold');
    }
  }

  const submitChoices = () => {
    let chosen = [] as Array<DiagnosticSelection>;
    [...document.querySelectorAll('#diagnostics [data-chosen="true"]')].forEach(d => {
      d.setAttribute('data-chosen', 'false');
      d.classList.remove('font-bold');
      if (props.types.find(t => t.id == d.getAttribute('data-id'))) {
        chosen.push({
          step: step,
          diagnostic: props.types.find(t => t.id == d.getAttribute('data-id')) as DiagnosticProps
        });
      }
      const newChoices = [...chosenTypes, ...chosen];
      setChosenTypes(newChoices);
    });
    advanceStep();
  }

  const advanceStep = () => {
    setStep(step + 1);
  }

  if (!props.step_count) { return <>Schrittzahl nicht festgelegt</> }
  if (!props.prompt) { return <>Fragestellung nicht festgelegt</> }
  if (!props.button_prompt) { return <>Buttontext nicht gesetzt</> }
  if (step + 1 <= props.step_count && chosenTypes.length < props.types.length) {
    return (
      <div className="w-full p-3 mx-auto max-w-prose">
        <ul>
          {chosenTypes.map((t, i) =>
            <Explanation title={t.diagnostic.title} step={t.step} score={t.diagnostic.score[t.step]} result={t.diagnostic.result} key={i} />
          )}
        </ul>

        <div className="flex flex-col p-6 mb-4 text-xl font-semibold text-center rounded-md shadow-md bg-base-200">
          <p className="mb-4 text-secondary">Frage</p>
          {props.prompt}
        </div>
        <div className="flex items-center justify-between mb-4 text-xl font-bold">
          <span>Auswahl für Schritt {step + 1}</span>
          <div className="flex gap-1">
            {[...Array(step)].map(q => <span className="w-5 h-5 bg-black border-2 rounded-full"></span>)}
            {[...Array(props.step_count - step)].map(q => <span className="w-5 h-5 border-2 rounded-full"></span>)}
          </div>
        </div>
        <ul id="diagnostics" className="flex flex-col gap-2 mb-4">
          {props.types
            .filter(
              t => chosenTypes
                .find(chosenType => JSON.stringify(chosenType.diagnostic) == JSON.stringify(t)) == undefined
            )
            .map((t, i) =>
              <li className="p-default bg-base-200 hover:cursor-pointer"
                data-id={t.id}
                key={i}
                onClick={toggleChoice}>
                {t.title}
              </li>
            )
          }
        </ul>
        <button className="w-full p-4 my-6 text-xl font-semibold text-white bg-secondary"
          onClick={submitChoices}>
          {props.button_prompt}
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-full p-3 mx-auto max-w-prose">
        <div className="mb-4 text-xl font-bold">
          Ihre Antworten
        </div>
        <ul>
          {chosenTypes.map((t, i) =>
            <Explanation title={t.diagnostic.title} step={t.step} score={t.diagnostic.score[t.step]} result={t.diagnostic.result} key={i} />
          )}
        </ul>
        <div className="mb-4 text-xl font-bold">
          Außerdem korrekt
        </div>
        <ul>
	  {props.types
		.filter(dt => ! chosenTypes.map(cdt => cdt.diagnostic.id).includes(dt.id)) // don't include chosen types
		.filter(dt => Math.max(...dt.score) > 0) // only include types that have positive score
	        .map(dt => ({...dt, imax: dt.score.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)})) // inject maximum index
	        .sort((a, b) => a.imax >= b.imax ? 1 : -1) // sort by max index so steps get laid out nicely
		.map(sdt =>
		  <Explanation
		  title={sdt.title}
		  step={sdt.imax}
		  score={sdt.score[sdt.imax]}
		  result={sdt.result}
		  muted />)}
        </ul>
	{chosenTypes.map(ct => ct.diagnostic.score[ct.step])
		    .reduce((total, curr) => total + curr, 0)}/
	{props.types
	      .map(dt => Math.max(...dt.score))
	      .filter(max_score => max_score > 0)
	      .reduce((total, curr) => total + curr, 0)} Punkte
      </div>
    );
  }
}
