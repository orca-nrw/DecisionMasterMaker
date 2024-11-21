import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    clear() {
        localStorage.clear();
        location.reload();
    }
}
