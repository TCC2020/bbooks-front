export enum OptionMenu {
    meusLivros = 0,
    criar = 1
}

export const mapOptionMenu = new Map<OptionMenu, string>([
    [OptionMenu.meusLivros, 'meusLivros'],
    [OptionMenu.criar, 'criar']
]);
