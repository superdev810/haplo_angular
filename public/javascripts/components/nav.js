module.exports = function () {
  let navs = document.querySelectorAll(".ab-nav-item-SOLID, .ab-nav-item-EMPTY");
  console.log(navs[0].children[0].href)
  console.log(window.location)
  navs = Array.prototype.slice.call(navs);
  navs.forEach(function(nav) {
    console.log(nav.children[0].href)
    console.log(window.location);
    if (nav.children[0].href === window.location.href) {
      if (window.location.pathname === '/users/signup') {
          nav.className += ' ab-active-EMPTY';
      } else {
        nav.className += ' ab-active-SOLID';
      }
    }
  })

}
