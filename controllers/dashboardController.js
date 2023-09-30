// controllers/dashboardController.js
function renderDashboardPage(req, res) {
    res.render('dashboard', { username: req.user.username });
  }
  
  function logout(req, res) {
    req.logout();
    res.redirect('/login');
  }
  
  module.exports = {
    renderDashboardPage,
    logout,
  };
  