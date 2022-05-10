# Google Maps JavaScript URL Signing

[![npm](https://img.shields.io/npm/v/@googlemaps/url-signature)](https://www.npmjs.com/package/@googlemaps/url-signature)
![Build](https://github.com/googlemaps/js-url-signature/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/js-url-signature/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/js-url-signature/branch/main/graph/badge.svg)](https://codecov.io/gh/googlemaps/js-url-signature)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/js-url-signature?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![](https://github.com/jpoehnelt/in-solidarity-bot/raw/main/static//badge-flat.png)](https://github.com/apps/in-solidarity)

## Description

Sign a URL for Google Maps Platform requests.

> **Warning**: It is not recommended to use this library in client side applications to avoid exposing the secret used to sign the URL.

## Install

Available via npm as the package [@googlemaps/url-signature](https://www.npmjs.com/package/@googlemaps/url-signature).

`npm i @googlemaps/url-signature`

## Documentation

Check out the [reference documentation](https://googlemaps.github.io/js-url-signature/index.html).

## Example
Create a signature for a Google Maps request [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) or url string.

 ```ts
const signature = createSignature("https://example.com/some-path?foo=bar", "secret");
```

Returns a new [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) having a signature parameter.

```ts
const signedUrl = signUrl("https://example.com/some-path?foo=bar", "secret");
signedUrl.href; // "https://example.com/some-path?foo=bar&signature=..."
```

Create a signature for a path and query string using Hmac SHA1.

```ts
const signature = createSignatureForPathAndQuery("/some-path?foo=bar", "secret");
 ```

> **Note**: This is not an officially supported Google product
