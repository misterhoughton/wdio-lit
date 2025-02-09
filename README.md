# Lit - Example Test Approaches using WDIO

The [Lit](https://lit.dev) library is an excellent way to develop lightweight [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) which can either be used independently or which can be integrated with components from other frameworks such as [React](https://react.dev/) or [Angular](https://www.angular.io/). Lit provides some suggestions for frameworks that can be used to test components [here](https://lit.dev/docs/tools/testing/).

One of the frameworks suggested in the Lit documentation is [WebDriverIO](https://webdriver.io/) and there are some useful examples of how it can be configured to test Web Components built using Lit [here](https://webdriver.io/docs/component-testing/lit).

Testing components in isolation is important, but in practice many features of the WebDriverIO API are unsuited to this approach and preventing component state being polluted by the results of previous tests can be difficult. This is a particular problem when multiple web components are used together in the same context.

I've put together some examples of suitable approaches for testing Lit Components using WebDriverIO:

### Unit Testing (`src/service.unit.ts`)

        npm test:unit

Fast and straightforward. Unit tests can be run against services which contain fewer dependencies and which are shared between components. Mocha is included in WDIO already - no need to introduce any other packages.

### Component Testing (`src/Component.test.ts`)

        npm test:component

Suitable for testing independent components in isolation. This approach uses the WDIO browser runner to build and test components within an isolated scope.

### E2E Testing (`src/Component.e2e.ts`)

        npm test:e2e

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
