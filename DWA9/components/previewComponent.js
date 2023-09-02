 import { authors } from "../data.js";
 
 
export class previewComponent extends HTMLElement {
    constructor(image, title, author, published, description){
        super()

        this.image = image;
        this.title = title;
        this.author = author;
        this.published = published;
        this.description = description;

        const shadow = this.attachShadow({mode: "open"})
        
        const template = document.createElement("template");
        template.innerHTML = `
            <dialog class="overlay" data-list-active open>
                <div class="overlay__preview"><img class="overlay__blur" data-list-blur src="${this.image}" /><img class="overlay__image"
                        data-list-image src="${this.image}" /></div>
                <div class="overlay__content">
                    <h3 class="overlay__title" data-list-title>${this.title}</h3>
                    <div class="overlay__data" data-list-subtitle>${authors[this.author]} (${new Date(this.published).getFullYear()})</div>
                    <p class="overlay__data overlay__data_secondary" data-list-description>${this.description}</p>
                </div>

                <div class="overlay__row">
                <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
                </div>
            </dialog>
        `
    shadow.append(template.content.cloneNode(true))

    }
}

customElements.define("preview-component", previewComponent)