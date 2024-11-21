import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['preview'];
  previewTarget: Element;

  static values = {
    fullscreen: { type: Boolean, default: false },
  }
  fullscreenValue: boolean;

  fullscreen() { //@ts-ignore
    const rfs = this.previewTarget.requestFullscreen || this.previewTarget.webkitRequestFullScreen || this.previewTarget.mozRequestFullScreen || this.previewTarget.msRequestFullscreen;
    rfs.call(this.previewTarget);
  }

  popOut() {
    let url = window.location.toString();
    url = url.replace(/edit.*/g, '')
    window.open(url, '_blank');
  }
}
