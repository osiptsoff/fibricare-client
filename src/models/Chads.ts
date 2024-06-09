export default interface Chads {
    patientId: number;
    hasHeartFailureOrDisfunction: boolean;
    hasArterialHypertension: boolean;
    hasDiabetes: boolean;
    hadStroke: boolean;
    hasVascularDesease: boolean;
}

export const alias = {
    'patientId': 'Идентификатор пациента',
    'hasHeartFailureOrDisfunction': 'Есть хроническая сердечная недостаточность или дисфункция левого желудочка',
    'hasArterialHypertension': 'Есть артериальная гипертензия',
    'hasDiabetes': 'Есть диабет',
    'hadStroke': 'Был инсульт',
    'hasVascularDesease': 'Имеет сосудистые заболевания',
};

export const fields = [
    // {
    //     fieldName: 'patientId',
    //     fieldType: 'number' as const,
    // },
    {
        fieldName: 'hasHeartFailureOrDisfunction',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasArterialHypertension',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasDiabetes',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hadStroke',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasVascularDesease',
        fieldType: 'boolean' as const,
    },
];