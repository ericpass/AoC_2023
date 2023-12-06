const performanceWrapper = async (fn) => {
  const start = performance.now();
  await fn();
  const end = performance.now();

  console.log(`Total time: ${(end - start) / 1000} seconds`)
};

module.exports = { performanceWrapper };