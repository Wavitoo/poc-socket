export class Chat {
    private socket: any;
    private my_name: string;

    constructor(socket: any) {
        this.socket = socket;
        this.my_name = prompt('What is your name?') || 'Anonymous';
        console.log(`[INFO] New user: ${this.my_name}`);
        this.socket.emit('new_user', this.my_name);

        this.setupListeners();
        this.receiveData();
    }

    emit_data(message: string) {
        this.socket.emit('data', message);
    }

    setupListeners() {
        const form_data = document.getElementById('sendButton');
        const input_data = document.getElementById('messageInput') as HTMLInputElement;

        form_data?.addEventListener('click', (event) => {
            event.preventDefault();
            const message = input_data.value;
            if (message) {
                this.emit_data(`${this.my_name}: ${message}`);
                this.append_data(`Me: ${message}`);
                input_data.value = '';
            }
        });
    }

    append_data(message: string) {
        const html_page = document.getElementById('messages');
        const add_element = document.createElement('div');
        add_element.textContent = message;
        html_page?.appendChild(add_element);
    }

    receiveData() {
        this.socket.on('data', (message: string) => {
            this.append_data(message);
        });

        this.socket.on('user_connect', (message: string) => {
            this.append_data(message);
        });
    }
}
