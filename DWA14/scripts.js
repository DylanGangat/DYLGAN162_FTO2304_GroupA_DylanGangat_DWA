import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TallyCount extends LitElement {
  static styles = css`
    .container {
      display: flex;
      min-height: 100vh;
      justify-content: center;
      align-items: center;
    }

    .tally {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .total {
      border: 1px solid black;
      padding: 1.5rem 4rem;
      font-size: 2.5rem;
    }

    .buttons {
      display: flex;
      gap: 5rem;
    }

    .reset-message {
      color: red;
    }
  `;

  static properties = {
    count: { type: Number },
    minCount: { type: Number },
    maxCount: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
    this.minCount = -5;
    this.maxCount = 10;
  }

  render() {
    let message = '';

    if (this.count === this.maxCount) {
      message = 'Minimun reached!';
    } else if (this.count === this.minCount) {
      message = 'Maximum reached!';
    }

    return html`
      <div class="container">
        <div class="tally">
          <h1>Tally Count</h1>
          <p class="total" data-tally-amount>${this.count}</p>
          <p class="reset-message" data-reset-message>${message}</p>
          <div class="buttons">
            <button class="danger" @click="${this.subtract}">Decrease</button>
            <button class="neutral" @click="${this.reset}">Reset</button>
            <button class="success" @click="${this.add}">Increase</button>
          </div>
        </div>
      </div>
    `;
  }

  add() {
    if (this.count === this.maxCount) return;
    this.count += 1;
  }

  subtract() {
    if (this.count === -5) return;
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }
}

customElements.define('tally-counter', TallyCount);
