# Project Contribution Guide

Every contributor should read and follow this guide.

## Setup & Workflow
### Getting the code
1. Clone this repository to your computer 
    - run `$ git clone https://github.com/gdsc-utech/CoLearn-Server.git`
2. Open the project folder
3. Create a new branch for your feature/task. 
    - run `$ git checkout -b feat/<my-new-feature>`
    - See branch naming conventions below
4. Download all the dependencies to run the app
    - run `$ npm i`
5. Periodically commit and push your changes

### keeping up-to-date
To Keep your local project in sync with the main repository:

6. Pull all changes on the main branch
    - run `git fetch origin main:main`
7. Merge the code from main into your branch
    - run `git merge main`
8. Run `npm i` if new packages were added

### Submitting code
9. Make sure your code has all the latest changes
10. Upload your code (`git push`)
11. Open the repository on GitHub and create a Pull Request (PR) from your branch to the `main` branch
12. Wait for your PR to be approved and merged. You may be asked to make changes before it can be merged


> NB: Limit the amount of files you modify in each pull request to reduce merge conflicts when multiple people overwrite the same file


---
## Node JS Coding Styleguide

### Readability
- Put spaces on both sides of operators(*/-+=)
  - ❌: `name="John";`, ✅: `name = "John";`
- Dont write paragraphs of code, skip lines
- Proper, consistent indentation (tab or 2 spaces)
- Write meaningful code comments. Don't state the obvious.

### Naming Conventions
- Use PascalCase for components
- Variables and functions using camelCase
- Ensure that the name of the component is descriptive of the component's purpose
- Ensure that the name of the variable is descriptive of the variable's purpose

---

### Git Branch Naming Conventions
- for new features: `feat/featurename`
- for fixing a bug: `fix/bugname`
> Avoid long branch names, or branch names with special characters. Use dashes or underscores to separate words.


### Git Commit Messages
* State what you did eg `"created navigationbar"`
* Consider starting the commit message with an applicable emoji (Win + .):
    
    * 🎨: for changes to UI
    * 🛠 or 🔧: for fixing an issue
    * ✅: for fixing git conflicts or PR changes
    * ⬇️: for adding or removing dependencies
    * 🔥: for removing files

Example: `git commit -m "🎨 finish homepage UI"`

---
## Notes

> Give details in the description when creating a pull request.

> Always add a message to your commits explaining what you've done.

