import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ['body', 'indicator']
    bodyTarget: Element;
    indicatorTarget: Element;

    static values = {
        bodyClass: { type: String, default: 'hidden' },
        indicatorClass: { type: String, default: 'rotate-180' }
    }
    bodyClassValue: string;
    indicatorClassValue: string;

    toggle(evt: Event) {
        if (evt.target instanceof Element) {
            this.indicatorTarget.classList.toggle(this.indicatorClassValue);
            this.bodyTarget.classList.toggle(this.bodyClassValue);
        }
    }
}
