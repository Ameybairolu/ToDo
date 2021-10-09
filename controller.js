import view from './view.js'
import * as model from './model.js';
import searchView from './searchView.js';
import extraOptionsView from './extraOptionsView.js';
import deleteRow from './deleteRow.js';
import editElement from './editElement.js';

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

const selectSwitch = function (e) {
    if (!model.allElements.currentScreenIncomplete) return;
    const clicked = e.target.closest('.movements__row');
    // clicked.classList.toggle('mark__complete');
    const index = model.allElements.incomplete.findIndex(mov => mov.data === clicked.querySelector('.movements__text').textContent);
    model.allElements.incomplete[index].selected = !model.allElements.incomplete[index].selected;
    view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);
    // e.stopPropagation();
}
// console.log(x);
// console.log(model.allElements.incomplete);

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
    // console.log(clicked);
    // if(clicked.classList.contains)
}

const controlDeleteRow = function (element) {
    deleteRow.displayDeleteConfirmationBox(element);
}

const deleteRowFinal = function (decision, element) {
    if (decision === 'yes') {
        model.deleteRowFromData(element);
        view.updateRows((model.allElements.currentScreenIncomplete ? model.allElements.incomplete : model.allElements.completed), model.allElements.currentScreenIncomplete);
    }
}

const controlEditElement = function () {
    return model.allElements.currentScreenIncomplete;
}

function _setLocalStorage() {
    window.addEventListener('beforeunload', () => localStorage.setItem('allElements', JSON.stringify(model.allElements)));
}

async function _getLocalStorage() {
    const data = await JSON.parse(localStorage.getItem('allElements'));
    if (!data) return;
    model.updateAllElementsBeforeStart(data);
    view.updateRows(model.allElements.incomplete, model.allElements.currentScreenIncomplete);
}

function reset() {
    if (model.allElements.currentScreenIncomplete) {
        model.allElements.incomplete = []
    }
    else {
        model.allElements.completed = [];
    }
    view.updateRows((model.allElements.currentScreenIncomplete ? model.allElements.incomplete : model.allElements.completed), model.allElements.currentScreenIncomplete);

}



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