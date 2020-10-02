export enum BookStatus {
    QUERO_LER = 'QUERO_LER',
    LENDO = 'LENDO',
    LIDO = 'LIDO',
    EMPRESTADO = 'EMPRESTADO',
    RELENDO = 'RELENDO',
    INTERROMPIDO = 'INTERROMPIDO'
}
export enum BookStatusEnglish {
    QUERO_LER = 'Want to Read',
    LENDO = 'Currently Reading',
    LIDO = 'Read',
    EMPRESTADO = 'Borrowed',
    RELENDO = 'Rereading',
    INTERROMPIDO = 'Interrupted'
}

export function getArrayStatus() {
    return [BookStatus.QUERO_LER, BookStatus.LIDO, BookStatus.EMPRESTADO, BookStatus.LENDO, BookStatus.RELENDO, BookStatus.INTERROMPIDO];
}

export const mapBookStatus = new Map<BookStatus, string>([
    [BookStatus.QUERO_LER, 'Quero ler'],
    [BookStatus.LENDO, 'Lendo'],
    [BookStatus.LIDO, 'Lido'],
    [BookStatus.EMPRESTADO, 'Emprestado'],
    [BookStatus.RELENDO, 'Relendo'],
    [BookStatus.INTERROMPIDO, 'INTERROMPIDO'],
]);

export const mapBookStatusEnglish = new Map<BookStatusEnglish, string>([
    [BookStatusEnglish.QUERO_LER, 'QUERO_LER'],
    [BookStatusEnglish.LENDO, 'LENDO'],
    [BookStatusEnglish.LIDO, 'LIDO'],
    [BookStatusEnglish.EMPRESTADO, 'EMPRESTADO'],
    [BookStatusEnglish.RELENDO, 'RELENDO'],
    [BookStatusEnglish.INTERROMPIDO, 'INTERROMPIDO'],
]);
