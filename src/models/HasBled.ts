export default interface HasBled {
    patientId: number;
    hasHypertension: boolean;
    hasKidneyDisfunction: boolean;
    hasLiverDisfunction: boolean;
    hadStroke: boolean;
    hasBled: boolean;
    hasLabileInr: boolean;
    takingAlcohol: boolean;
    takingMedicines: boolean;
}

export const alias = {
    'patientId': 'Идентификатор пациента',
    'hasHypertension': 'Есть артериальная гипертензия',
    'hasKidneyDisfunction': 'Есть нарушения в работе почек',
    'hasLiverDisfunction': 'Есть нарушения в работе печени',
    'hadStroke': 'Был инсульт',
    'hasBled': 'Недавно было крупное кровотечение или имеет предрасположенность к кровотечениям',
    'hasLabileInr': 'Имеет лабильное МНО',
    'takingAlcohol': 'Принимает более 8 порций алкоголя в неделю',
    'takingMedicines': 'Принимает лекарства, усиливающие риск кровотечения',
};

export const fields = [
    // {
    //     fieldName: 'patientId',
    //     fieldType: 'number' as const,
    // },
    {
        fieldName: 'hasHypertension',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasKidneyDisfunction',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasLiverDisfunction',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hadStroke',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasBled',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'hasLabileInr',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'takingAlcohol',
        fieldType: 'boolean' as const,
    },
    {
        fieldName: 'takingMedicines',
        fieldType: 'boolean' as const,
    },
];