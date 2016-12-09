'use strict';

(function () {
  var tableofcontents = function tableofcontents() {

    u('[data-headers]').each(function (header) {
      var headers = header.getAttribute('data-headers') || 'h1, h2, h3';
      var selector = headers.split(/\s*,\s*/).map(function (h) {
        return h + ':not(.noindex)';
      }).join(', ');

      u('[data-headers] ul, [data-headers] ol').html('\n        ' + u(selector).nodes.map(function (node) {
        return '\n          <li class="' + (node.nodeName === 'H2' ? 'primary' : 'secondary') + '">\n            <a class="pseudo button" href="#' + node.id + '">\n              ' + node.innerHTML + '\n            </a>\n          </li>\n        ';
      }).join('') + '\n      ');
    });
  };

  // Supermenu
  var supermenu = function supermenu() {
    var smoothscroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    function shouldScrollOrNot() {
      u('body').toggleClass('no-scroll', u('nav > input').first().checked);
    }
    u('nav > input').on('change', shouldScrollOrNot);
    shouldScrollOrNot();

    u('article h2').each(function (node) {
      u(node).attr('id', node.id);
    });
    var lessonName = u('h1').html();
    var main = '<a href="#" class="pseudo button"><strong>' + lessonName + '</strong></a>';

    u('[data-headers]').on('click', 'a', function (e) {
      u('nav > input').first().checked = false;
      u('body').removeClass('no-scroll');

      console.log("Clicked");

      if (smoothscroll) {
        e.preventDefault();
        var to = u(u(e.currentTarget).attr('href'));
        if (to.length) {
          to.scroll();
        }
      }
    });

    // Change the title of the section
    var pagesize = u('body').size().height / 2;
    var last = void 0;
    function setupSection() {
      var current = u('article h2').filter(function (node) {
        return u(node).size().top < pagesize;
      }).last() || u('h1').first();
      var section = u(current).html() || u('h1').html();
      if (u('h1').length && u('h1').size().top > 0 && u('h1').size().top < pagesize) {
        section = u('h1').html();
        var hash = u(current).attr('id');
      }
      if (!last || !current || current != last) {
        last = current;
        u('nav header').html(section);
        u('[data-headers] [href]').removeClass('active');
        if (current) {
          u('[href="#' + current.id + '"]').addClass('active');
        }
      }
    }
    u(document).on('scroll', setupSection);
    setupSection();
  };

  if (u('aside').length) {
    u('body').addClass('withaside');
  }

  u('article[data-src]').nodes.forEach(function (article) {
    var url = article.getAttribute('data-src');
    fetch(url).then(function (res) {
      return res.text();
    }).then(function (md) {
      article.innerHTML = marked(md);
      u('.loading').removeClass('loading');
      Prism.highlightAll();
      tableofcontents();

      supermenu();
    });
  });
  supermenu();

  u('common-mark, .common-mark').nodes.forEach(function (el) {
    var lines = el.innerHTML.replace(/\&gt\;/g, '>').replace(/\&lt\;/g, '<').replace(/\&amp\;/g, '&').split('\n');
    var min = parseInt(el.getAttribute('spaces'));
    min = min || Math.min.apply(Math, lines // Minimum of array
    .filter(function (n) {
      return !n.match(/^\s*$/);
    }) // Only filled lines
    .map(function (line) {
      return line.match(/^\s*/);
    }) // Get each space str
    .map(function (n) {
      return n[0].length;
    }) // Count spaces
    );
    // Set the html as the parsed from markdown
    el.innerHTML = marked(lines.map(function (l) {
      return l.slice(min);
    }).join('\n'));
  });

  tableofcontents();
})();
