export const logout = async (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
