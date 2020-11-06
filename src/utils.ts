// https://stackoverflow.com/a/2450976/13615958
export const shuffle = <T extends {}>(arr: T[]) => {
  let emptyArr: T[] = [];
  let array: T[] = emptyArr.concat(arr);
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
