export interface DeckInterface {
    success: boolean,
    deck_id: string,
    remaining: number,
    shuffled: boolean
}

export interface CardRequestInterface {
    success: true,
    deck_id: string,
    cards: CardInterface[],
    remaining: number
}
export interface CardInterface {
    code: string,
    image: string,
    images: ImagesInterface,
    value: string,
    numericValue: number,
    suit: string
}

interface ImagesInterface {
    svg: string,
    png: string,
}


