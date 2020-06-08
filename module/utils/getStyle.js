const getStyle = (propsStyleObj, classList) => {
  let styleObj;
  classList.forEach((classname) => {
    styleObj = Object.assign({}, styleObj, _searchStyleByClassName(propsStyleObj, classname));
  });
  return styleObj;
};
const _searchStyleByClassName = (propsStyleObj, classname) => {
  let result = {};
  if (typeof propsStyleObj === 'object') {
    Object.keys(propsStyleObj).find((specname) => {
      if (specname === classname) {
        result = Object.assign({}, propsStyleObj[specname]);
        return true;
      }
    });
  }
  return result;
};

export default getStyle;