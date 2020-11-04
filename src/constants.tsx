export const cardTypes: string[] = [
    "ace_of_spades",
    "two_of_spades",
    "three_of_spades",
    "four_of_spades",
    "five_of_spades",
    "six_of_spades",
    "seven_of_spades",
    "eight_of_spades",
    "nine_of_spades",
    "ten_of_spades",
    "jack_of_spades",
    "king_of_spades",
    "queen_of_spades"
];

export enum state {
  onStage,
  stageSwitching
}

const deckColCount: number = 8;

export const deckWidth: number = 600;
export const cardWidth: number = Math.floor((deckWidth - (deckColCount* 10) - 30) / deckColCount);
