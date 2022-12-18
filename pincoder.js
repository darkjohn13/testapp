class Pincoder {
    constructor(container){
        this.container = container;
        this.pincode = localStorage.getItem('pincode');
        this.pincodeLength = localStorage.getItem('pincodeLength');

        if (this.pincode){
            this.renderScreenEnter();
        } else{
            this.renderScreenCreate();
        }
    }

    renderScreenCreate() {
        this.container.replaceChildren();

        const section = document.createElement('section');
        section.classList.add('screen', 'screen-create');

        const form = document.createElement('form');

        const input = document.createElement('input');
        input.setAttribute('placeholder', 'Введите пинкод..');
        input.setAttribute('maxlength', '9');
        


        const button = document.createElement('button');
        button.textContent = 'Сохранить';
        button.disabled = true;

        input.addEventListener('input', (event) => {
            const target = event.target;
            const value = target.value;
            const patternNumber = /^\d+$/.test(value);        

            if(!value.length){
                target.classList.remove('error');
                button.disabled = true;
                return;
            }

            if(patternNumber) {
                target.classList.remove('error');
                button.disabled = false;
            } else {
                target.classList.add('error');
                button.disabled = true;
            }

            if (value.length < 4){
                button.disabled = true;
                return
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const pincode = input.value;
            const pincodeLength = pincode.length;
            this.pincodeLength = pincodeLength;
            this.pincode = pincode;
            localStorage.setItem('pincode',pincode);
            localStorage.setItem('pincodeLength', pincodeLength);

            this.renderScreenEnter();
        });


        form.appendChild(input);
        form.appendChild(button);

        section.appendChild(form);
        
        this.container.appendChild(section);
    }

    renderScreenEnter() {
        this.container.replaceChildren();
        
        const section = document.createElement('section');
        section.classList.add('screen', 'screen-create');

        const form = document.createElement('form');

        const div = document.createElement('div');
        div.setAttribute('id', 'demo');
        this.container.appendChild(div);
 
        const pincodeInput = new PincodeInput('#demo', {
            count: this.pincodeLength,
            secure: false,
            previewDuration: 200,
            onInput: (value) => {
                console.log(value)
            }
        });

        const button = document.createElement('button');
        button.textContent = 'Верифицировать';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const pincode = pincodeInput.value;
            if (pincode === this.pincode){
                this.renderScreenResult();
            } else {
                alert('wrong pincode');
            }
        });

        form.appendChild(button);

        const resetButton = document.createElement('button');
        resetButton.textContent = 'Сбросить пинкод';
        resetButton.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('pincode');
            this.pincode = '';
            this.renderScreenCreate();
        });
        form.appendChild(resetButton);


        section.appendChild(form); 
        this.container.appendChild(section);
    }

    renderScreenResult(){
        this.container.replaceChildren();

        const section = document.createElement('section');
        section.classList.add('screen', 'screen-result');

        section.textContent = 'Вы успешно прошли верификацию';

        this.container.appendChild(section);
    }
}