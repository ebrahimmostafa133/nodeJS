function asyncWrapper(prm) {
  return prm
    .then((data) => [undefined, data])
    .catch((error) => [error]);
}

module.exports = asyncWrapper;
