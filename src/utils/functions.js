// eslint-disable-next-line import/prefer-default-export
export const filterUnique = (arr) => {
  const hash = {};
  const result = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!(arr[i] in hash)) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
};
