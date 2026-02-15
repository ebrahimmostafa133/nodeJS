function asyncWrapper(prmoise) {
  return prmoise
  .then((data) => Promise.resolve([undefined, data]))
  .catch(error => Promise.resolve([error]))
}

module.exports = asyncWrapper;
