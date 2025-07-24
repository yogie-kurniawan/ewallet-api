const notFound = (req, res) => {
  res.status(404).send("Route tidak ada");
};

export default notFound;
