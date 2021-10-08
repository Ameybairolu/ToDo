class DeleteRow {

    _acquiredRow;
    _parentEl = document.querySelector('.writing__area');
    _confirmationBox = document.querySelector('.confirm');



    displayDeleteConfirmationBox(row) {
        this._confirmationBox.classList.toggle('hide__confirm');
        this._acquiredRow = row;
    }


    _yesOrNo(handler, e) {
        if (e.target.classList.contains('form__btn')) {
            const decision = e.target.dataset.decision;
            handler(decision, this._acquiredRow.querySelector('.movements__text'));
        }
        this._confirmationBox.classList.toggle('hide__confirm');
    }

    addHandlerToYesNo(handler) {
        this._confirmationBox.addEventListener('click', this._yesOrNo.bind(this, handler));
    }

    addHandlerToCross(handler) {
        this._parentEl.addEventListener('click', function (e) {
            if (e.target.classList.contains('close') || e.target.parentNode.classList.contains('close')) {
                const clicked = e.target.closest('.movements__row');
                handler(clicked);
            }
        });
    }
}

export default new DeleteRow();