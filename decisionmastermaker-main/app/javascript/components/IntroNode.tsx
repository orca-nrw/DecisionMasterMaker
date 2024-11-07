import React, { useEffect } from "react";
import { useAppContext } from './App';

export const IntroNode = () => {
    const ctx = useAppContext();
    if (ctx) {
        return (
            <div className="mx-auto max-w-prose w-full p-3">
                <ol className="list-none p-0">
                    {ctx.steps.map((s, i) =>
                        <li onClick={() => ctx.skipTo(i+1)}
                            className="mb-2 p-default rounded-md bg-black/10 hover:cursor-pointer">
                                {s.title}
                        </li>
                    )}
                </ol>
            </div>
        );
    } else {
        return <></>
    }
}
