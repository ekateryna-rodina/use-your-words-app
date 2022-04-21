export const getValueWithHint = (answer: string, value: string) => {
  let newValue = "";
  // if no user input
  if (!value) {
    newValue = answer[0];
  } else if (value === answer) {
    // if full and correct answer
    newValue = value;
  } else if (answer.startsWith(value)) {
    // if partial and correct
    newValue = `${value}${answer.slice(value.length, value.length + 1)}`;
  } else {
    // fix one mistake
    const letters = value.split("");
    const wrongIndices = letters.reduce((acc: number[], curr, idx) => {
      if (curr !== answer[idx]) {
        acc.push(idx);
      }
      return acc;
    }, []);
    if (wrongIndices[0]) {
      const _newValue = [...value.split("")];
      _newValue[wrongIndices[0]] = answer[wrongIndices[0]];
      newValue = _newValue.join("");
    }
  }
  return newValue;
};
