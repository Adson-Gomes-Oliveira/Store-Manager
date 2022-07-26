const arr = [1, 2, 3];
const mapp = arr.map((number) => {
  const sum = number + 3;
  return {
    sum,
  };
});

console.log(mapp);
