import view from './view.js'
import * as model from './model.js';
import searchView from './searchView.js';
import extraOptionsView from './extraOptionsView.js';
import deleteRow from './deleteRow.js';
import editElement from './editElement.js';

/**
 * This file is named controller because this is majorly responsible for the flow of data from model.js and all the other .js files
 */


// NOTE: controlSearchResults calls getInputString function in searchView which returns the entered string in the search box and then the result is stored in model's allElements
const controlSearchResults = function () {

    const data = searchView.getInputString();
    if (!data[0]) {
        alert('Please enter a task!');
        return;
    }
    if (model.allElements.incomplete.some(element => element.data === data[0])) {
        alert('The task is already present!');
        return;
    }
    model.enterSearchedValue(data);
    view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);

}

// NOTE: selectSwitch is responsible for styling the task/row during single click event

const selectSwitch = function (e) {
    if (!model.allElements.currentScreenIncomplete) return;
    const clicked = e.target.closest('.movements__row');
    // clicked.classList.toggle('mark__complete');
    const index = model.allElements.incomplete.findIndex(mov => mov.data === clicked.querySelector('.movements__text').textContent);
    model.allElements.incomplete[index].selected = !model.allElements.incomplete[index].selected;
    view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);
    // e.stopPropagation();
}


// NOTE: controlViewThroughExtraOptions helps display the data when switching between the tabs.
const controlViewThroughExtraOptions = function (e) {
    const clicked = e.target.closest('.form__btn');
    if (!clicked) return;
    if (clicked.id === "incomplete") {
        model.allElements.currentScreenIncomplete = true;
        view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);
    }
    if (clicked.id === "moveToCompleted") {
        // console.log("moveTo selected");
        model.moveSelectedToComplete();

        view.updateRows((model.allElements.currentScreenIncomplete ? model.allElements.incomplete : model.allElements.completed), model.allElements.currentScreenIncomplete);
    }
    if (clicked.id === "completed") {
        model.allElements.currentScreenIncomplete = false;
        view.updateRows(model.allElements.completed, model.allElements.currentScreenIncomplete);
    }
    if (clicked.id === "reset") {
        reset();
    }
}

// NOTE: controlDeleteRow is responsible for initiating data deletion

const controlDeleteRow = function (element) {
    deleteRow.displayDeleteConfirmationBox(element);
}


// NOTE: deleteRowFinal is a function that finally deletes data based on the decision made by the user when "are you sure" window appears

const deleteRowFinal = function (decision, element) {
    if (decision === 'yes') {
        model.deleteRowFromData(element);
        view.updateRows((model.allElements.currentScreenIncomplete ? model.allElements.incomplete : model.allElements.completed), model.allElements.currentScreenIncomplete);
    }
}


// NOTE: controlEditElement function is only responsible to allow editing of a row when the row belongs to the incomplete tab

const controlEditElement = function () {
    return model.allElements.currentScreenIncomplete;
}

// NOTE: The below logic is only needed to store data in the local storage of the browser and retrieve when we reopen the browser

function _setLocalStorage() {
    window.addEventListener('beforeunload', () => localStorage.setItem('allElements', JSON.stringify(model.allElements)));
}

async function _getLocalStorage() {
    const data = await JSON.parse(localStorage.getItem('allElements'));
    if (!data) return;
    model.updateAllElementsBeforeStart(data);
    view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);
}
// NOTE: reset() is used when we want to delete entire data in incomplete/completed arrays in model's allElements
function reset() {
    if (model.allElements.currentScreenIncomplete) {
        model.allElements.incomplete = []
    }
    else {
        model.allElements.completed = [];
    }
    view.updateRows((model.allElements.currentScreenIncomplete ? model.allElements.incomplete : model.allElements.completed), model.allElements.currentScreenIncomplete);

}

// NOTE: the below function is only needed for initializing all functions and eventlisteners

const init = function () {
    _getLocalStorage();
    _setLocalStorage();
    view.updateRows(model.allElements.incomplete, true);
    searchView.addHandlerSearch(controlSearchResults);
    view.addHandlerStrikeThrough(selectSwitch);
    extraOptionsView.addHandlerExtraOptions(controlViewThroughExtraOptions);
    deleteRow.addHandlerToCross(controlDeleteRow);
    deleteRow.addHandlerToYesNo(deleteRowFinal);
    editElement.addHandlerDoubleClickTask(controlEditElement);
    editElement.addCloseTheEditWindow();
};

init();