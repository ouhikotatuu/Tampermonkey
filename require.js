const valueTypeof = (value, type) => {
  const thisType = Object.prototype.toString.call(value);
  if (!type) {
    return thisType;
  }
  return thisType === `[object ${type}]`;
};
const valueLength = (value) => {
  try {
    return Object.values(value).length;
  } catch (error) {
    return 0;
  }
};
const queryDomNode = (selector) => {
  const domNodeList = document.querySelectorAll(selector);
  if (!domNodeList.length) {
    throw new Error("目标元素未获取成功");
  } else if (domNodeList.length > 1) {
    return domNodeList;
  } else {
    return Array.from(domNodeList).find((e) => e);
  }
};
const isDomNode = (node) => {
  if (["HTML", "Element"].every((e) => valueTypeof(node).includes(e))) {
    return node;
  } else if (valueTypeof(node, "String") && queryDomNode(node)) {
    return queryDomNode(node);
  }
  return null;
};
const createDomNode = (tagName, options = {}) => {
  const domNode = document.createElement(tagName, options.crerateOptions);
  if (!options) {
    return;
  }
  if (valueTypeof(options.style, "Object") && valueLength(options.style)) {
    const thisStyle = { ...options.style };
    for (const key in options.style) {
      domNode.style[key] = options.style[key];
    }
  }
  if (valueLength(options.class)) {
    if (valueTypeof(options.class, "String")) {
      domNode.classList.add(options.class);
    } else if (valueTypeof(options.class, "Array")) {
      domNode.classList.add(...options.class);
    }
  }
  if (valueTypeof(options.innerHTML, "String") && valueLength(options.innerHTML)) {
    domNode.innerHTML += options.innerHTML;
  }
  if (!valueTypeof(options.appendDom, "Object") && !valueTypeof(options.appendDom, "Boolean")) {
    return;
  }
  const parentNode = isDomNode(options.appendDom.parentNode || options.appendDom.parentSelector);
  const referenceNode = isDomNode(options.appendDom.referenceNode || options.appendDom.referenceSelector);
  if (parentNode) {
    parentNode.insertBefore(domNode, referenceNode);
  } else {
    document.body.appendChild(domNode);
  }
  return domNode;
};
