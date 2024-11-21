import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['locked'];

    unlock() {
	this.lockedTarget.classList.toggle('locked');
    }
}
