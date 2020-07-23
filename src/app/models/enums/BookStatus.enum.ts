export enum BookStatus {
    LENDO = 0,
    LIDOS = 1,
    PARA_LER = 2,
    ABANDONADO = 3
}

export const mapBookStatus = new Map<BookStatus, string>([
    [BookStatus.LENDO, 'lendo'],
    [BookStatus.LIDOS, 'lidos'],
    [BookStatus.PARA_LER, 'para ler'],
    [BookStatus.ABANDONADO, 'abandonado']
]);
