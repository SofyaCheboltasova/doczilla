import "./index.scss";

import Page from "./components/Page/page";

function main() {
  const page = new Page().page;
  document.body.appendChild(page);
}

main();

