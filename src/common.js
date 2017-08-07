import constants from "./constants";

export function klass(name) {
  return constants.baseClassName + "-" + name;
}
