import { LitElement, css, html } from 'lit-element';

export class RoundButton extends LitElement {
  static get properties() {
    return {
      titulo: { type: String },
      sub_content: { type: String },
      m: {type: Number},
      s: {type: Number},
    };
  }
  static get styles() {
    return css`
      h1 {
          font-size: 1.2em;
          font-weight: normal;
          color: #fff;
          font-size: 20px;
          text-align:center;
      }
      div {
          background-color: #ff696b;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          text-align: center;
          margin: 0px;
          border-radius: 50%;
          padding: 0px;
          height: 130px;
          width: 130px;
          margin: auto;
      }
      button {
          outline: none;
          padding: 0px;
          margin: 0px;
          border: 0px;
          width: 100%;
          height: 100%;
          border-radius:50%;
          background-color: rgba(0,0,0,0);
      }
      button:hover {
          background-color: #f94d50;
          cursor: pointer;
      }
      #hms {
          display: none;
      }
      `;
  }

  constructor() {
    super();
    this.m = 0;
    this.s = 0;
  }

  escribir(){
    var hAux, mAux, sAux;
    this.s++;
    if (this.s>59){this.m++;this.s=0;}
    if (this.s<10){sAux="0"+this.s;}else{sAux=this.s;}
    if (this.m<10){mAux="0"+this.m;}else{mAux=this.m;}
    customElements.whenDefined( 'round-button').then( () => {
      this.shadowRoot.getElementById('hms').innerHTML = mAux + ":" + sAux; 
    } )
  }

  cronometrar(){
    this.shadowRoot.getElementById('titulo').style.display = "none";
    this.shadowRoot.getElementById('hms').style.display = "block";
    this.escribir();
    setInterval(this.escribir,1000);
    
  }

  render() {
    return html`
      <div>
        <button @click=${this.cronometrar} type="button">
            <h1 id="titulo">${this.titulo}</h1>
            <h1 id="hms"></h1>
        </button>
      </div>
    `;
  }

}

customElements.define('round-button', RoundButton);