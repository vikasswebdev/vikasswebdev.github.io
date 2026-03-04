document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section');

  function updateActiveNav(hash) {
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) link.classList.add('active');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        updateActiveNav(targetId);
      }
    });
  });

  window.addEventListener('scroll', function () {
    var current = '';
    var headerOffset = 100;
    sections.forEach(function (section) {
      var sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= headerOffset) current = section.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });
});
