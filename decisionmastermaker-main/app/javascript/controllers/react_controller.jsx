import { Controller } from "@hotwired/stimulus"
import React from "react";
import reactDom from "react-dom";

// import all components that should be wrapped by this controller:
// TODO: can this be done dynamically?
import { ReactTest } from "../components/ReactTest";
import { App } from "../components/App";
import { TextVideoNode } from "../components/TextVideoNode";
import { FuseNode } from "../components/FuseNode";
import { QuizNode } from "../components/QuizNode";
import { BodyNode } from "../components/BodyNode";
import { StepwiseDiagnosticNode } from "../components/StepwiseDiagnosticNode";
import { SelfEvaluationNode } from "../components/SelfEvaluationNode";
import ColorSchemeToggle from "../components/ColorSchemeToggle";

const componentMap = {
  'App': App,
  'ColorSchemeToggle': ColorSchemeToggle,
  'FuseNode': FuseNode,
  'ReactTest': ReactTest,
  'TextVideoNode': TextVideoNode,
  'QuizNode': QuizNode,
  'BodyNode': BodyNode,
  'StepwiseDiagnosticNode': StepwiseDiagnosticNode,
  'SelfEvaluationNode': SelfEvaluationNode
}

// this controller wraps around react components so they get turbo-compatible
// lifecycles
export default class extends Controller {
  static values = {
    component: String,
    props: Object
  }

  async connect() {
    console.log(`${this.componentValue} is ready to be mounted`);
    const Component = componentMap[this.componentValue];
    reactDom.render(<Component {...this.propsValue}/>, this.element);
  }
}
