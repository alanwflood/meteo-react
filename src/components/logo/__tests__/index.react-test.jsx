import React from "react";
import renderer from "react-test-renderer";
import Logo from "../index";

test("Logo Renders", () => {
  const component = renderer.create(<Logo />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
