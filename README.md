# Paperdocs

A beautiful and highly responsible theme for documentation:

```html
<link src="https://unpkg.com/paperdocs@1/paperdocs.min.css" rel="stylesheet">
<script src="https://unpkg.com/paperdocs@1/paperdocs.min.js"></script>
```

Include the two snippets above for the style and functionality of this page, including:

- Automatic syntax highlighting
- Menu creation for responsive website
- Menu creation on demand (see below)
- Automatic markdown parsing from external file on demand


## Navigation menu

The `<nav>` navigation menu will automatically render as a drop-down menu on mobile (try it by resizing this window), so your users will have the functionality they want there.

This is how it looks on desktop (cut to make it fit here):

![Navigation menu on desktop](/img/nav_desktop.png)

This is the mobile version. **When you scroll on mobile the nav shows the current section**:

<div class="flex two">
  <div><img src="/img/nav_mobile_full.png" alt="Mobile navigation bar"></div>
  <div><img src="/img/nav_mobile_scroll_full.png" alt="Mobile navigation bar scrolled"></div>
</div>

When clicking on the ☰, the menu drops down showing all available sections and the 2-4 buttons that were on the top-right before on the bottom:

![Navigation on mobile opened](/img/nav_open_full.png)

To get this awesome menu, use this html:

```html
<nav class="super">
  <a href="#" class="brand">
    <img class="logo" src="http://umbrellajs.com/web/umbrella.svg">
    <span class="text">Umbrella JS</span>
  </a>

  <input id="bmenu" type="checkbox" class="show">
  <label for="bmenu" class="burger pseudo button switch"></label>

  <header><strong>Umbrella JS</strong></header>
  <div class="menu loading" data-headers="h2"><ul class="flex two three-600"></ul></div>

  <footer>
    <div class="flex three">
      <a class="pseudo button" href="/tests">
        <i class="fa fa-check"></i> Tests
      </a>
      <a class="pseudo button" href="https://github.com/umbrellajs/umbrella">
        <i class="fa fa-github-alt"></i> Github
      </a>
      <a class="button" href="/documentation">
        <i class="fa fa-file-text-o"></i> Documentation
      </a>
    </div>
  </footer>
</nav>
```

There are a couple of things to note here:

- The first div inside `<footer>` has the class `flex three`. You must adjust this acording to the number of buttons you have inside.
- The `.menu.loading` has an attribute called `data-headers="h2"`. This represents what kind of headings will be parsed and make it into the menu. You can adjust it to `data-headers="h1, h2"`, `data-headers="h2, h3"`, etc as you prefer.



## Single column

[See example](/single) (or this page)

This is the current layout, a single column. The most important element is the `<article>`, to load a page like this do:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Documentation</title>
    <meta charset="utf-8">

    <!-- other tags here -->

    <link href="https://unpkg.com/paperdocs@1/paperdocs.min.css" rel="stylesheet">
  </head>
  <body class="withaside">

    <!-- <nav> seen above -->

    <article class="loading" data-src="documentation.md"></article>

    <script src="https://unpkg.com/paperdocs@1/paperdocs.min.js"></script>
  </body>
</html>
```

It will load the content from `documentation.md` (markdown) and then render it as html inside this article and remove the spinner.

You can also load it *server-side* and just put the HTML inside the article, which will be rendered properly. Don't forget to remove all the attributes in that situation:

```html
<article>
  <h1>Documentation</h1>
  ...
</article>
```



## Create a side menu

[See example](/)


a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

## Second section


a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

a

## Third section
