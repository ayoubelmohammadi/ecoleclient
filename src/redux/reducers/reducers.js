export const DepenseType = ["BC", "Marchée", "CDC", "Autre"]
export const DepenseNature = {
    "BC": [
        "Travaux d'aménagement, d'entretien et de réparation des bâtiments administratifs",
        "Fournitures de bureau",
        "Fournitures pour matériel technique et informatique",
        "Imprimés, prestations d'impression, de reproduction et de photographie",
        "Matériel de bureau",
        "Matériel informatique, pièces de rechange et logiciels",
        "Matériel technique",
        "Mobilier du bureau",
        "Outillage et quincaillerie",
        "Entretien des logiciels et pro-logiciels",
        "Entretien et réparation de matériel et de mobilier",
        "Etudes, conseil et formation",
        "Hôtellerie, hébergement, réception et restauration",
        "Organisation de manifestations culturelles, scientifiques et sportives",
        "prestations de gardiennage des bâtiments administratifs"
    ]
}
export const UNITES = ["U", "F", "JOUR", "HEUR", "M²"]
const initDepense = {
    list: [
        {
            "id": 32,
            "dateSignature": "2021-01-13",
            "prestataire": {
                "id": 29,
                "rs": "EX1",
                "adresse": "RABAT",
                "patente": "10000001",
                "rc": "0101010101",
                "ice": "0000000001",
                "ife": "1",
                "cnss": "1",
                "rib": "1",
                "bank": "BaridBank",
                "agence": "MV RABAT",
                "responsable": "nom1 prenom1 A1"
            },
            "objet": "Objet bon de commande 1",
            "montant": 20000.0,
            "montantLitre": "vingt-mille",
            "status": "En cours",
            "articles": [
                {
                    "id": 1,
                    "designation": "Laptop Macbook pro",
                    "unite": "U",
                    "quantite": 100,
                    "prix": 15000.0,
                    "tva": 10
                },
                {
                    "id": 2,
                    "designation": "Datashow simense C2323",
                    "unite": "U",
                    "quantite": 2,
                    "prix": 5000.0,
                    "tva": 14
                },
                {
                    "id": 3,
                    "designation": "Stylos Mapped",
                    "unite": "U",
                    "quantite": 1000,
                    "prix": 5.0,
                    "tva": 20
                }
            ],
            "depenseType": "BC"
        }
    ]
}

export const authReducer = (state = [], action) => {
    switch (action.type) {
        case "LOGIN/SUCCESS":
            /* HERE WE SET THE TOKEN BASED ON THE DATA RECEIVED FROM THE LOGIN
            REQUEST. YOU WILL NEED TO ADJUST THIS BASED ON THE ACTUAL DATA COMING
            FROM YOUR API */
            return {...state, token: action.data.token, email: action.data.email};
        case "LOGOUT/SUCCESS":
            return {...state, token: null, email: null};
        case "REGISTER":
            return {
                ...state,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                email: action.data.email,
                role: action.data.role,
                phone: action.data.phone,
                password: action.data.password
            };
        default:
            return state;
    }
};
export const depensesReducer = (state = initDepense, action) => {
    switch (action.type) {
        default:
            return state;
    }
}


