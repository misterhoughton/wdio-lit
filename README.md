# Example Test Approaches for Lit using WDIO

The Lit library provides some suggestions for frameworks that can be used to test components:  
https://lit.dev/docs/tools/testing/

[WebDriverIO](https://webdriver.io/) provide some good examples how it can be configured to test components built using Lit:
https://webdriver.io/docs/component-testing/lit

Testing components in isolation is really useful but in practice, many features of the WebDriverIO API seem unsuitable for this approach, particularly when multiple web components are used together.

I've put together examples of two approaches for testing Lit Components using WebDriverIO:

### Component Testing

Suitable for testing independent components in isolation. This approach uses the WDIO browser runner to build and test components within an isolated scope.

### E2E Testing

Preferable when testing multiple components within the context of a page. I've found it significantly more straightforward to develop tests using this method as elements (particularly inputs) are easier to target and manipulate and the overall application state can be easily reset using the `browser.refresh()` command.

Testing an application using WDIO in this way requires that the static application code is built before test execution. The static files are then served via the [WDIO Static Server](https://webdriver.io/docs/static-server-service/) service (see `wdio.e2e.conf` for implementation details) and targeted by the tests.

### Requirements

Node
NPM

## Run the Examples

Install the dependencies:

    npm install

Run the tests:

    npm test
