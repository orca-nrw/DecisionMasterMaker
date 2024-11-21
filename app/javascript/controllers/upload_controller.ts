import { Controller } from "@hotwired/stimulus"

function truncateString(str, num) {
    if (str.length <= num) {
	return str
    }
    return str.slice(0, num) + '...'
}


export default class extends Controller {
    static targets = ['input', 'list'];
    inputTarget: HTMLInputElement;

    static values = {
	files: { type: Array, default: [] },
    }
    filesValue: boolean;

    refresh() {
	const ul = document.createElement('ul');
	[...this.inputTarget.files].forEach((f) => {
	    const li = document.createElement('li');
	    li.innerText = truncateString(f.name, 15);
	    ul.appendChild(li);
	});
	this.listTarget.innerHTML = '<p>Ausgewählte Dateien:</p>';
	this.listTarget.appendChild(ul);
	console.log(this.inputTarget.files);
    }
}
