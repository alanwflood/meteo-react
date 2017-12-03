import React from "react";
import renderer from "react-test-renderer";
import App from "../index";

test("Search Bar renders and Logo Shows", () => {
  const component = renderer.create(<App />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
