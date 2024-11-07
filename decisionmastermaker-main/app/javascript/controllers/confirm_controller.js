import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = {
        message: String
    }

    confirmation(evt) {
        let confirmed = confirm(this.messageValue)
        if (!confirmed) { evt.preventDefault(); }
    }
}
