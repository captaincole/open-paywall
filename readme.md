# Open Paywall - The First Open Source Cross-Framework Paywall Component

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

Integrating a paywall into your website to get paid for your content should be easy. Unforutantly, payment provider systems do a great job at accepting payments, but a poor job of making it easy to integrate the paywall into your website. Their implementations hide behind fancy javascript that statically defines your payments.
<p align="center">
  <img style="margin: auto;" src="https://github.com/thielCole/open-paywall/blob/master/premium-hipster.gif" width="500" height="500">
</p>

Open Paywall makes it dead simple to integrate payments into your system. Add our script tag, and then include this simple html component in your website that can be built with any framework, or no framework at all.

```html
<head>
  <script src="https://unpkg.com/open-paywall@0.0.1/dist/open-paywall.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
</head>
...
<body>
  <div class="premium-container">
    <open-paywall provider="stripe" cost="1500" access-token="your-token">
      <div class="premium-content">Your Permium Content Here!</div>
    </open-paywall>
  </div>
...
</body>
<script>
  document.addEventListener('paymentMade', (event) => {
    console.log('Payment Made');
    document.querySelector('.premium-content').style.display = 'block';
  });
<script>
```

## How It Works

First you select your provider. At the moment we only handle stripe.js integrations but we plan on adding several more later on in the project. 

Then you configure a certain price and product id for your purchase. The product ID could be related to a individual purchase item, or a group of items. In more advanced configurations you can set access based on Group Configurations

Add paywall either around your content, as a redirect link, or as a top level object. Then viola, you now have premium content!

## Custom Backend Support -- Or Use Our Backend Templates

In the /backend directory, you can find a sample backend application that can be easily deployed to your favorite serverless environment (Lambda etc...) to handle transactions. We are working on providing a one click service that will launch this backend service preconfigured for you.

## Cross Framework Component? How Is That Even Possible

Got front end framework fatigue? Well we won't add to that. Our components work accross frameworks and even with vanilla html! 

### Integrate with Angular
It becomes quite simple to integrate with Angular. First, include the script tag in your index.html file

```html
<head>
  <script src="https://unpkg.com/open-paywall@0.0.1/dist/open-paywall.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
</head>
```

Then, in each module you intend to use your paywall, add the CUSTOM_ELEMENTS_SCHEMA to the schemas modules, like below
```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```
### Integrate with React
Just include the two script tages into your index.html file in the /public folder of your react app. Then, integerate your paywall component in any render function.

```html
<!-- public/index.html -->
<head>
  <script src="https://unpkg.com/open-paywall@0.0.1/dist/open-paywall.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
</head>
```

```js
// my-component.js
render() {
...
  <open-paywall provider="stripe" cost="1500" access-token="your-token">
    <div class="premium-content">Your Permium Content Here!</div>
  </open-paywall>
...
}
```


## For Developers
Coming Soon
