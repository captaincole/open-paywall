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
  @Prop() action: string;
  @Prop() user: string;

  @State() stripe;
  @State() elements;
  @State() card;
  @State() paid: boolean = false;
  @State() paying: boolean = false;
  @State() mounted: boolean = false;
  @Event() paymentMade: EventEmitter;

  stripeStyle = {
    base: {
        color: '#e6ebf1',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
        color: '#e6ebf1'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
  };

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
    this.card = this.elements.create('card', {style: this.stripeStyle});
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
          await this.handleToken(token);
      }
  }

  async handleToken(t) {
    // Post To Action URL
    if (!this.action) {
        // alert('No Server For Payments');
    }

    const body = {
        token: t,
        cost: this.cost,
        user: this.user
    };

    const fetchOptions = {
        body: JSON.stringify(body), // must match 'Content-Type' header
        headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
    };

    let serverResponse;
    try {
        serverResponse = await fetch(this.action, fetchOptions);
    } catch (err) {
        console.warn(err);
        alert('Server Error');
    }
    this.paid = true;
    this.paymentMade.emit(serverResponse);
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
            <button class="purchase" onClick={(e) => this.purchase(e)}>PREMIUM HIPSTERS ONLY</button>
        </div>
    );
    
    const paywall = (
        <div class="paywall payments">
            <form onSubmit={(e) => this.charge(e)}>
                <div class="card-form">
                    <label>
                    Upgrade To Premium Hipster Status
                    </label>
                    <div id="card-element">
                    </div>
                    <div id="card-errors" role="alert"></div>
                </div>
                <button>UPGRADE $15</button>
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
