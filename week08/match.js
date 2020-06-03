function match(selector, element) {
  if (!element.attributes || !selector) {
    return false;
  }
  if (selector.charAt(0) === '#') {
    let attr = element.attributes.filter((attr) => attr.name === 'id')[0];
    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) === '.') {
    let attr = element.attributes.filter((attr) => attr.name === 'class')[0];
    // 处理带空格的
    let flag =
      attr &&
      attr.value
        .split(/\s+/)
        .some((attrClassName) => attrClassName === selector.replace('.', ''));
    if (flag) {
      return true;
    }
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
}

match('div #id.class', document.getElementById('id'));
