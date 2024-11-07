import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useAppContext, useAppStore } from "./App";
import { BodyNodeChoice, BodyNodeProps, BodyNodeProtocol } from './BodyNode';
import { FuseNodeChoice, FuseNodeProps, FuseNodeProtocol } from './FuseNode';
import { QuizNodeChoice, QuizNodeProtocol, QuizNodeProps } from "./QuizNode";
import { SelfEvaluationChoice, SelfEvaluationProtocol, SelfEvaluationNodeProps } from "./SelfEvaluationNode";
import { StepwiseNodeChoice, StepwiseDiagnosticProtocol, StepwiseNodeProps } from "./StepwiseDiagnosticNode";


export type choice = BodyNodeChoice | FuseNodeChoice | QuizNodeChoice | SelfEvaluationChoice | StepwiseNodeChoice;

export const Protocol = () => {
    const ctx = useAppContext();
    const step = useAppStore(state => state.step);
    const choices = useAppStore(state => state.choices);
    return (
        <>
            <div className="text-2xl">Protokoll</div>
            <div className="text-sm text-gray-75">
                Die von Ihnen getroffenen Entscheidungen
            </div>
            {ctx && ctx.steps.slice(0, step).filter(s => s.interactable_type != "TextVideoNode").map((s, i) =>
                <React.Fragment key={i}>
                    {s.interactable_type !== 'TextVideoNode' && <ProtocolEntry title={s.title}>
                        {{
                            BodyNode: <BodyNodeProtocol choice={choices[i] as BodyNodeChoice} nodeProps={s.params as BodyNodeProps} />,
                            FuseNode: <FuseNodeProtocol choice={choices[i] as FuseNodeChoice} nodeProps={s.params as FuseNodeProps} />,
                            QuizNode: <QuizNodeProtocol choice={choices[i] as QuizNodeChoice} nodeProps={s.params as QuizNodeProps} />,
                            SelfEvaluationNode: <SelfEvaluationProtocol choice={choices[i] as SelfEvaluationChoice} nodeProps={s.params as SelfEvaluationNodeProps} />,
                            StepwiseDiagnosticNode: <StepwiseDiagnosticProtocol choice={choices[i] as StepwiseNodeChoice} nodeProps={s.params as StepwiseNodeProps} />,
                        }[s.interactable_type]}
                    </ProtocolEntry>}
                </React.Fragment>
            )}
        </>
    );
}

const ProtocolEntry: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full p-2 mt-2 bg-neutral-200 rounded-md">
            <span>{title}</span>
            <ChevronRightIcon className={`shrink-0 w-5 h-5 ${open && 'rotate-90 transform'}`} /></Disclosure.Button>
          <Disclosure.Panel className="px-4 py-2">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
