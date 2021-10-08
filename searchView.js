class SearchView {
    _parentElement = document.querySelector('.search__area');
    _editBox = document.querySelector('.confirm__changes');


    getInputString() {
        const input = this._parentElement.querySelector('#incoming__string').value;
        this._clearInput();
        if (this._parentElement.dataset.manipulate) {
            this._editBox.classList.toggle('hide__confirm');
            document.querySelector('.main__header').append(this._parentElement);
            const change = this._parentElement.dataset.manipulate;
            this._parentElement.dataset.manipulate = '';
            this._parentElement = document.querySelector('.search__area');
            return [input, change];
        }

        this._clearInput();
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