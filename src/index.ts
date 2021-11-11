/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Base64 from "crypto-js/enc-base64";
import HmacSHA1 from "crypto-js/hmac-sha1";
import CryptoJS from "crypto-js";

/**
 * Create a signature for a path and query string using HmacSHA1.
 *
 * ```ts
 * const signature = createSignatureForPathAndQuery("/some-path?foo=bar", "secret");
 * ```
 * @param unsignedUrl The URL to sign.
 * @param secret The secret to use for signing.
 * @returns The signature of the signed url.
 */
export function createSignatureForPathAndQuery(
  pathAndQuery: string,
  secret: string
): string {
  const decodedSecret = decodeSecret(secret);
  // Sign the url with the decoded secret
  const unsafeSignature = HmacSHA1(pathAndQuery, decodedSecret).toString(
    Base64
  );
  // Convert from true base64 to 'web safe' base64
  return unsafeSignature.replace(/\+/g, "-").replace(/\//g, "_");
}

/**
 * Create a signature for a Google Maps request [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) or url string.
 *
 * ```ts
 * const signature = createSignature("https://example.com/some-path?foo=bar", "secret");
 * ```
 *
 * @param unsignedUrl The URL to sign.
 * @param secret The secret to use for signing.
 * @returns The signature of the signed url.
 */
export function createSignature(
  unsignedUrl: URL | string,
  secret: string
): string {
  if (typeof unsignedUrl === "string") {
    unsignedUrl = new URL(unsignedUrl);
  }
  // Strip off the protocol, scheme, and host portions of the URL, leaving only the path and the query
  const pathAndQuery = `${unsignedUrl.pathname}${unsignedUrl.search}`;

  return createSignatureForPathAndQuery(pathAndQuery, secret);
}

/**
 * Returns a new [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) having a signature parameter.
 *
 * ```ts
 * const signedUrl = signUrl("https://example.com/some-path?foo=bar", "secret");
 * signedUrl.href; // "https://example.com/some-path?foo=bar&signature=..."
 * ```
 *
 * @param unsignedUrl The URL to sign.
 * @param secret The secret to use for signing.
 * @returns The signature of the signed url.
 */
export function signUrl(unsignedUrl: URL | string, secret: string): URL {
  if (typeof unsignedUrl === "string") {
    unsignedUrl = new URL(unsignedUrl);
  }
  return new URL(
    unsignedUrl.toString() +
      "&signature=" +
      createSignature(unsignedUrl, secret)
  );
}

function decodeSecret(secret: string): CryptoJS.lib.WordArray {
  // Convert from 'web safe' base64 to true base64
  const unsafeSecret = secret.replace(/-/g, "+").replace(/_/g, "/");

  // Base64 decode the secret
  return Base64.parse(unsafeSecret);
}
