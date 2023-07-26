# BQP SaaS Front End

# Technologies used in Front-end

- [React](https://beta.reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios (fetching API)](https://axios-http.com/docs/intro)
- [Reducers and Context API for State Management](https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context). Will upgrade the state management using [Redux](https://react-redux.js.org/).
- [ESLint for code styling (VSCode extension)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Formik (for writing Forms)](https://formik.org/)
- [React-Router](https://reactrouter.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

<hr>
<br>

# Coding Standards (Front-End)

- No to class-based components, only use functional components.
- Keep the components small as they're more reusable, loosely coupled as much as possible.
- Separate the logic from UI components and maintain the logic and UI components in different folders.

  ```
  - src
    |-- routes
    |   |-- Home
    |   |   |-- HomeWidget.js
    |   |   |-- HomeWidgetContainer.js
    |-- components
    |   |-- NavBar.js/NavBar
    |-- Authentication
    |-- Helper
    |-- Errors
    |-- context
    |-- features
        |-- counter/counterSlice.js

  ```

  - routes - It will contain the different routes with Route as a folder and contains Presentation(UI) component and Container(logic) component.
  - components - It will contain reusable components. It can have only components or like presentation and container module for each component. But, might not have any use case for the same. So, will have only component files and not folders with presentation and container files.
  - Authentication: It will contain all the logic for authenticating user for the app.
  - Helper: It contains the reusable functions like sorting or custom hooks.
  - Errors: Stuff related to error handling.
  - context: All the files related to global context or any sort of context will be kept here like useContext or useReducer files.(for old context based state management, will convert to reducers and shift to features)
  - features: All the features/redux state slices must be kept here.

- Report bug whenever some of the user experience gets distorted.
- Would add some of the standards for routing and state management while building project.
- Test the app performance using React Performance tools like Lighthouse.

<hr>
<br>

# Repository Maintenance Guidelines:

## 🚫 Never ever work on the master branch 🙏🙏.

- Resist a blind git add `git add .`
- Use git ignore to keep irrelevant files or resources in `.gitignore` file like local variables, packages are kept here.
- Create git repository using `git init` or clone the repository from Github using `git clone url`.
- Create your own branch for working on the project using `git checkout -b branch_name`.
- `git branch` shows all the branches. `git branch --show-current` shows the currently selected branch.
- Use subject and body for defining the commit. Subject gives the short description and body gives detailed description about the same. `git commit -m "Subject" -m "Body"`. Mention component ID or reference ID used in issue tracker while making a commit. Instead of writing commits directly in the command line, you can configure a default text editor for writing messages. Configure the editor using `git config --global core.editor editor_name`. Commit can be done using `git commit` and this will open a file where you can enter the subject and body.
- Below template can be used as a template for commit messages.
- `master`branch would only be updated in the case of major product release like alpha, beta or complete versions.
- `dev` branch would be the branch developers would work on, that too indirectly.
- `qa` branch would contain all the testcases and all the code which is related to Quality Assurance of the app.

### Naming convention of an Ideal branch created on the BQPhy app ⇒

```jsx
<feat|bugfix|style/refactor> / <issue #> - <issue_description>
```

- `feat` for a new feature that would added to the app.
- `refactor` for code refactor which has been done in the app.
- `style` style changes made to an app.
- `bugfix` or `fix` bug fix in the app.
- `issue` linked to the changes done (if any)
- `issue_description` brief description of the change being made

### Conventions for Git Commit Messages

```
    feat: Summarize changes in around 50 characters or less

    More detailed explanatory text, if necessary. Wrap it to about 72
    characters or so. In some contexts, the first line is treated as the
    subject of the commit and the rest of the text as the body. The
    blank line separating the summary from the body is critical (unless
    you omit the body entirely); various tools like log, shortlog
    and rebase can get confused if you run the two together.

    Explain the problem that this commit is solving. Focus on why you
    are making this change as opposed to how (the code explains that).
    Are there side effects or other unintuitive consequences of this
    change? Here's the place to explain to them.

    Further paragraphs come after blank lines.

    * Bullet points are okay, too

    * Typically a hyphen or asterisk is used for the bullet, preceded
        by a single space, with blank lines in between, but conventions
        vary here

    If you use an issue tracker, put references to them at the bottom,
    like this:

    Resolves: #123(component ID, or any reference ID used in issue tracker)
    See also: #456, #789

```

- Specify the type of commit message in the subject. Some of types are:

  - feat: The new feature you're adding to a particular application
  - fix: A bug fix
  - style: Feature and updates related to styling
  - refactor: Refactoring a specific section of the codebase
  - test: Everything related to testing
  - docs: Everything related to documentation
  - chore: Regular code maintenance.[ You can also use emojis to represent commit types]
    <br><br>
    While using all the practices mentioned, commit subject will look something like this `style: Added styling to nav bar`.

- For changing the commit message which is not yet pushed use `git commit --amend -m "new message"`.
- Use `git log` or `git log --oneline` to see all the commits.
- Use `git push` with upstream set for first time and can push the code easily.
- Each commit message must have a description that explains the why. It makes it easier for a reviewer to understand the purpose of the commit later. You can also reference the component ID while making changes.
- Don't ever commit big changes as it might break code for others.
- Always raise a pull request before merging your commits to the master/production branch.
- Make sure your commits are traceable. Commit small changes which will help us to roll back to the most stable commit when some bug occurs.
- Enable parallel development using different branches for different stakeholders.
- For the major update, we need to create a new version branch and start working on it. Even if something goes wrong, we still have the previous working version. We'll adopt some versioning methodology whenever needed.

### Can also use [gitmoji](https://gitmoji.dev/) to add emojis in git commit messages which will make commit messages more attractive.

➕:heavy_plus_sign: when adding a file or implementing a feature<br>
🔨:hammer: when fixing a bug or issue<br>
💚:green_heart: when improving code or comments<br>
⚡:zap: when improving performance<br>
📜:scroll: when updating docs or readme<br>
🔑:key: when dealing with security<br>
🔁:repeat: when updating dependencies or data<br>
✅:white_check_mark: when a new release was built<br>
👕:shirt: when refactoring or removing linter warnings<br>
❌:x: when removing code or files<br>

<hr><br>

### Instructions for building images and running container

- Switch to the project directory and run the following command to create the docker image
  `sudo docker build -t bqp-frontend-saas:version .`
- Run the container and deploy the application for use with the command ` sudo docker run --rm -it --name web -p 5000:80 bqp-frontend-saas:version &`.

### ☝️ need to add instructions for using docker image for development purpose to have synchronized development environment.

<hr>

# Guidelines for maintaining the documentation

- Add the new coding standards while working on the project, maintain best practices, and create an awesome app 🔥.
- Document each and every thing as much as possible.

## Maintainers for Front End

- [Vruttant Balde](https://github.com/Vruttant)
- [Shivani Yadav](https://github.com/Agirlwstories)
