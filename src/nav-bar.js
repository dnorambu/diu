import { LitElement, html } from 'lit-element';

export class NavBar extends LitElement {
  static get properties() {
    return {
      titulo: {
        type: String
      },
      
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        h1 {
            font-size: 1.2em;
            font-weight: normal;
            color: #fff;
            margin: 0px 0px 0px 22px;
            font-size: 40px;
        }
        div {
            background-color: #ff696b;
            display: flex;
            flex-direction: column;
            justify-content: left;
            text-align: left;
            margin: 0px;
            border: 0;
            padding: 10px;
        }
      </style>
      <div>
        <h1>${this.titulo}</h1>
      </div>
    `;
  }

}

customElements.define('nav-bar', NavBar);