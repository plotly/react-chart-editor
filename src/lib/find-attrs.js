export function findAttrs(obj, pattern) {
  let newAttrs;
  let type = typeof obj;
  let attrs = [];
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (!Array.isArray(obj[i]) && typeof obj[i] !== "object") {
        return null;
      }
      if (!!(newAttrs = findAttrs(obj[i]))) {
        for (let j = 0; j < newAttrs.length; j++) {
          if (!pattern || pattern.test(newAttrs[j])) {
            attrs.push("[" + i + "]." + newAttrs[j]);
          }
        }
      }
    }
  } else if (type === "object" || type === "function") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!!(newAttrs = findAttrs(obj[key]))) {
          for (let j = 0; j < newAttrs.length; j++) {
            if (!pattern || pattern.test(newAttrs[j])) {
              attrs.push(
                key + (Array.isArray(obj[key]) ? "" : ".") + newAttrs[j]
              );
            }
          }
        } else {
          if (!pattern || pattern.test(key)) {
            attrs.push(key);
          }
        }
      }
    }
  }

  return attrs.length ? attrs : null;
}
