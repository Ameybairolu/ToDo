// This file stores all the dynamic data needed for the project

export let allElements = {
    currentScreenIncomplete: true,

    incomplete: [{
        data: 'Dance',
        selected: false
    },
    {
        data: 'Kill',
        selected: false
    }
    ],
    completed: [{
        data: 'Be awesome',
        selected: true
    },
    {
        data: 'Study',
        selected: true
    }]
}

// The enterSearchedValue helps store data in the incomplete tab or update data when user tried editing a row

export const enterSearchedValue = function (data) {
    //[0,1]
    const newData = {
        data: data[0],
        selected: false
    }
    if (!data[1]) {

        allElements.currentScreenIncomplete = true;
        allElements.incomplete.push(newData);
    }
    else {
        const index = allElements.incomplete.findIndex(mov => data[1] === mov.data);
        allElements.incomplete[index].data = data[0];
    }
}


// NOTE: The below logic helps move the selected  rows to the completed tab
const isSelected = function (element) {
    return element.selected;
}

export const moveSelectedToComplete = function () {
    const filtered = allElements.incomplete.filter(isSelected);

    filtered.forEach(value => {
        const index = allElements.incomplete.findIndex(mov => value.data === mov.data);
        allElements.incomplete.splice(index, 1);
        allElements.completed.push(value);

    });

}

// NOTE: The deleteRowFromData function deletes the object to be deleted from the active tab

export const deleteRowFromData = function (element) {
    const index = (allElements.currentScreenIncomplete ? allElements.incomplete : allElements.completed).findIndex(mov => mov.data === element.textContent);
    (allElements.currentScreenIncomplete ? allElements.incomplete : allElements.completed).splice(index, 1);
}

export const updateAllElementsBeforeStart = function (data) {
    allElements = data;
}