export const blockIds = [
  "0-0",
  "0-1",
  "0-2",
  "0-3",
  "1-0",
  "1-1",
  "1-2",
  "1-3",
  "2-0",
  "2-1",
  "2-2",
  "2-3",
  "3-0",
  "3-1",
  "3-2",
  "3-3",
];

export const colour = (block) => {
  switch (block) {
    case '2':
      return "colour-2 tile";
      break;
    case '4':
      return "colour-4";
      break;
    case '8':
      return "colour-8";
      break;
    case '16':
      return "colour-16";
      break;
    case '32':
      return "colour-32";
      break;
    case '64':
      return "colour-64";
      break;
    case '128':
      return "colour-128";
      break;
    case '256':
      return "colour-256";
      break;
    case '512':
      return "colour-512";
      break;
    case '1024':
      return "colour-1024";
      break;
    case '2048':
      return "colour-2048";
      break;
    default:
      return "";
  }
};
