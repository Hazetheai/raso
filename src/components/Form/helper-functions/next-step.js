import { wrap } from "res/lib";

export function calcNextStep(steps, currentStep) {
  return steps[
    wrap(
      steps.map((el) => el.tabId).indexOf(currentStep.tabId) + 1,
      0,
      steps.length - 1
    )
  ];
}
