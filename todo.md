# TODO

## Improve NWS Fetch Handling

- [ ] **Check the forecast response status before parsing JSON.**
  The forecast request currently calls `response.json()` without first checking `response.ok`. Add the same HTTP-status validation used by the points request so 4xx, 5xx, and rate-limit responses produce a clear application error instead of a confusing JSON or rendering failure.

- [ ] **Review the browser `User-Agent` header.**
  Browsers restrict scripts from setting certain headers, including `User-Agent`. Confirm whether the browser is actually sending this value and verify that the NWS request still complies with its identification requirements. Remove the ineffective client-side header or document the limitation if it cannot be controlled from JavaScript.

- [ ] **Add timeouts to both NWS fetch requests.**
  The geolocation request has a timeout, but the points and forecast network requests can wait indefinitely on a weak mobile connection. Use an `AbortController` or equivalent timeout so the request ends predictably and the user receives a retryable error.

- [ ] **Show fetch and geolocation errors in the page.**
  Errors are currently sent only to `console.error()`, which is not visible to most mobile users. Add a status area near the button that shows loading, permission-denied, timeout, offline, API, and general failure messages. Clear the message after a successful forecast loads.

- [ ] **Make NWS office parsing more robust.**
  The office identifier is currently extracted by assuming a fixed position in the forecast URL after splitting it on `/`. Use the `URL` API or the `cwa` value returned by the NWS points response so the code remains correct if the URL format changes.

- [ ] **Prevent duplicate requests while loading.**
  Multiple taps can start overlapping geolocation prompts and NWS requests, especially on mobile. Disable the fetch button when a request begins, restore it in a `finally` block, and optionally ignore additional clicks until the current request finishes.

- [ ] **Add short-term forecast caching.**
  Repeated requests for the same coordinates can waste network calls and increase the chance of rate limiting. Cache a successful forecast briefly using the coordinates as part of the cache key, and refresh it after a reasonable expiration period or when the user explicitly requests a fresh result.

- [ ] **Render API data more safely.**
  The forecast currently inserts several API values through `innerHTML`. Prefer creating elements and assigning user/API-provided values with `textContent`, and validate the forecast image URL before assigning it to `src`. This reduces the risk of malformed or unexpected API content affecting the page.
