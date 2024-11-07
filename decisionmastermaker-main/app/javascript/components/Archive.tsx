import React from "react";
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useAppContext, useAppStore } from "./App";
import { TextVideoNode, TextNodeProps } from './TextVideoNode';
import { SelfEvaluationArchive, SelfEvaluationNodeProps } from './SelfEvaluationNode';

export const Archive = () => {
  const ctx = useAppContext();
  const step = useAppStore(state => state.step);
  return (
    <>
      <div className="text-2xl">Fallakte</div>
      <div className="text-sm text-gray-75">Die gesammelten Informationen des Falls auf einen Blick</div>
          {ctx && ctx.attachments.map((a, i) =>
            <ArchiveEntry key={i} title={ctx.title + ': ' + a.title}>
              {a.files.length > 0 && <ul className="grid gap-2 mb-4 md:grid-cols-2 lg:grid-cols-4">
                {a.files.map((f, i) =>
                  <li className="flex relative justify-center items-center p-4 rounded-lg hover:bg-gray-25" key={i}><a href={f.url} target="_blank">{f.filename}</a></li>
                )}
              </ul>}
              <p dangerouslySetInnerHTML={{ __html: a.body }}></p>
            </ArchiveEntry>
          )}
          {ctx && ctx.steps.slice(0, step).map((s, i) =>
            <React.Fragment key={i}>
              {s.casefile && <ArchiveEntry title={s.title}>
                {{
                  BodyNode: <></>,
                  FuseNode: <></>,
                  QuizNode: <></>,
                  SelfEvaluationNode: <SelfEvaluationArchive {...s.params as SelfEvaluationNodeProps} />,
                  StepwiseDiagnosticNode: <></>,
                  TextVideoNode: <TextVideoNode {...s.params as TextNodeProps} />,
                }[s.interactable_type]}
              </ArchiveEntry>}
              {s.attachments.map((a, i) =>
                <ArchiveEntry key={i} title={s.title + ': ' + a.title}>
                  {a.files.length > 0 && <ul className="grid gap-2 mb-4 md:grid-cols-2 lg:grid-cols-4">
                    {a.files.map((f, i) =>
                      <li className="flex relative justify-center items-center p-4 rounded-lg hover:bg-gray-25" key={i}><a href={f.url} target="_blank">{f.filename}</a></li>
                    )}
                  </ul>}
                  <p dangerouslySetInnerHTML={{ __html: a.body }}></p>
                </ArchiveEntry>
              )}
            </React.Fragment>
          )}
          {ctx && ctx.steps[step].attachments.map((a, i) =>
            <ArchiveEntry key={i} title={ctx.steps[step].title + ': ' + a.title}>
              {a.files.length > 0 && <ul className="grid gap-2 mb-4 md:grid-cols-2 lg:grid-cols-4">
                {a.files.map((f, i) =>
                  <li className="flex relative justify-center items-center p-4 rounded-lg hover:bg-gray-25" key={i}><a href={f.url} target="_blank">{f.filename}</a></li>
                )}
              </ul>}
              <p dangerouslySetInnerHTML={{ __html: a.body }}></p>
            </ArchiveEntry>
          )}
    </>
  );
}

const ArchiveEntry: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between p-2 mt-2 w-full bg-neutral-200 rounded-md">
            <span>{title}</span>
            <ChevronRightIcon className={`shrink-0 w-5 h-5 ${open && 'rotate-90 transform'}`} /></Disclosure.Button>
          <Disclosure.Panel className="py-2 px-4">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
