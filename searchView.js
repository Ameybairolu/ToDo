class SearchView {
    _parentElement = document.querySelector('.search__area');
    _editBox = document.querySelector('.confirm__changes');

    //NOTE: getInputString function helps get the data entered in the search box and returns the data the the caller function 
    getInputString() {
        const input = this._parentElement.querySelector('#incoming__string').value;
        this._clearInput();
        const change = this._parentElement.dataset.manipulate;
        this._editBox.classList.add('hide__confirm');
        this._parentElement.dataset.manipulate = '';
        this._parentElement.removeAttribute('style');
        this._parentElement.removeAttribute('data-manipulate');
        if (change) {
            document.querySelector('.main__header').append(this._parentElement);
            return [input, change];
        }
        return [input, null];

    }

    // NOTE: _clearInput is used to clear the data entered data in the search box
    _clearInput() {
        this._parentElement.querySelector('#incoming__string').value = '';
    }
    // NOTE: the below function is used to add eventListener to the form that contains the search box
    addHandlerSearch(handler) {
        this._parentElement.querySelector('.filler').addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();