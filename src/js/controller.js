import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

/**
 * Loading a Recipe from API
 * Using the fetch function will return the promise and since we are in an async function, we can then await that promise
 * .json() is a method that is available on all the response objects and a response object is what the fetch() function
 *  returns.
 * .json() will return another promise which we have to await again
 */

/**
 * Rendering the Recipe
 * In parcel, we can import more than just javascript files. We can import all kind of assets.
 * Copy css spinner code if you need a spinner application
 */

/**
 * The MVC Architecture
 * It is important to know how to implement an architecture by yourself before using a framework
 * The state is basically what stores all the data about the application that is running on the browser i.e. the data
 *  from the application's frontend basically.
 *  Stores data you might fetch from an API, data the the user inputs, etc.
 *  This data should be the single source of truth which should be kept in sync with the UI. Which means if some data
 *    changed in the state then the UI should reflect that and vice versa.
 * Storing and displaying data and keeping everything in sync is one of the most difficult tasks when building web
 *  applications that why there are many state management library like Redux or Mobx.
 * MVC = Model View Controller
 * One of the big goals of the MVC Architecture is to actually seperate business logic from application logic and the
 *  controller will connect them.
 * The Model and the controlle just sit there waiting to get some instructions from the controller.
 * Note that there are actually different ways of implementing the MVC pattern where some are more complex than others.
 */

/**
 * Refactoring for MVC
 * We will have a multiple view --one for each feature
 * It important to keep in mind that an async function will return a promise that we then need to handle whenever we
 *  call that async function if we want to get a result out of it or if we want to stop the execution in the function
 *  that is calling the other async function.
 * window.location returns the whole url
 */

/**
 * Helpers and Configuration Files
 * Many real world applications have 2 special modules that are completely independent from the rest of the architecture
 *  - Helper Functions/Files
 *    The goal of this file is to contain a couple of functions that we will reuse in our project.
 *  - Configuration Files
 *    Will have all variables which should be constants and will be reused across the project
 *    You do not want to put all the variables here in this file, the only variables you put are the ones that are
 *    responsible for defining some important data about the application itself.
 * Using uppercase for a variable that will not change is common practice in a configuration file.
 * Use 'throw' to propagate the error down from one async function to the other by rethrowing the error in the catch
 *  block.
 */

/**
 * Event Handlers in MVC: Publisher-Subscriber Pattern
 * In the way we set up the architecture, the view does not know anything about the controller so it doesn't import
 *  the controller and so we can't call any of the functions that are in the controller from the view.
 * Design Patterns in programming are standard solutions to certain kinds of problems.
 * WATCH LECTURE TO KNOW MORE ABOUT THIS PATTERN!!!
 */

/**
 * Implementing Error and Success Messages
 */

/**
 * Implementing Search Results - Part 1
 * It is a good idea to keep every view very focused on doing one thing
 * The addHandlerSearch() method in the searchView file will be the publisher
 * The controlSearchResults() function is going to be the subscriber.
 */

/**
 * Implementing Search Results - Part 2
 * Right now with Parcel & Babel, inheritance between private fields and methods doesnt really work yet.
 */

/**
 * Implementing Pagination - Part 1
 */

/**
 * Implementing Pagination - Part 2
 * The pagination and search results controllers are intertwined
 * Remember that we made our code clear the parent element before any new HTML is inserted into the page.
 */

// This is not real JS. This is coming from parcel.
// if (module.hot) {
//   module.hot.accept();
// }

/**
 * Updating Recipe Servings
 * To connect the UI with the code, use the special data properties.
 */

/**
 * Developing a DOM Updating Algorithm
 * The update method in recipeView.js will only update text and attribute in the DOM without having to re-render the
 *  entire view.
 * .isEqualNode() is a method available to all nodes
 *  it returns a bool
 * .nodeValue() will return null for everything except for Text
 * Note that this algorithm is only good for smaller applications. For huge applications this algo is not performant and
 *  good enough.
 * Rewatch the lecture and go over the code if you don't understand.
 */

/**
 * Implementing Bookmarks - Part 1
 * A common pattern in progamming is when you add something you get the whole data but when you want to delete something,
 *  you only get the id.
 */

/**
 * Implementing Bookmarks - Part 2
 * We will use the PreviewView as a child view of the bookmarks and resultsview
 */

/**
 * Storing Bookmarks with localStorage
 * JSON.parse() converts a string back into an object
 */

/**
 * Uploading a New Recipe - Part 1
 * Remember that bind() helps you manually set the 'this' keyword into the one you want it to be.
 * new FormData() will allow you to get access to the values in the form
 *  convert the return value into an array
 * Object.fromEntries() converts entries to an object
 */

/**
 * Uploading a New Recipe - Part 2
 * Object.entries() is the opposite of Object.fromEntries()
 * passing a url into a fetch() function will automatically create a GET request
 * To send data, it has to be POST request
 *  headers are basically some snippet of text which are like information about the request itself
 *  the payload of the request is the data we want to send
 * The forkify API will return the data back that we just sent
 * Note that NOT ALL recipe have a KEY
 * Use short circuiting to conditionally add properties to an object
 */

/**
 * Uploading a New Recipe - Part 3
 * Use render() to insert a new element
 * Use history API to change the ID in the url
 *  .pushState() will allow us to change the url without reloading the page
 */

/**
 * Wrapping Up: Final Considerations
 * There is a standard for writing documentation for javascript functions and it is called JS Docs
 *  Check out render function in View.js for an example
 *  or go to jsdoc.app to see more
 * See lecture for improvement and feature ideas.
 */

const controlRecipes = async function () {
  try {
    // Getting hash of each recipe
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading Recipe
    await model.loadRecipe(id); // Have to use await since loadRecipe is an async function thus it returns a promise

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();

    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error('💥', error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

console.log('hello');
