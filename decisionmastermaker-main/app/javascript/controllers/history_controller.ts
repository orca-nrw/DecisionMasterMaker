import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }
}
