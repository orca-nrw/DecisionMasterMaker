import React, {
    useEffect,
    useState
} from 'react';
import { Listbox } from '@headlessui/react'
import {
    SunIcon,
    MoonIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/solid'

const ColorSchemeToggle = () => {
    const [mode, setMode] = useState(localStorage.theme);
    const modes = [
        {
            id: 'light',
            title: 'Light',
            icon: <SunIcon className="inline-block w-5 h-5" />
        },
        {
            id: 'dark',
            title: 'Dark',
            icon: <MoonIcon className="inline-block w-5 h-5" />
        },
        {
            id: 'system',
            title: 'System',
            icon: <ComputerDesktopIcon className="inline-block w-5 h-5" />
        },
    ];

    useEffect(() => {
        localStorage.theme = mode;
        switch (localStorage.theme) {
            case 'system':
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                break;
            case 'dark':
                document.documentElement.classList.add('dark');
                break;
            case 'light':
                document.documentElement.classList.remove('dark');
                break;
        }
    }, [mode]);

    return (
        <div className="relative flex flex-col justify-center">
            <Listbox value={mode} onChange={setMode}>
                <Listbox.Button
                    className="sm:text-sm"
                >
                    {mode === 'system'
                        ? window.matchMedia('(prefers-color-scheme: dark)').matches
                            ? <MoonIcon className="w-5 h-5 text-white/50" />
                            : <SunIcon className="w-5 h-5 text-white/50" />
                        : modes.find(m => m.id === mode)?.icon
                    }
                </Listbox.Button>
                <Listbox.Options className="absolute top-0 right-0 z-10 p-1 bg-white rounded-lg">
                    {modes.map((mode) => (
                        <Listbox.Option
                            key={mode.id}
                            value={mode.id}
                            className="flex items-center gap-1 p-2 rounded-md ui-active:bg-blue-100 ui-active:text-white ui-not-active:bg-transparent ui-not-active:text-black hover:cursor-pointer"
                        >
                            {mode.icon}
                            <span>{mode.title}</span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}

export default ColorSchemeToggle;