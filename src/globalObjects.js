export const colour = (block) => {
  switch (block) {
    case '2':
      return "colour-2 tile";
    case '4':
      return "colour-4";
    case '8':
      return "colour-8";
    case '16':
      return "colour-16";
    case '32':
      return "colour-32";
    case '64':
      return "colour-64";
    case '128':
      return "colour-128";
    case '256':
      return "colour-256";
    case '512':
      return "colour-512";
    case '1024':
      return "colour-1024";
    case '2048':
      return "colour-2048";
    default:
      return "";
  }
};