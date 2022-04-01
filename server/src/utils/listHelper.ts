export const getRandom = <T>(list: T[]) =>
  list[Math.floor(Math.random() * list.length)];

export const randomize = <T>(list: T[]) => list.sort(() => 0.5 - Math.random());
