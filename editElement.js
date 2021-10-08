class EditElement {
    _parentEl = document.querySelector('.writing__area');
    _editBox = document.querySelector('.confirm__changes');

    _enableEditBox(handler, e) {

        if (!handler()) return;
        this._editBox.innerHTML = '';

        const searchArea = document.querySelector('.search__area');
        const searchTop = searchArea.getBoundingClientRect().top;
        const searchHeight = searchArea.getBoundingClientRect().height;
        const searchLeft = searchArea.getBoundingClientRect().left;
        // console.log(typeof searchArea.outerHTML);
        this._editBox.append(searchArea);
        this._editBox.querySelector('.search__area').style.position = 'fixed';
        this._editBox.querySelector('.search__area').style.height = `${searchHeight}px`;
        this._editBox.querySelector('.search__area').style.top = `${searchTop}px`;
        this._editBox.querySelector('.search__area').style.left = `${searchLeft}px`;


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

        this._editBox.querySelector('.search__area').dataset.manipulate = `${target.querySelector('.movements__text').innerHTML}`;
    }

    addHandlerDoubleClickTask(handler) {
        this._parentEl.addEventListener('dblclick', this._enableEditBox.bind(this, handler));
    }

    _closeTheEditWindowHelper(e) {
        if (e.target.classList.contains('confirm__changes')) {
            document.querySelector('.main__header').append(document.querySelector('.search__area'));
            this._editBox.classList.toggle('hide__confirm');
        }


    }
    addCloseTheEditWindow() {
        this._editBox.addEventListener('click', this._closeTheEditWindowHelper.bind(this));
    }

}

export default new EditElement();