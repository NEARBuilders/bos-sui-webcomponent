# bos-sui-webcomponent

—> [near-bos-webcomponent](https://www.npmjs.com/package/@bbface/near-bos-webcomponent-livepeer) with [Sui](https://docs.sui.io/) and [Enoki](https://docs.enoki.mystenlabs.com/) integration , deployed to [web4](https://web4.near.page/), in order to provide a sandbox for builders wanting to create decentralized Sui apps.

## Getting Started

To run locally, install packages:

```bash
yarn install
```

Then, run the command:

```bash
yarn run dev
```

This will serve the widgets from `http://127.0.0.1:8080/` and start a local gateway.

## Usage

You can run the local gateway with `yarn run start`, then open `localhost:3000/trylivepeer.near/widget/index`,
then navigate to the sandbox.

The goal of this project is to expose the below components through the Near Social VM, so that these keywords may be used in Widgets.

## Attributes

The `near-social-viewer` web component supports several attributes:

* `src`: the src of the widget to render (e.g. `devs.near/widget/default`)
* `code`: raw, valid, stringified widget code to render (e.g. `"return <p>hello world</p>"`)
* `initialprops`: initial properties to be passed to the rendered widget.
* `rpc`: rpc url to use for requests within the VM
* `network`: network to connect to for rpc requests & wallet connection

## Configuring VM Custom Elements

Since [NearSocial/VM v2.1.0](https://github.com/NearSocial/VM/blob/master/CHANGELOG.md#210), a gateway can register custom elements where the key is the name of the element, and the value is a function that returns a React component. For example:

```javascript
initNear({
  customElements: {
    Link: (props) => {
      if (!props.to && props.href) {
        props.to = props.href;
        delete props.href;
      }
      if (props.to) {
        props.to = sanitizeUrl(props.to);
      }
      return <Link {...props} />;
    },
  },
});
```

This is a helpful feature for exposing packages and component libraries that otherwise cannot be accessed through an iframe in typical Widget development. It enables developers to provide a sandbox for builders wanting to build with these elements without going through all the setup.

To distribute a specialized near-bos-webcomponent with its own custom elements:

1. Use the [template](https://github.com/new?template_name=near-bos-webcomponent&template_owner=NEARBuilders) to create a new web component
2. Install the necessary packages and add the custom VM element to `initNear` function
3. Build and distribute the resulting `/dist`

Then, the path to this dist can be referenced via the `-g` flag with [bos-workspace](https://github.com/nearbuilders/bos-workspace).

```cmd
bos-workspace dev -g ./path/to/dist
```

This will start a local dev server using the custom gateway, so you may develop your local widgets through it with access to the custom element.

## Running Playwright tests

To be able to run the [playwright](https://playwright.dev) tests, you first need to install the dependencies. You can see how this is done in [.devcontainer/post-create.sh](./.devcontainer/post-create.sh) which is automatically executed when opening this repository in a github codespace.

When the dependencies are set up, you can run the test suite in your terminal:

```bash
yarn test
```

To run tests visually in the playwright UI, you can use the following command:

```bash
yarn test:ui
```

This will open the playwright UI in a browser, where you can run single tests, and also inspect visually.

If you want to use the playwright UI from a github codespace, you can use this command:

```bash
yarn test:ui:codespaces
```

In general it is a good practice, and very helpful for reviewers and users of this project, that all use cases are covered in Playwright tests. Also, when contributing, try to make your tests as simple and clear as possible, so that they serve as examples on how to use the functionality.

## Publishing libraries to NEARFS

For testing how the library would work when used from CDN, you may publish it to NEARFS.

 ```bash
yarn nearfs:publish-library:create:car
```

Take note of the IPFS address returned by this command, which will be used for finding the published library later. An example of what this looks like is `bafybeicu5ozyhhsd4bpz4keiur6cwexnrzwxla5kaxwhrcu52fkno5q5fa`

```bash
NODE_ENV=mainnet yarn nearfs:publish-library:upload:car youraccount.near
```

After uploading, it normally takes some minutes before the files are visible on NEARFS. When going to the expected URL based on the IPFS address we saw above, we will first see the message `Not found`.

This is an example of the NEARFS url, and you should replace with the IPFS address you received above:

<https://ipfs.web4.near.page/ipfs/bafybeicu5ozyhhsd4bpz4keiur6cwexnrzwxla5kaxwhrcu52fkno5q5fa/>
