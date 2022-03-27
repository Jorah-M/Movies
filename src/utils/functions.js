export const filterUnique = (arr) => {
  const hash = {}, result = [];
  for (let i = 0; i < arr.length; i++)
    if (!(arr[i] in hash)) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  return result;
}