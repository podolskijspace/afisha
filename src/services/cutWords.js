const cutWords = (text, length) => {
  const arr = text.split(' ', length);
  return ( arr ? arr.join(' ') + '...' : arr);
}

export default cutWords;