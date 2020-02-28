# Welcome to the Benefits Delivery & Administration Design System's UI Toolkit Documentation Suite

## Development

### Quality Standards
While this documentation suite is meant to convey the patterns and philosophies that guide the design and development of human-facing software, it also needs to demonstrate our commitment to accessible, adaptive solutions. Please adhere to the following guidelines when contributing.

#### HTML
- Semantically correct
  - Make sure your markup leverages elements that convey the purpose of their content correctly.
  - For more information, see the [MDN Guide to Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML)
- Minimalistic
  - Almost all HTML elements can be styled&mdash;there's often no need to introduce additional markup to achieve structural/visual ends.
- Accessible
  - Employing semantic markup will get you a great deal of the way to achieving this goal, but for any elements that provide an extended interaction model of an existing element (a styled analog of a `<select>`, for example), methods like **`aria` roles** and **attributes** can fill in those gaps.
  - For more information, see the W3C's [ARIA in HTML](https://www.w3.org/TR/html-aria) documentation.
- Adaptive / Responsive
  - Structure your markup in a way that can easily be styled as appropriate for a variety of viewports.

#### CSS
- Mobile First
  - Write your "base-level" styles for your target "Mobile" viewport, and target larger viewports (tablet, desktop, desktop-large, etc.) with `@media` queries.
- Avoid deep-nesting whenever possible
  - Try to keep things as "flat" and reusable as possible

#### JavaScript
- favor es6+ syntax
- standard camelCase variables and functions



### Running the UI Toolkit Docs Locally

First, clone the repository, locally, and install dependencies:

```
$ git clone https://github.com/WTW-IM/bda-des-sys.git
$ cd bda-des-sys
$ npm install
```

Run development page on **http://localhost:3200/** (browser will open upon running the following):

```
$ npm run dev
```
Changes will automatically refresh in the browser as they are saved.



## Build for Production

You will need to build for Production before you can open a pull request (outlined in the next section).

```
$ npm run build
```

If you run into errors, try clearing the `npm` cache:

```
$ rm -rf node_modules/gh-pages/.cache
```



## Deployments

When you're satisfied with your changes, `commit`&mdash;with a message (`-m`)&mdash;and `push` all changes to your remote branch, and open a **Pull Request (PR)**. For in introduction to using Git, see the [Git Handbook](https://guides.github.com/introduction/git-handbook/).

Present your changes to {**TBD** -- UX CoP? DSWG?} and solicit feedback. Get a front-end-savvy Architect to review your changes to ensure they are sound and conform to the [Quality Standards](#quality-standards) mentioned above.

Once your changes have garnered the approval of the {CoP and/or CoI} and an Architect, your PR will be merged to `master`&mdash;and pushed to the branch upon which the [UI Toolkit Documentation](https://wtw-im.github.io/bda-des-sys) runs&mdash;on your behalf.

<!-- Deploy to `gh-pages` branch on GitHub.
You will need to have ssh tokens set up for git terminal commands.

```
$ npm run deploy
``` -->
