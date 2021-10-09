class DeleteRow {

    _acquiredRow;
    _parentEl = document.querySelector('.writing__area');
    _confirmationBox = document.querySelector('.confirm');


    // NOTE: displayDeleteConfirmationBox function just displays the confirmation box when the user clicks on the cross to delete
    displayDeleteConfirmationBox(row) {
        this._confirmationBox.classList.toggle('hide__confirm');
        this._acquiredRow = row;
    }

    // NOTE: _yesOrNo function is used to get what exactly the user decided about deleting a certain data. This uses the handler function = deleteRowFinal() from controller.js to which this sends the decision whether yes/no
    _yesOrNo(handler, e) {
        if (e.target.classList.contains('form__btn')) {
            const decision = e.target.dataset.decision;
            handler(decision, this._acquiredRow.querySelector('.movements__text'));
        }
        this._confirmationBox.classList.toggle('hide__confirm');
    }
    // NOTE: This helps with adding evenlistener to the confirm-box and calls the _yesOrNo function which takes care of rest of the job
    addHandlerToYesNo(handler) {
        this._confirmationBox.addEventListener('click', this._yesOrNo.bind(this, handler));
    }
    // NOTE: addHandlerToCross function helps adding event listener to the cross at each row and calls the controlDeleteRow in controller.js
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