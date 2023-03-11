// Wrap async-function from CRUD with catch-async function
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
