export enum BookStatus {
    QUERO_LER = 'QUERO_LER',
    LENDO = 'LENDO',
    LIDO = 'LIDO',
    EMPRESTADO = 'EMPRESTADO',
    RELENDO = 'RELENDO',
    INTERROMPIDO = 'INTERROMPIDO'
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
