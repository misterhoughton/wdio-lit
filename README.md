# Lit - Example Test Approaches using WDIO

The [Lit](https://lit.dev) library is an excellent way to develop lightweight web components that can be used very flexibily. Lit provides some suggestions for frameworks that can be used to test components [here](https://lit.dev/docs/tools/testing/).

[WebDriverIO](https://webdriver.io/) provide some good examples how it can be configured to test components built using Lit [here](https://webdriver.io/docs/component-testing/lit).

Testing components in isolation is a really useful but in practice, many features of the WebDriverIO API are unsuited to this approach and preventing component state being polluted by the results of previous tests is very difficult. This is a particular problem when multiple web components are used together in the same context.

I've put together examples of two approaches for testing Lit Components using WebDriverIO:

### Component Testing (`src/Component.test.ts`)

Suitable for testing independent components in isolation. This approach uses the WDIO browser runner to build and test components within an isolated scope.

### E2E Testing (`src/Component.e2e.ts`)

A preferable approach when testing multiple components within a single context. I've found it significantly more straightforward to develop tests using this method as elements (particularly inputs) are easier to target and manipulate and the overall application state can be easily reset using the `browser.refresh()` command.

Testing an application using WDIO in this way requires that the static application code is built before test execution. The static files are then served via the [WDIO Static Server](https://webdriver.io/docs/static-server-service/) service (see `wdio.e2e.conf` for implementation details) and targeted by the tests.

### Requirements

- Node
- NPM

## Run the Examples

Install the dependencies:

    npm install

Run the tests:

    npm test
