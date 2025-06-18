export interface Contact{

    id: number,
    name: string,
    phone_number: number, //mostrar no formato (XX) XXXXX-XXXX
    email: string,
    photo: string,
    date_birth: Date,
    address: string,
    created_at: Date,
    group: string,
    favorite: boolean
};