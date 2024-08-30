import "./index.scss";

import Page from "./components/Page/page";

function main() {
  const page = new Page().element;
  document.body.appendChild(page);
}

main();

