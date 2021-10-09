class ExtraOptionsView {
    _parentElement = document.querySelector('.extra__options');
    _resetElement = document.querySelector('#reset');
    // NOTE: The below logic helps adding event listener to the extraOptions or buttons at the bottom
    updateExtraOptions(bool) {
        const selectAllButtons = this._parentElement.querySelectorAll('.form__btn');
        selectAllButtons.forEach(button => button.classList.remove('button-58'));

        if (!bool) {
            document.querySelector('#incomplete').classList.toggle('button-58');
            this._resetElement.innerHTML = 'Reset Incomplete';
        }
        else {
            document.querySelector('#completed').classList.toggle('button-58');
            this._resetElement.innerHTML = 'Reset Completed';
        }
    }

    addHandlerExtraOptions(handler) {
        this._parentElement.addEventListener('click', function (e) {
            e.preventDefault();
            // const clicked = e.target.closest('.form__btn');
            handler(e);
        });
    }

}

export default new ExtraOptionsView();