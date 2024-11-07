import { Controller } from "@hotwired/stimulus";
import { KeyboardEvent } from "react";

export default class extends Controller {
  connect() {
    document.addEventListener('turbo:submit-end', ((e: CustomEvent) => { this.handleSubmit(e) }) as EventListener);
  }

  disconnect() {
    document.removeEventListener('turbo:submit-end', ((e: CustomEvent) => { this.handleSubmit(e) }) as EventListener);
  }

  close() {
    // Remove the modal element so it doesn't blanket the screen
    this.element.remove();

    // Remove src reference from parent frame element
    // Without this, turbo won't re-open the modal on subsequent clicks
    const frame = this.element.closest("turbo-frame");
    if (frame) {
        frame.removeAttribute('src');
    }
  }

  handleKeyup(e: KeyboardEvent) {
    if (e.code == "Escape") {
      this.close();
    }
  }

  handleSubmit = (e: CustomEvent) => {
    if (e.detail.success) {
      this.close();
    }
  }
}