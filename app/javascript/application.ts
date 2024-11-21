import "@hotwired/turbo-rails"
import "trix"
import "@rails/actiontext"

import "./components/ReactTest"
import "./components/TextVideoNode"
import "./controllers"

if (!('theme' in localStorage)) {
    localStorage.theme = 'system';
}
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