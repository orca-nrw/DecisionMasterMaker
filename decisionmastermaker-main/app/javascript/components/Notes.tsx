import React from "react";
import { TrixEditor } from "react-trix";
import { useAppStore } from './App';


export const Notes = () => {
    const [notes, setNotes] = useAppStore(state => [state.notes, state.setNotes]);

    const handleEditorReady = (editor: any) => {
        editor.insertHTML(notes);
    }

    const handleChange = (html: string, _: string) => {
        setNotes(html);
    }

    return (
        <div className="notes">
            <div className="text-2xl">Notizen</div>
            <div className="mb-2 text-sm text-gray-75">Platz für Ihre Notizen</div>
            <TrixEditor onChange={handleChange} onEditorReady={handleEditorReady} mergeTags={[]} />
        </div>
    );
}
