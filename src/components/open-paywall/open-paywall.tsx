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
  @State() paying: boolean = false;
  @State() mounted: boolean = false;
  @Event() paymentMade: EventEmitter;

  componentDidLoad() {
    // Check For Stripe
  }
  componentDidUpdate() {
      if (!this.paid && !this.mounted && this.paying) {
          this.createElements();
      }
  }

  createElements() {
    if (Stripe) {
        this.stripe = Stripe(this.accessToken);
        console.log('Loaded Stripe Access Token');
    } else {
        console.log('Stripe Isnt Loaded');
    }
    this.elements = this.stripe.elements();
    const style = {};
    this.card = this.elements.create('card', {style: style});

    this.card.mount('#card-element');
    this.mounted = true;
  }

  purchase(e) {
    e.preventDefault();
    console.log('Trying To Pay');
    this.paying = true;
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
    const wallStyle = {
        filter: 'none',
        display: 'block',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        'z-index': '10',
    };

    const wall = (
        <div class="wall" style={wallStyle}>
            <button class="purchase" onClick={(e) => this.purchase(e)}>Purchase Premium Hipster</button>
        </div>
    );
    
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
        if (this.paying) {
            return paywall;
        } else {
            return wall;
        }
    } else {
        return null;
    }
  }
}
