import { Controller } from "@hotwired/stimulus"

// this controller handles data tables listing the examinations of a BodyNode,
// make them sortable and provide edit and deletion links
// TODO: cut out the html generation and instead work on the queried NodeList
//       which would result in much more readble markup
export default class extends Controller {
  static targets = [
    'list', // this is the tbody
  ];

  static values = {
    examinations: Array,
    sortBy: String,
    order: Boolean
  }

  // depending on the order, this returns a fitting comparator
  order = (a, b) => {
    return this.orderValue ? a > b : a < b;
  }

  // this returns an anonymous function to be used to sort the examinations
  sort = () => {
    switch (this.sortByValue) {
      case 'location':
        return (a, b) => this.order(a.location, b.location);
      case 'examination':
        return (a, b) => this.order(a.examination_type, b.examination_type);
      case 'points':
        return (a, b) => this.order(a.points, b.points);
      default:
        return (a, b) => a.location > b.location;
    }
  }

  // these three handle click events on the table headers
  // one click for changing the sorting type, two fot changing order between
  // ascending and descending
  sortLocation = () => {
    if (this.sortByValue == 'location') {
      this.orderValue = !this.orderValue;
    } else {
      this.sortByValue = 'location';
    }
  }

  sortExaminationType = () => {
    if (this.sortByValue == 'examination') {
      this.orderValue = !this.orderValue;
    } else {
      this.sortByValue = 'examination';
    }
  }

  sortPoints = () => {
    if (this.sortByValue == 'points') {
      this.orderValue = !this.orderValue;
    } else {
      this.sortByValue = 'points';
    }
  }

  // sort and rerender the tbody
  rerender = () => {
    // remove the existing tbody
    const list = this.listTarget;
    while (list.lastElementChild) {
      list.removeChild(list.lastElementChild);
    }

    // sort elements and create the required trs
    // this is way too much and should be done in erb instead
    this.examinationsValue.sort(this.sort()).forEach((e,i) => {
      const tr = document.createElement('tr');
      Object.keys(e).forEach(k => {
        if (['location', 'examination_type', 'points'].includes(k)) {
          let td = document.createElement('td');
          td.classList.add('py-2');
          td.innerHTML = e[k];
          tr.appendChild(td);
        }
      });

      let actions = document.createElement('td');
      let edit = document.createElement('a');
      edit.classList.add('mr-2');
      edit.classList.add('p-2');
      edit.classList.add('btn-primary');
      edit.innerHTML = 'Bearbeiten';
      edit.setAttribute('href', `/body_examinations/${ e.id }/edit`);
      edit.setAttribute('data-turbo-frame', 'modal');
      actions.appendChild(edit);
      let remove = document.createElement('a');
      remove.classList.add('p-2');
      remove.classList.add('btn-primary');
      remove.innerHTML = 'Löschen';
      remove.setAttribute('href', `/body_examinations/${ e.id }`);
      remove.setAttribute('data-turbo-method', 'delete');
      remove.setAttribute('data-controller', 'confirm');
      remove.setAttribute('data-action', 'click->confirm#confirmation');
      remove.setAttribute('data-confirm-message-value', 'Untersuchung wirklich löschen?');
      remove.setAttribute('rel', 'nofollow');
      remove.setAttribute('data-method', 'delete');
      actions.appendChild(remove);
      tr.appendChild(actions);

      this.listTarget.appendChild(tr);
    });
  }

  // sort on mount
  async connect() {
    this.rerender();
  }
}
