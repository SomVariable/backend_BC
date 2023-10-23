import { PROPERTY_LENGTH } from 'src/common/constants/app.constants';

export class UniqueNumberGenerator {
  static cash = [];

  static generateRandomNumber(num?: number) {
    num = num ? num : 9;
    const range = 10 * num;
    const randomNum = Math.floor(Math.random() * range);

    if (this.cash.length >= range) return null;

    if (!this.cash.some((e) => e === randomNum)) {
      this.cash.push(randomNum);
      return randomNum;
    }

    return this.generateRandomNumber();
  }

  static lengthCountControl(str: string) {
    const length = str.length;
    if (length >= PROPERTY_LENGTH.TITLE) {
      return '';
    }

    const countOfNum = PROPERTY_LENGTH.TITLE - length;

    return `${str}${this.generateRandomNumber(countOfNum)}`;
  }
}
