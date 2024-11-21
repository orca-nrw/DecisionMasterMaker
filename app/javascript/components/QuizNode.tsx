import React, { useEffect, useState } from "react";
import { useAppContext, useAppStore } from "./App";

export type QuizNodeChoice = {
  ids: Array<number>,
  score: number
}

interface QuizAnswer {
    id: number,
    text: string,
    points: number,
    explanation: string
}

export interface QuizNodeProps {
    question: string,
    answers: Array<QuizAnswer>,
    messages: {
        noAnswersSelected: string
    },
    multipleChoice: boolean
}

const explain = (answer: QuizAnswer, i: number, muted?: boolean) => {
    let classes = 'mb-2 p-default rounded-md';
    if (!muted) {
      if (answer.points == 0) {
	classes += ' bg-base-200';
      }
      if (answer.points < 0) {
	classes += ' bg-error text-white';
      }
      if (answer.points > 0) {
	classes += ' bg-success text-white';
      }
    } else {
	classes += ' bg-base-200';
    }
    return (
        <li className={classes} key={i}>
            <div className="flex pb-2">
                <span className="font-bold">
                    {answer.text}
                </span>
                <span className="ml-auto">
                    ({answer.points} Pt.)
                </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: answer.explanation }}></div>
        </li>
    );
}

export const QuizNodeProtocol = (props: { choice: QuizNodeChoice, nodeProps: QuizNodeProps}) => {
    return (
        <>
            <div className="mb-4 text-white bg-blue-100 rounded-md p-default">
                <div dangerouslySetInnerHTML={{ __html: props.nodeProps.question }}></div>
            </div>

            <ul className="mb-4">
                {props.nodeProps.answers.filter(a => props.choice.ids.includes(a.id)).map((a, i) => explain(a, i))}
            </ul>
        </>
    );
}

export const QuizNode = (props: QuizNodeProps) => {
    const ctx = useAppContext();
    const logChoice = useAppStore(state => state.logChoice);

    const [answers, setAnswers] = useState([] as QuizAnswer[]);
    const [flashMessage, setFlashMessage] = useState(<></>);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        if (ctx) {
            ctx.markReady(false);
        }
    }, []);

    const handleClick = (evt: React.MouseEvent) => {
        let answerId: number | undefined = undefined;

        if (evt.target instanceof HTMLElement) {
            let answerIdAttr = evt.target.getAttribute('data-answer');
            if (answerIdAttr) {
                answerId = parseInt(answerIdAttr);
            }
        }

        // proceed with valid answerId
        if (typeof answerId !== 'undefined') {
            const answer = props.answers[answerId];
            // proceed with retrieved answer
            if (answer) {
                if (answers.includes(answer)) {
                    setAnswers(answers.filter(a => a !== answer));
                } else {
                    if (props.multipleChoice) {
                        setAnswers([...answers, answer]);
                    } else {
                        setAnswers([answer]);
                    }
                }
            }
        }
    }

    const flash = (message: string, delay: number = 2000) => {
        setFlashMessage(
            <div className="absolute max-w-xs text-white bg-primary rounded-lg opacity-0 bottom-2 right-2 p-default animate-begone">
                {message}
            </div>
        );
        setTimeout(() => { setFlashMessage(<></>) }, delay);
    }

    const handleSubmit = () => {
        if (answers.length === 0) {
            flash(props.messages.noAnswersSelected);
        } else {
            if (ctx) {
                logChoice({ ids: answers.map(a => a.id), score: answers.reduce((sum, a) => sum + a.points, 0) });
                ctx.markReady(true);
            }
            setAnswered(true);
        }
    }

    const answer = (answer: QuizAnswer, i: number) => {
        const classes =
            (answers.includes(answer) ?
                "font-semibold" : // specific styles for selected answers
                ""                // specific styles for unselected answers
            ) + " p-2 rounded-md text-center bg-base-200 hover:cursor-pointer"; // common styles for all answers
        return (
            <li className={classes} key={i} data-answer={i} onClick={handleClick}>
                {answer.text}
            </li>
        );
    }

    if (!props.question) {
        return (
            <div className="mx-auto w-full max-w-prose p-3">Frage fehlt</div>
        );
    }

    if (!answered) {
        return (
            <div className="mx-auto w-full max-w-prose p-3">
                {flashMessage}
                <div className="flex flex-col mb-4 bg-base-200 text-xl shadow-md rounded-md p-6 font-semibold text-center">
                  <p className="text-secondary mb-4">Frage</p>
                    <div dangerouslySetInnerHTML={{ __html: props.question }}></div>
                </div>

                <ul className="grid xl:grid-cols-2 gap-2 mb-4">
                    {props.answers.map((a, i) => answer(a, i))}
                </ul>
                <button className="my-6 w-full p-4 font-semibold text-xl text-white bg-secondary" type="button" onClick={handleSubmit}>Frage beantworten</button>
	    </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-prose p-3">
                {flashMessage}
                <div className="flex flex-col mb-4 bg-base-200 text-xl shadow-md rounded-md p-6 font-semibold text-center">
                  <p className="text-secondary mb-4">Frage</p>
                    <div dangerouslySetInnerHTML={{ __html: props.question }}></div>
                </div>

          <div className="text-xl font-bold mb-4">
	    Ihre Antworten
	  </div>
            <ul className="mb-4">
                {answers.map((a, i) => explain(a, i))}
            </ul>
	    {props.answers
		  .filter(a => a.points > 0)
		  .filter(a => !answers.map(a => a.id)
				       .includes(a.id))
		  .length > 0 && <>
          <div className="text-xl font-bold mb-4">
	    Außerdem korrekt
	  </div>
            <ul className="mb-4">
	    {props.answers
		  .filter(a => a.points > 0)
		  .filter(a => !answers.map(a => a.id)
				       .includes(a.id))
                  .map((a, i) => explain(a, i, true))}
            </ul>
	    </>}
	    {answers.map(a => a.points)
		    .reduce((a, b) => a + b, 0)}/
	    {props.answers.map(a => a.points)
		  .filter(a => a > 0)
		  .reduce((a, b) => a + b, 0)} Punkte
        </div>
    );
}
