export interface userData {
    gamesPlayed: number,
    bestCategory: string,
    favouriteCategory: string,
    averageScore: number,
    totalScore: number,
}

export interface UsersScore {
    username: string;
    score: number;
}

export interface TopCategories {
    "Art & literature": number,
    "Film & TV": number,
    "Food & Drink": number,
    "General Knowledge": number,
    "Geography": number,
    "History": number,
    "Music": number,
    "Science": number,
    "Society & Culture": number,
    "Sport & Leisure": number,

}

export interface IDATA {
    userData: userData;
    topCategories: TopCategories[];
    usersScores: UsersScore[];
}