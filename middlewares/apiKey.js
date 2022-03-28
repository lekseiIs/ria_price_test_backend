module.exports = (ctx, next) => {
  const apiKey = 'U7i4BeQMgsVW0z4r9OxQvHc4H7C1IecipE3kX5zu';
  ctx.apiKey = '?api_key=' + apiKey + '&';
  return next()
};