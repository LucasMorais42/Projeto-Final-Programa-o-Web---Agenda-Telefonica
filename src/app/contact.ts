export interface Contact{

    id: number,
    name: string,
    phone_number: number, //mostrar no formato (XX) XXXXX-XXXX
    email: string,
    photo: string,
    date_birth: Date,
    social_media: string[],
    created_at: Date,
    category: Object,
    favorite: boolean
};