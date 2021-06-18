const FARSI_NUMBERS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const ARABIC_NUMBERS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export const convertFaToEn = function (enNumber) {
  if (!enNumber || !enNumber.toString) {
    return enNumber;
  }

  enNumber = enNumber.toString();

  return enNumber
    .split("")
    .map((letter) =>
      FARSI_NUMBERS.indexOf(letter) !== -1
        ? FARSI_NUMBERS.indexOf(letter)
        : letter
    )
    .join("");
};

export const convertEnToFa = function (enNumber) {
  if (!enNumber || !enNumber.toString) {
    return enNumber;
  }

  enNumber = enNumber.toString();

  return enNumber
    .split("")
    .map((letter) => (/[0-9]/.test(letter) ? FARSI_NUMBERS[letter] : letter))
    .join("");
};

export const convertArToEn = function (enNumber) {
  if (!enNumber || !enNumber.toString) {
    return enNumber;
  }

  enNumber = enNumber.toString();

  return enNumber
    .split("")
    .map((letter) =>
      ARABIC_NUMBERS.indexOf(letter) !== -1
        ? ARABIC_NUMBERS.indexOf(letter)
        : letter
    )
    .join("");
};

export const convertEnToAr = function (enNumber) {
  if (!enNumber || !enNumber.toString) {
    return enNumber;
  }

  enNumber = enNumber.toString();

  return enNumber
    .split("")
    .map((letter) => (/[0-9]/.test(letter) ? ARABIC_NUMBERS[letter] : letter))
    .join("");
};

export const convertArToFa = function (enNumber) {
  const en = convertArToEn(enNumber);
  return convertEnToFa(en);
};

export const convertFaToAr = function (enNumber) {
  const en = convertFaToEn(enNumber);
  return convertEnToAr(en);
};
