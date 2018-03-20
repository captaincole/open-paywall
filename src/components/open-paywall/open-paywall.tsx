import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

declare var Stripe: any;
@Component({
  tag: 'open-paywall',
  styleUrl: 'open-paywall.css',
  shadow: false
})
export class OpenPaywall {

  @Prop() provider: string;
  @Prop() accessToken: string;
  @Prop() cost: number;
  @Prop() serverUrl: string;

  @State() stripe;
  @State() elements;
  @State() card;
  @State() paid: boolean = false;

  @Event() paymentMade: EventEmitter;

  componentDidLoad() {
    // Check For Stripe
    if (Stripe) {
        this.stripe = Stripe(this.accessToken);
        console.log('Loaded Stripe Access Token');
        this.createElements();
    } else {
        console.log('Stripe Isnt Loaded');
    }
  }

  createElements() {
    this.elements = this.stripe.elements();
    const style = {};
    this.card = this.elements.create('card', {style: style});

    this.card.mount('#card-element');
  }

  async charge(e) {
      e.preventDefault();
      console.log('Charging Card', e);
      const {token, err} = await this.stripe.createToken(this.card);

      if (err) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = err.message;
      } else {
          this.handleToken(token);
      }
  }

  handleToken(t) {
    console.log('Handling Token', t);
    this.paid = true;
    this.paymentMade.emit(true);
  }

  render() {
    const paywall = (
        <div class="paywall payments">
            <form onSubmit={(e) => this.charge(e)}>
                <div class="card-form">
                    <label>
                    Credit or debit card
                    </label>
                    <div id="card-element">
                    </div>
                    <div id="card-errors" role="alert"></div>
                </div>
                <button>Charge</button>
            </form>
        </div>);

    if (!this.paid) {
        return paywall;
    } else {
        return null;
    }
  }
}
