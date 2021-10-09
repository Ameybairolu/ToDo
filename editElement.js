class EditElement {
    _parentEl = document.querySelector('.writing__area');
    _editBox = document.querySelector('.confirm__changes');
    _searchArea = document.querySelector('.search__area');

    // NOTE: When we want to edit an element, we are blurring the entire background except the element that needs editing and the input search element
    _enableEditBox(handler, e) {

        if (!handler()) return;
        this._editBox.innerHTML = '';

        // _searchArea = document.querySelector('.search__area');
        const searchTop = this._searchArea.getBoundingClientRect().top;
        const searchHeight = this._searchArea.getBoundingClientRect().height;
        const searchLeft = this._searchArea.getBoundingClientRect().left;
        // console.log(typeof searchArea.outerHTML);
        this._editBox.append(this._searchArea);
        this._searchArea.style.position = 'fixed';
        this._searchArea.style.height = `${searchHeight}px`;
        this._searchArea.style.top = `${searchTop}px`;
        this._searchArea.style.left = `${searchLeft}px`;


        const clicked = e.target.closest('.movements__row');
        const leftVal = clicked.getBoundingClientRect().left;
        const widthVal = clicked.getBoundingClientRect().width;
        const topVal = clicked.getBoundingClientRect().top;
        this._editBox.classList.toggle('hide__confirm');
        this._editBox.insertAdjacentHTML('beforeend', clicked.outerHTML);
        const target = this._editBox.querySelector('.movements__row');
        target.style.position = 'fixed';
        target.style.left = `${leftVal}px`;
        target.style.width = `${widthVal}px`;
        target.style.top = `${topVal}px`;

        this._searchArea.dataset.manipulate = `${target.querySelector('.movements__text').innerHTML}`;
    }

    // NOTE: addHandlerDoubleClickTask: Adding doubleclick eventlistener to each row and passes the controlEditElement function to _enableEditBox function
    addHandlerDoubleClickTask(handler) {
        this._parentEl.addEventListener('dblclick', this._enableEditBox.bind(this, handler));
    }

    // NOTE: The below logic helps to close the enable-edit window when the user clicks on the blurred area
    _closeTheEditWindowHelper(e) {
        if (e.target.classList.contains('confirm__changes')) {
            document.querySelector('.main__header').append(this._searchArea);
            this._searchArea.removeAttribute('style');
            this._searchArea.removeAttribute('data-manipulate');
            this._editBox.classList.toggle('hide__confirm');
        }


    }
    addCloseTheEditWindow() {
        this._editBox.addEventListener('click', this._closeTheEditWindowHelper.bind(this));
    }

}

export default new EditElement();