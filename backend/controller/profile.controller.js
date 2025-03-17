export const getProfile = async (req, res) => {
  if (!req.user) return res.status(401).send("Not logged in");
  res.send(`Welcome ${req.user.displayName}`);
};
