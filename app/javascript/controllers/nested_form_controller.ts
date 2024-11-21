import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['clear', 'submit'];
  clearTargets: Array<HTMLFormElement>;
  submitTarget: HTMLButtonElement;
  
  connect() {
    document.addEventListener('turbo:submit-end', ((e: CustomEvent) => { this.clear() }) as EventListener);
  }

  disconnect() {
    document.removeEventListener('turbo:submit-end', ((e: CustomEvent) => { this.clear() }) as EventListener);
  }

  
  clear() {
    console.log('succeeds');
    this.clearTargets.forEach((el) => {
      el.value = '';
    });
  }
}
