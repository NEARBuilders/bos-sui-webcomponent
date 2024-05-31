const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => (
      <div className="header-container">
        <div className="header-content">
          <Link to={`/${config_index}`}>
            <h1 className="header-title">Chop Sui</h1>
          </Link>
          <div className="flex gap-4">
            <Link to={`/${config_index}?page=Index`}>
              <button className="header-button">Home</button>
            </Link>
            <Link to={`/${config_index}?page=sandbox`}>
              <button className="header-button">Sandbox</button>
            </Link>
            <Link to={`/${config_index}?page=library`}>
              <button className="header-button">Library</button>
            </Link>
          </div>
        </div>
      </div>
    ),
    // customize the footer
    Footer: () => (
      <div className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-content">footer</div>
        </div>
      </div>
    ),
  },
  router: {
    param: "page",
    routes: {
      Index: {
        path: "${config_account}/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      sandbox: {
        path: "${config_account}/widget/page.sandbox",
        blockHeight: "final",
        init: {
          name: "Sandbox",
        },
      },
      library: {
        path: "${config_account}/widget/page.library",
        blockHeight: "final",
        init: {
          name: "Library",
          ...props,
        },
      },
    },
  },
};

return (
  <>
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </>
);
