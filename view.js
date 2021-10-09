import extraOptions from './extraOptionsView.js';
class View {
    _delayForClick = 300;
    _clicks = 0;
    _timer = null;
    _parentEl = document.querySelector('.writing__area');
    _editBox = document.querySelector('.confirm__changes');
    _currentlyInComplete = false;

    // NOTE: Helps get HTML for each row
    _getHTML(movement) {
        console.log();
        const html = `
                    <div class="movements__row ${(movement.selected && !this._currentlyInComplete) ? 'mark__complete' : ''}">
                        <div class="movements__type movements__type--deposit">
                        </div>
                        <div class="movements__text">${movement.data}</div>
                        <span class="close"><div>\u00D7</div></span>
                    </div>
                `;
        // console.log(this);
        this._parentEl.insertAdjacentHTML('beforeend', html);
    }

    // NOTE: Updates the number of incomplete tasks
    _updateIncompleteTab(displayObject) {
        document.querySelector('#incomplete').innerHTML = `INCOMPLETE (${displayObject.length})`
    }


    // NOTE: This function is called from the controller which passes the object to be displayed and a boolean that tells it which tab is the current one
    updateRows(displayObject, bool) {
        this._currentlyInComplete = !bool;
        this._parentEl.innerHTML = '';
        displayObject.forEach(this._getHTML.bind(this));
        // changeColor();
        if (!this._currentlyInComplete) {
            this._updateIncompleteTab(displayObject);
        }
        extraOptions.updateExtraOptions(this._currentlyInComplete);
    }

    // NOTE: The _decideClickOrDoubleClick function helps decide whether the click was single click or double click
    _decideClickOrDoubleClick(handler, e) {
        this._clicks++;
        if (this._clicks === 1) {
            this._timer = setTimeout(() => {
                if (e.target.classList.contains('close') || e.target.parentNode.classList.contains('close')) return;
                handler(e);
                this._clicks = 0;
            }, this._delayForClick);
        } else {
            clearTimeout(this._timer);
            this._clicks = 0;
        }
    }
    // NOTE: The addHandlerStrikeThrough function adds single  click event listener to each row/task
    addHandlerStrikeThrough(handler) {
        this._parentEl.addEventListener('click', this._decideClickOrDoubleClick.bind(this, handler));
    }

}

export default new View();