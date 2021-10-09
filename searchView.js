class SearchView {
    _parentElement = document.querySelector('.search__area');
    _editBox = document.querySelector('.confirm__changes');


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
    _clearInput() {
        this._parentElement.querySelector('#incoming__string').value = '';
    }

    addHandlerSearch(handler) {
        this._parentElement.querySelector('.filler').addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();