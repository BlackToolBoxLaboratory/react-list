const formatCamelCase = (styleObj) => {
  let newObj = {};
  Object.keys(styleObj).forEach((id) => {
    newObj[id] ={};
    Object.keys(styleObj[id]).forEach((key) => {
      let newKey = key.replace(/-(\w)/g, 
        function(all, letter) {
          return letter.toUpperCase();
        }
      );
      newObj[id][newKey] = styleObj[id][key];
    });
  });
  return newObj;
};

export default formatCamelCase;
