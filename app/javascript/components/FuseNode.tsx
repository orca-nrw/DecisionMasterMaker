import React, { ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useAppContext, useAppStore } from "./App";
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

export type FuseNodeChoice = {
  ids: Array<number>,
  score: number
}

interface AnamnesisQuestion {
  id: number,
  frage: string,
  antwort: string,
  grund: string,
  tags: string,
  punkte: number
}

export interface FuseNodeProps {
  caption: string,
  content: Array<AnamnesisQuestion>,
  messages: {
    history: string,
    repeat: string
  },
  number: number
}

export const FuseNodeProtocol = (props: { choice: FuseNodeChoice, nodeProps: FuseNodeProps }) => {
  return (
    <>
      <div className="mb-2">{props.nodeProps.messages.history}:</div>
      {props.choice.ids.map((id, i) =>
        <Explanation question={props.nodeProps.content.find(q => q.id == id) as AnamnesisQuestion} reason={true} key={i} />
      )}
    </>
  );
}

const fuseOptions = {
  keys: [
    "frage",
    "tags"
  ]
}

interface ExplanationProps {
  question: AnamnesisQuestion,
  reason?: boolean
}

/**
 * This Component renders a box displaying the answer to a chosen
 * question, the score for picking said question and optionally
 * the reasoning behind the chosen score.
 * @constructor
 * @param {AnamnesisQuestion} question - The question to answer
 * @param {boolean} reason - Whether to display the reasoning
 */
const Explanation = (props: ExplanationProps) => {
  return (
    <div className="mb-4 bg-base-200 p-default">
      <h1 className="font-bold">
        {props.question.frage} ({props.question.punkte} Pt.)
      </h1>
      {props.reason && <p className="font-semibold">Antwort</p>}
      <p>
        {props.question.antwort}
      </p>
      {props.reason && <>
	<p className="font-semibold">Begründung</p>
	<p>{props.question.grund}</p>
      </>}
    </div>
  );
}

/**
 * This Component provides the interactable for FuseNodes.
 * It renders a picker for questions, which removes questions
 * that have been picked before from the available selection
 * and renders explanations for the picked questions once the
 * available tries have been depleted.
 * @constructor
 * @param {string} caption - User facing prompt for question selection
 * @param {Array<AnamnesisQuestion>} content - Array of AnamnesisQuestions
 * @param {Object} messages - Object containing various User facing messages
 * @param {number} number - number of pickable AnamnesisQuestions
 */
export const FuseNode = (props: FuseNodeProps) => {
  const ctx = useAppContext();
  const logChoice = useAppStore(state => state.logChoice);
  const fuse = new Fuse(props.content, fuseOptions);

  const [flashMessage, setFlashMessage] = useState(<></>);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(fuse.search(''));
  const [remaining, setRemaining] = useState(props.number);
  const [questions, setQuestions] =
    useState([] as Fuse.FuseResult<AnamnesisQuestion>[]);
  const [explanation, setExplanation] = useState(<></>);

  useEffect(() => {
    if (ctx) {
      ctx.markReady(false);
    }
  }, []);

  // filter questions on input change
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
    setFiltered(fuse.search(query));
  }

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    let refId: number | undefined = undefined;
    let inHistory: boolean = false;
    // try to get refId from target element
    if (evt.target instanceof HTMLElement) {
      let refIdAttr = evt.target.getAttribute('data-ref-id');
      inHistory = evt.target.hasAttribute('data-history');
      if (refIdAttr) {
        refId = parseInt(refIdAttr);
      }
    }
    // proceed with valid refId
    if (typeof refId !== 'undefined') {
      const question = filtered.find(q => q.refIndex === refId);
      // proceed with retrieved question
      if (question) {
        // proceed unless already asked
        if (!questions.find(q => q.refIndex === question.refIndex)) {
          const newQuestions = [...questions, question];
          if (remaining == 1 && ctx) {
            logChoice({ ids: newQuestions.map(q => q.item.id), score: newQuestions.reduce((sum, q) => sum + q.item.punkte, 0) });
            ctx.markReady(true);
          }
          setQuestions(newQuestions);
          setRemaining(remaining - 1);
        } else {
          if (!inHistory) {
            flash(props.messages.repeat);
          }
        }
        explain(question.item);
      }
    }
    setQuery('');
    setFiltered([]);
  }

  const flash = (message: string) => {
    setFlashMessage(
      <div className="absolute max-w-xs text-blue-100 bg-white rounded-lg opacity-0 bottom-2 right-2 p-default animate-begone">
        {message}
      </div>
    );
    setTimeout(() => { setFlashMessage(<></>) }, 2000);
  }

  const explain = (question: AnamnesisQuestion) => {
    setExplanation(
      <Explanation question={question} />
    );
  }

  if (remaining > 0) {
    return (
      <div className="p-3 max-w-prose mx-auto w-full">
        {flashMessage}
        {explanation}
        {remaining > 0 ?
          <>
            <div className="p-6 bg-base-200 rounded-lg shadow-md mb-6 text-center text-xl font-semibold mb-2">
              {props.caption}
            </div>
            <p className="text-xl font-bold mb-4">Fragenauswahl</p>
            <input type="text"
              onChange={handleChange}
              className="bg-base-200 shadow-md rounded-lg border-none focus:border-transparent focus:ring-0 w-full p-6"
	      placeholder="Geben Sie hier Ihre Frage ein"
	      value={query}
            />
            <ul className="px-4 pb-6 bg-base-200 shadow-md -translate-y-4 rounded-lg">
              <li className="border-t"></li>
              {filtered.filter((f) => !questions.map((q) => q.item).includes(f.item))
                .map((f, i) =>
                  <li key={i}
                    className="hover:cursor-pointer hover:bg-gray-25 flex gap-2 p-2"
                    onClick={handleClick}
                    data-ref-id={f.refIndex}>
		    <QuestionMarkCircleIcon className="w-5 h-5 shrink-0" />
                    {f.item.frage}
                  </li>
                )}
            </ul>
          </>
          : null}
	{ questions.length > 0 && <>
          <div className="text-xl font-bold mb-4 flex items-center justify-between">
	    <span>{props.messages.history}</span>
	    <div className="inline-block flex gap-1">
	      {[...Array(questions.length)].map(q => <span className="inline-block w-5 h-5 border-2 bg-black rounded-full"></span>)}
	      {[...Array(remaining)].map(q => <span className="inline-block w-5 h-5 border-2 rounded-full"></span>)}
	    </div>
	  </div>
        <ol className="mb-4 font-semibold">
          {questions.map((q, i) =>
            <li key={i}
              className="flex gap-1 items-start hover:cursor-pointer"
              onClick={handleClick}
              data-ref-id={q.refIndex}
              data-history>
	      <QuestionMarkCircleIcon className="shrink-0 h-5 w-5" />
              <p>{q.item.frage}</p>
            </li>
          )}
        </ol></>}
      </div>
    );
  } else {
    return (
        <div className="max-w-prose p-3 mx-auto w-full">
        <div className="mb-4 text-xl font-bold">
	  {props.messages.history}
        </div>
        {questions.map((q, i) =>
          <Explanation question={q.item} reason={true} key={i} />
        )}
	{questions.map(q => q.item.punkte)
		  .reduce((total, curr) => total + curr , 0)}/
	{props.content.map(q => q.punkte)
	      .filter(qp => qp > 0)
	      .sort((a, b) => a > b ? 1 : -1)
	      .slice(props.number * -1)
	      .reduce((total, curr) => total + curr, 0)} Punkte
	</div>
    );
  }
}
