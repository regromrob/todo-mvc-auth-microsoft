module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) { //if logged in already move on
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) { //if not logged in, kicked back to page
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }
  