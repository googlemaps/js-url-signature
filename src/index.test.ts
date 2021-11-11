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

import {
  createSignatureForPathAndQuery,
  createSignature,
  signUrl,
} from "./index";

describe("createSignatureForPathAndQuery", () => {
  test("get signature for path and query", () => {
    const pathAndQuery =
      "/maps/api/directions/json?avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial";
    const clientSecret = "testClientSecret";

    expect(createSignatureForPathAndQuery(pathAndQuery, clientSecret)).toEqual(
      "YRJoTd6ohbpsR14WkWv3S7H6MqU="
    );
  });

  test("get signature for path and no query", () => {
    const pathAndQuery = "/maps/api/directions/json";
    const clientSecret = "testClientSecret";

    expect(createSignatureForPathAndQuery(pathAndQuery, clientSecret)).toEqual(
      "Xen-RmvzSOffHaCik-54z97Fbws="
    );
  });

  test("get signature for no path and no query", () => {
    const pathAndQuery = "";
    const clientSecret = "testClientSecret";

    expect(createSignatureForPathAndQuery(pathAndQuery, clientSecret)).toEqual(
      "wPYDFS_2Q7bZi6lnUrkmKq0vM44="
    );
  });
});

describe("createSignature", () => {
  test("create signature for URL", () => {
    const unsignedUrl = new URL(
      "https://test.url/maps/api/directions/json?avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial"
    );
    const clientSecret = "testClientSecret";

    expect(createSignature(unsignedUrl, clientSecret)).toEqual(
      "YRJoTd6ohbpsR14WkWv3S7H6MqU="
    );
  });
  test("create signature for string", () => {
    const unsignedUrl =
      "https://test.url/maps/api/directions/json?avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial";
    const clientSecret = "testClientSecret";

    expect(createSignature(unsignedUrl, clientSecret)).toEqual(
      "YRJoTd6ohbpsR14WkWv3S7H6MqU="
    );
  });
});

describe("signUrl", () => {
  test("signed URL has correct signature parameter", () => {
    const unsignedUrl = new URL(
      "https://test.url/maps/api/directions/json?avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial"
    );
    const clientSecret = "testClientSecret";

    const signedUrl = signUrl(unsignedUrl, clientSecret);
    expect(signedUrl.searchParams.get("signature")).toEqual(
      "YRJoTd6ohbpsR14WkWv3S7H6MqU="
    );
  });

  test("accepts string", () => {
    const unsignedUrl =
      "https://test.url/maps/api/directions/json?avoid=ferries&client=testClient&destination=38.8977%2C-77.0365&mode=driving&origin=33.8121%2C-117.9190&units=imperial";
    const clientSecret = "testClientSecret";

    const signedUrl = signUrl(unsignedUrl, clientSecret);
    expect(signedUrl.searchParams.get("signature")).toEqual(
      "YRJoTd6ohbpsR14WkWv3S7H6MqU="
    );
  });
});
