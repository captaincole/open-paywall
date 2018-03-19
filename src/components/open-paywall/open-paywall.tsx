import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'open-paywall',
  styleUrl: 'open-paywall.css',
  shadow: true
})
export class OpenPaywall {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, World! I'm Open Paywall
      </div>
    );
  }
}
