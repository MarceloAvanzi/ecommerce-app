const input: any = {
    items: []
};

process.stdin.on('data', async function (chunk) {
    const command = chunk.toString().replace(/\n/g, '');
    if (command.startsWith('set-cpf')) {
        const params = command.replace('set-cpf ', '');
        input.cpf = params;
    }
    if (command.startsWith('add-item')) {
        const params = command.replace('add-item ', '');
        const [idProduct, quantity] = params.split(' ');
        input.items.push({ idProduct, quantity });
    }
    console.log(input)
})