// Test the Events component
import ReactDOM from "react-dom";
import About from "../views/about/about";
import renderer from "react-test-renderer";

// ensures that the events.tsx can itself render.
it("renders about.tsx without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// checks if the <Logo /> component's img works.
it("renders the VUMS logo", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
  expect(div.querySelector(".vumslogo")).toBeTruthy();
});

it("renders the correct title of the page", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
  expect(div.querySelector("h1").textContent).toBe("");
});

it("renders the photos of the members", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
  expect(div.querySelector(".avatars")).toBeTruthy();
});

it("renders a description text", () => {
  const div = document.createElement("div");
  ReactDOM.render(<About />, div);
  expect(div.querySelector(".descriptionText").textContent).toBe(
    "The Vanderbilt Undergraduate Microbiome Society aims to educate the local community about the microbiome and the field’s latest developments, to promote social and microbial diversity, and to help facilitate the distribution of fresh produce to underprivileged persons in Davidson County."
  );
});

it("matches learn page snapshot", () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});
