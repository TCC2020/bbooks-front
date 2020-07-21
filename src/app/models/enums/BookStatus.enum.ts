export enum BookStatus {
    LENDO = 0,
    LIDOS = 1,
    A_lER = 2
}

export const mapOptionMenu = new Map<BookStatus, string>([
    [BookStatus.LENDO, 'lendo'],
    [BookStatus.LIDOS, 'lidos'],
    [BookStatus.A_lER, 'aler']
]);
