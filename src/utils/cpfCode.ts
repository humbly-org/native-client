export const cpfMask = (text: string) => {
  text = text.replace(/\D/g, '');
  text = text.replace(/(\d{3})(\d)/, '$1.$2');
  text = text.replace(/(\d{3})(\d)/, '$1.$2');
  text = text.replace(/(\d{3})(\d)/, '$1-$2');

  return text;
};
